export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} DataDevs. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
