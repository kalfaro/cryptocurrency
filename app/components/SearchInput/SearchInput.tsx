interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search by name or symbol..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/2 mb-6 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-900 dark:text-white mt-[1.3rem]"
    />
  );
}
