const stats = [
  { label: "Orders", value: "94000+" },
  { label: "Customers", value: "11000+" },
  { label: "Chefs", value: "1500+" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 flex justify-around text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="text-4xl font-bold">{s.value}</p>
            <p className="text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
