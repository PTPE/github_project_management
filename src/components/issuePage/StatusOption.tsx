import { useModal } from "../../contexts/ModalContext";

type StatusOptionType = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
};
export default function StatusOption(props: StatusOptionType) {
  const { type } = useModal()!;
  return (
    <select
      className={`appearance-none cursor-pointer p-1 rounded-md text-center outline-none ${props.className}`}
      onChange={props.onChange}
      defaultValue={props.defaultValue || "open"}
      disabled={type === "add"}
    >
      <option value="close">Close</option>
      <option value="open">Open</option>
    </select>
  );
}
