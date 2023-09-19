import { useIssueData } from "../../contexts/IssueDataContext";

export default function DecendenceFilter() {
  const { updateOrder } = useIssueData()!;
  return (
    <div className=" sm:text-sm md:text-base">
      <label>排序：</label>
      <select
        className="rounded-lg py-2 outline-none"
        onChange={(e) => updateOrder(e.target.value)}
      >
        <option value="desc">由新到舊</option>
        <option value="asc">由舊到新</option>
      </select>
    </div>
  );
}
