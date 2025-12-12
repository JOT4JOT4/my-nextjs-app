const testimonials = [
  { name: "Warner bros. buy by netflix", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
  { name: "Jeff Bezos burn Amazon Services", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
  { name: "Tebas get covid", quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">News in te industry</h2>
        <div className="space-y-12">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="bg-white p-8 rounded-lg shadow-lg">
              <footer className="mt-4 text-gray-900 font-semibold">{t.name}</footer>
              <p className="text-gray-700 italic">"{t.quote}"</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
