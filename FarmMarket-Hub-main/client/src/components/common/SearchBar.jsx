import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;