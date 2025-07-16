import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-full bg-white text-black dark:bg-gray-900 dark:text-white px-6 py-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="font-bold text-xl">Crypto Dashboard</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
