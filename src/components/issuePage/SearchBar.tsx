import { useRef } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
export default function SearchBar() {
  const { updateSearchKeyWord } = useIssueData()!;
  const searchRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit() {
    updateSearchKeyWord(searchRef.current!.value);
  }

  return (
    <div className="flex h-10 w-full items-center justify-center">
      <input
        className="border-transparent  focus:outline-green w-[40%] mr-5 drop-shadow-md rounded-lg  h-full pl-2"
        ref={searchRef}
      />
      <button
        className="px-4 text-white rounded-lg bg-green h-full"
        onClick={handleSubmit}
      >
        搜尋
      </button>
    </div>
  );
}
