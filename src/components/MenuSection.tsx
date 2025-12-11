import { Doughnut } from 'react-chartjs-2';

const sharesItems = [
  { name: "Nintendo", price: "$15.99", chg: "2.5%" },
  { name: "Sony Playstation", price: "$20.99", chg: "1.8%" },
  { name: "Microsoft", price: "$70.99", chg: "0.9%" },
  // ... agrega los demás
];

export default function MenuSection() {
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
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
