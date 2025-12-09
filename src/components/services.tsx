const menuItems = [
  { name: "Veg Mixer Tomato Salad & Carrot", price: "$5.99", rating: "5.0 (87)" },
  { name: "Macaroni Cheese Pizza", price: "$2.99", rating: "4.8 (32)" },
  { name: "Nelli Hamburger & Fries", price: "$7.99", rating: "4.9 (89)" },
  // ... agrega los demás
];

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Checkout our menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-500 mt-2">{item.rating}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">{item.price}</span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
