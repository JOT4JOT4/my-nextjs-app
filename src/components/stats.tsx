import { Doughnut } from 'react-chartjs-2';

const stats = [
  { label: "Squarenix", sharesval: "15.99" },
  { label: "Ubisoft", sharesval: "12.56" },
  { label: "Nintendo", sharesval: "47.70" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 flex justify-around text-center">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg w-1/4">
            <h3 className="text-2xl font-bold mb-2">{stat.label}</h3>
            <p className="text-xl text-gray-600">${stat.sharesval}B</p>
          </div>
        ))}
      </div>
    </section>
  );
}
