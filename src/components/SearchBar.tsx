export default function SearchBar() {
  return (
    <div className="flex h-10 w-full items-center justify-center">
      <input className="border-transparent  focus:outline-green w-[40%] mr-5 drop-shadow-md rounded-lg  h-full pl-2" />
      <button className="px-4 text-white rounded-lg bg-green h-full">
        搜尋
      </button>
    </div>
  );
}
