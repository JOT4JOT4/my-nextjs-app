const testimonials = [
  { name: "Charlotte Hale", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
  { name: "Adam Cuppy", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
  { name: "Steven Marcetti", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Customers Love Us.</h2>
        <div className="space-y-12">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 italic">"{t.quote}"</p>
              <footer className="mt-4 text-gray-900 font-semibold">- {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
