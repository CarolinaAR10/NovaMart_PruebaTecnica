export default function Footer() {
  return (
    <footer className="bg-white mt-8 py-6">
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-500">
        © {new Date().getFullYear()} NovaMart. All rights reserved.
      </div>
    </footer>
  );
}
