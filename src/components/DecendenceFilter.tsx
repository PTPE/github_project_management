export default function DecendenceFilter() {
  return (
    <div className="h-full">
      <label>排序：</label>
      <select className="h-full rounded-lg">
        <option>由新到舊</option>
        <option>由舊到新</option>
      </select>
    </div>
  );
}
