import { useEffect, useState } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";

const status = ["Open", "Closed"];

export default function StatusFilter() {
  const { updateFilter } = useIssueData()!;

  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);
  function handleSelectState(id: number) {
    selectedStatus.includes(id)
      ? setSelectedStatus(selectedStatus.filter((status) => status !== id))
      : setSelectedStatus([...selectedStatus, id]);
  }

  useEffect(() => {
    updateFilter(selectedStatus.map((num) => status[num]));
  }, [selectedStatus, updateFilter]);
  return (
    <div className="flex gap-2 items-center sm:text-sm md:text-base">
      篩選：
      {status.map((status, i) => (
        <div
          className={`px-2 py-1 cursor-pointer rounded-lg ${
            selectedStatus.includes(i)
              ? " bg-green text-white border-2 border-green"
              : " bg-white border-green border-2 text-green "
          }`}
          key={status}
          onClick={() => {
            handleSelectState(i);
          }}
        >
          {status}
        </div>
      ))}
    </div>
  );
}
