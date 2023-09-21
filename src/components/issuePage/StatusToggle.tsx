type StatusToggleType = {
  handleStatus: React.Dispatch<React.SetStateAction<string>>;
  updateIssue: (newStatus: string) => void;
  status: string;
  defaultValue?: string;
};

export default function StatusToggle(props: StatusToggleType) {
  return (
    <div
      className={`w-20 h-8 rounded-full flex relative text-gray-100 ${
        props.status === "open" ? " bg-cyan-100" : " bg-rose-100"
      }`}
    >
      <input
        type="checkbox"
        className="opacity-0 w-full h-full cursor-pointer z-10 relative"
        value={props.status}
        checked={props.status === "open"}
        onChange={(e) => {
          const newStatus = e.target.checked ? "open" : "closed";

          props.handleStatus(newStatus);
          props.updateIssue(newStatus);
        }}
      />
      <div
        className={`absolute transition-all w-14 h-full rounded-full flex items-center justify-center z-0 text-sm ${
          props.status === "open" ? "left-0 bg-cyan-600" : "left-6 bg-rose-400"
        }`}
      >
        {props.status}
      </div>
    </div>
  );
}
