export default function Hero() {
  return (
    <section className="pt-20 bg-cover bg-center" style={{ backgroundImage: "url('/sharesImg.png')" }}>
      <div className="max-w-4xl mx-auto text-center py-32 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">Welcome to DataMobile</h1>
        <p className="mt-6 text-lg border-gray-950 text-white/90">
          check your shares and investments in real time with our mobile app
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">Check ur shares</button>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-md hover:bg-gray-100">View the numbers</button>
        </div>
      </div>
    </section>
  );
}
