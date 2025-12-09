export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">DataMobile</div>
        <div className="space-x-6 hidden md:flex">
          <a href="#menu" className="hover:text-indigo-600">Menu</a>
          <a href="#services" className="hover:text-indigo-600">Services</a>
          <a href="#testimonials" className="hover:text-indigo-600">Data</a>
          <a href="#contact" className="hover:text-indigo-600">Contact</a>
        </div>
      </div>
    </nav>
  );
}