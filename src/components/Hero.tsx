export default function Hero() {
  return (
    <section className="pt-20 bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
      <div className="max-w-4xl mx-auto text-center py-32 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">Delicious & Affordable Meals Near You.</h1>
        <p className="mt-6 text-lg text-white/90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">Order Now</button>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-md hover:bg-gray-100">Meet The Chefs</button>
        </div>
      </div>
    </section>
  );
}
