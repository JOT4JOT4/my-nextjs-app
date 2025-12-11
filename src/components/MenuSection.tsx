'use client';
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const sharesItems = [
  { name: "Nintendo", price: "$15.99", chg: "2.5%" },
  { name: "Sony Playstation", price: "$20.99", chg: "1.8%" },
  { name: "Microsoft", price: "$70.99", chg: "0.9%" },
  // ... agrega los demás
];

// mapping from item name to ticker symbol (adjust según prefieras)
const symbolMap: Record<string, string> = {
  "Nintendo": "NTDOY",
  "Sony Playstation": "SONY",
  "Microsoft": "MSFT",
  // agrega más mapeos si hace falta
};

export default function MenuSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ name: string; symbol: string } | null>(null);
  const [chartData, setChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; // poner tu API key en .env.local
    if (!apiKey) {
      // Si no hay API key, mostramos datos de ejemplo
      const now = Date.now();
      const labels = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(now - (29 - i) * 24 * 60 * 60 * 1000);
        return d.toLocaleDateString();
      });
      const values = labels.map((_, i) => 50 + Math.sin(i / 3) * 5 + Math.random() * 2);
      setChartData({
        labels,
        datasets: [
          {
            label: `${selected.name} (demo)`,
            data: values,
            borderColor: "rgba(59,130,246,1)",
            backgroundColor: "rgba(59,130,246,0.2)",
            tension: 0.3,
          },
        ],
      });
      return;
    }

    // si hay API key, intentamos traer datos reales desde Finnhub
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const symbol = selected.symbol;
        const to = Math.floor(Date.now() / 1000);
        const from = to - 60 * 60 * 24 * 30; // últimos 30 días
        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=D&from=${from}&to=${to}&token=${apiKey}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.s !== "ok" || !json.c) {
          throw new Error(json.error || "No hay datos disponibles");
        }
        const labels = (json.t || []).map((ts: number) => {
          const d = new Date(ts * 1000);
          return d.toLocaleDateString();
        });
        const values = json.c;
        setChartData({
          labels,
          datasets: [
            {
              label: `${selected.name} (${symbol})`,
              data: values,
              borderColor: "rgba(16,185,129,1)",
              backgroundColor: "rgba(16,185,129,0.2)",
              tension: 0.2,
            },
          ],
        });
      } catch (err: any) {
        setError(err.message || "Error al cargar datos");
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selected]);

  const openModal = (item: { name: string }) => {
    const symbol = symbolMap[item.name] || item.name;
    setSelected({ name: item.name, symbol });
    setModalOpen(true);
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Checkout our shares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sharesItems.map((item, i) => (
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

            {loading && <p>Cargando datos...</p>}
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
            ) : !loading && !error ? (
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
