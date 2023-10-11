import { useEffect, useState } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";

function generatePageArray(currentPage: number, totalPage: number) {
  const range = 5;

  if (totalPage <= range + 1) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  if (totalPage > range + 1) {
    if (currentPage < range - 1) return [1, 2, 3, 4, 5, "...", totalPage];

    if (totalPage - currentPage < range - 1)
      return [
        1,
        "...",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    else
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPage,
      ];
  }
}

export default function Pagination() {
  const { state, updateCurrentPage } = useIssueData()!;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    updateCurrentPage(currentPage);
  }, [updateCurrentPage, currentPage]);

  if (state.isLoading || state.error || state.issue.length === 0) return;

  return (
    <div className="flex items-center py-10">
      <div
        className="w-8 h-8 flex items-center justify-center cursor-pointer font-medium"
        onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
      >
        &lt;
      </div>
      {generatePageArray(currentPage, state.totalPage)?.map((pageEl) =>
        pageEl === "..." ? (
          <div key={pageEl}>{pageEl}</div>
        ) : (
          <div
            onClick={() => setCurrentPage(+pageEl)}
            key={pageEl}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-black ${
              pageEl === currentPage && "bg-green text-white"
            }  `}
          >
            {pageEl}
          </div>
        )
      )}
      <div
        className="w-8 h-8 flex items-center justify-center cursor-pointer font-medium"
        onClick={() =>
          currentPage < state.totalPage && setCurrentPage((prev) => prev + 1)
        }
      >
        &gt;
      </div>
    </div>
  );
}
