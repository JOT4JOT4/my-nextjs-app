'use client';
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

// Types para la API
interface Accion {
  id: string;
  company_id: string;
  valor: number;
  cambio: number;
  historico: number[];
}

interface Company {
  id: string;
  name: string;
}

interface ShareItem {
  id: string;
  company_id: string;
  name: string;
  price: string;
  chg: string;
}

// mapping from company name to ticker symbol
const symbolMap: Record<string, string> = {
  "Nintendo": "NTDOY",
  "Sony": "SONY",
  "Microsoft": "MSFT",
  "Apple": "AAPL",
  "Amazon": "AMZN",
  "Google": "GOOGL",
};

export default function MenuSection() {
  const [sharesItems, setSharesItems] = useState<ShareItem[]>([]);
  const [accionesState, setAccionesState] = useState<Accion[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: string; name: string; symbol: string } | null>(null);
  const [chartData, setChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");

  // Traer datos de Companies y Acciones desde la API (usa endpoints para filtrar)
  useEffect(() => {
    let mounted = true;
    let timer: any = null;

    const fetchFiltered = async () => {
      try {
        setLoading(true);

        // Companies: pasar `q` si hay searchTerm
        const qParam = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : "";
        const companiesRes = await fetch(`http://localhost:8000/companies${qParam}`);

        // Acciones: pasar `filter` si no es 'all'
        const accionesFilter = filter === "all" ? "" : `?filter=${encodeURIComponent(filter)}`;
        const accionesRes = await fetch(`http://localhost:8000/acciones${accionesFilter}`);

        if (!companiesRes.ok || !accionesRes.ok) {
          throw new Error("Error al traer datos de la API");
        }

        const companies: Company[] = await companiesRes.json();
        const accionesData: Accion[] = await accionesRes.json();

        // Combinar datos de companies y acciones
        const combined = companies.map((company) => {
          const accion = accionesData.find((a) => a.company_id === company.id);
          return {
            id: company.id,
            company_id: company.id,
            name: company.name,
            price: `$${(accion?.valor ?? 0).toFixed(2)}`,
            chg: `${(accion?.cambio ?? 0).toFixed(2)}%`,
          };
        });

        if (!mounted) return;
        setSharesItems(combined);
        setAccionesState(accionesData);
        setError(null);
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || "Error al cargar datos");
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // debounce para evitar llamadas en cada tecla
    timer = setTimeout(fetchFiltered, 250);

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [searchTerm, filter]);

  useEffect(() => {
    if (!selected) return;

    const controller = new AbortController();

    const fetchAccion = async () => {
      setChartLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/acciones/company/${selected.id}`, { signal: controller.signal });
        if (!res.ok) {
          // si 404, mostramos demo; si otro error, lanzamos
          if (res.status === 404) {
            setChartData(null);
            setError(null);
            setChartLoading(false);
            return;
          }
          throw new Error(`Error al obtener acción: ${res.status}`);
        }

        const accion: Accion = await res.json();
        const values = [...(accion.historico || []), accion.valor];

        const now = Date.now();
        const labels = values.map((_, i) => {
          const d = new Date(now - (values.length - 1 - i) * 24 * 60 * 60 * 1000);
          return d.toLocaleDateString();
        });

        setChartData({
          labels,
          datasets: [
            {
              label: `${selected.name}`,
              data: values,
              borderColor: "rgba(16,185,129,1)",
              backgroundColor: "rgba(16,185,129,0.2)",
              tension: 0.2,
            },
          ],
        });
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError(err.message || "Error al construir gráfico");
        setChartData(null);
      } finally {
        setChartLoading(false);
      }
    };

    fetchAccion();

    return () => controller.abort();
  }, [selected]);

  const openModal = (item: ShareItem) => {
    const symbol = symbolMap[item.name] || item.name;
    setSelected({ id: item.id, name: item.name, symbol });
    setModalOpen(true);
  };

  // Usamos el filtrado en servidor; `sharesItems` ya viene filtrado por la API

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Search for company shares</h2>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 rounded-md">
            <p className="text-red-700"><strong>Error:</strong> {error}</p>
            <p className="text-red-600 text-sm mt-2">Asegúrate de que la API FastAPI esté corriendo en http://localhost:8000</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-600">Cargando datos de la API...</p>
          </div>
        )}

        {!loading && sharesItems.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-600">No hay datos disponibles.</p>
          </div>
        )}

        {!loading && sharesItems.length > 0 && (
          <>
            <div className="max-w-2xl mx-auto mb-8 flex gap-3">
              <input
                aria-label="Buscar compañía"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
                placeholder="Buscar por nombre..."
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-md"
                aria-label="Filtrar por cambio"
              >
                <option value="all">Todos</option>
                <option value="positive">Subida</option>
                <option value="negative">Bajada</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sharesItems.map((item: ShareItem, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-500 mt-2">{item.chg}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">{item.price}</span>
                    <button onClick={() => openModal(item)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">View</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal overlay */}
      {modalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => { setModalOpen(false); setSelected(null); setChartData(null); }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-4">{selected.name} — {selected.symbol}</h3>

            {chartLoading && <p>Cargando datos...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {chartData ? (
              <div>
                <Line data={chartData} options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                  interaction: { mode: 'index', intersect: false },
                  scales: { x: { display: true }, y: { display: true } }
                }} />
              </div>
            ) : !chartLoading && !error ? (
              <p>No hay datos para mostrar.</p>
            ) : null}
            <div className="mt-4 text-right">
              <button onClick={() => { setModalOpen(false); setSelected(null); setChartData(null); }} className="px-4 py-2 bg-gray-200 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
