import { useRef } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
export default function SearchBar() {
  const { updateSearchKeyWord } = useIssueData()!;
  const searchRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit() {
    updateSearchKeyWord(searchRef.current!.value);
  }

  return (
    <div className="flex w-full items-center justify-center sm:h-8 md:h-10">
      <input
        className="border-2 border-transparent focus:outline-none focus:border-green mr-5 drop-shadow-md rounded-lg h-full pl-2 sm:w-[60%] md:w-[40%]"
        ref={searchRef}
      />
      <button
        className="px-4 text-white rounded-lg bg-green h-full sm:text-sm md:text-xl"
        onClick={handleSubmit}
      >
        搜尋
      </button>
    </div>
  );
}
