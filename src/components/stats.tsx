'use client';

import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const stats = [
  { label: "Squarenix", sharesval: "15.99" },
  { label: "Ubisoft", sharesval: "12.56" },
  { label: "Nintendo", sharesval: "47.70" },
];

// Gaming Market Index data for the 3 main gaming companies
const gamingMarketData = {
  labels: ['Market Share', 'Innovation Score', 'Customer Satisfaction', 'Revenue Growth', 'Market Presence'],
  datasets: [
    {
      label: 'Nintendo',
      data: [42, 85, 90, 35, 88],
      backgroundColor: 'rgba(236, 72, 153, 0.6)',
      borderColor: 'rgba(236, 72, 153, 1)',
      borderWidth: 2,
    },
    {
      label: 'Sony Playstation',
      data: [38, 88, 85, 42, 85],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
    },
    {
      label: 'Microsoft',
      data: [35, 82, 80, 48, 82],
      backgroundColor: 'rgba(34, 197, 94, 0.6)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2,
    },
  ],
};

export default function Stats() {
  return (
    <section className="py-20 bg-gray-100">
      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto px-4 flex justify-around text-center mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg w-1/4">
            <h3 className="text-2xl font-bold mb-2">{stat.label}</h3>
            <p className="text-xl text-gray-600">${stat.sharesval}B</p>
          </div>
        ))}
      </div>

      {/* Gaming Market Index Chart */}
      <div className="max-w-6xl mx-auto px-4 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Gaming Market Index - Top 3 Companies</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Bar 
            data={gamingMarketData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' as const },
                title: { display: false },
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  max: 100,
                  title: { display: true, text: 'Index Score' }
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
