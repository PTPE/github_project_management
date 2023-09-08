import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import Status from "./Status";
type IssueCard = {
  issueData: {
    status: "open" | "close" | "progress";
    title: string;
    repo: string;
    content: string;
  };
};
export default function IssueCard(props: IssueCard) {
  return (
    <div className="w-[50%] h-40 bg-white rounded-xl shadow-md p-5 flex gap-5 items-center">
      <div className="flex gap-2 flex-col items-center">
        <Status status={props.issueData.status} />
        <h1 className="text-2xl">{props.issueData.title}</h1>
        <span>{props.issueData.repo}</span>
      </div>
      <p className="self-start overflow-auto max-h-full">
        {props.issueData.content}
      </p>
      <div className="self-start">
        <DeleteIcon className="cursor-pointer" width="25px" height="25px" />
        <EditIcon className="cursor-pointer" width="25px" height="20px" />
      </div>
    </div>
  );
}
