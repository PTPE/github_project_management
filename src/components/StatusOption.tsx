type StatusOptionType = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
};
export default function StatusOption(props: StatusOptionType) {
  return (
    <select
      className={`appearance-none cursor-pointer p-1 rounded-md text-center outline-none ${props.className}`}
      onChange={props.onChange}
      defaultValue={props.defaultValue || "open"}
    >
      <option value="close">Close</option>
      <option value="progress">In Progress</option>
      <option value="open">Open</option>
    </select>
  );
}
