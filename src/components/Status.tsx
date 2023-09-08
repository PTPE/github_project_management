import { useState } from "react";

type StatusType = {
  status: "open" | "close" | "progress";
};

const statusStyle = {
  open: "bg-[#5CBB3A]",
  progress: "bg-[#00B2FF]",
  close: "bg-[#FF7D7D]",
};

export default function Status(props: StatusType) {
  const [selectedStaus, setSelectedStatus] = useState(props.status);
  function handleSelectedStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value as StatusType["status"]);
  }
  return (
    <select
      className={`appearance-none cursor-pointer p-1 rounded-md text-white text-center outline-none ${statusStyle[selectedStaus]}`}
      onChange={handleSelectedStatus}
    >
      <option value="close">Close</option>
      <option value="progress">In Progress</option>
      <option value="open">Open</option>
    </select>
  );
}
