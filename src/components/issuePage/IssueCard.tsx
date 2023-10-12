import { useModal } from "../../contexts/ModalContext";
import EditIcon from "../../icons/EditIcon";
import StatusToggle from "./StatusToggle";
import { IssueType } from "../../modules/IssueType";
import { useIssueData } from "../../contexts/IssueDataContext";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useState } from "react";

type IssueCard = {
  issueData: IssueType;
};

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

function formatTimeAgo(time: string) {
  const pastTime = timeAgo.format(new Date(time).getTime(), "mini");
  return `${pastTime} ago`;
}

export default function IssueCard(props: IssueCard) {
  const { handleOpenEditModal, handleDefaultIssue, handleType } = useModal()!;
  const [status, setStatus] = useState(props.issueData.status);
  const { updateIssue } = useIssueData()!;

  function handleUpdateIssue(newStatus: string) {
    updateIssue({ ...props.issueData, status: newStatus });
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 flex flex-col gap-5 relative border-l-4
      ${status === "open" ? "border-cyan-600" : "border-rose-400"}
      `}
    >
      <div>
        <div className="flex gap-2 items-center">
          <StatusToggle
            defaultValue={props.issueData.status}
            handleStatus={setStatus}
            status={status}
            updateIssue={handleUpdateIssue}
          />
          ·
          <span className="text-gray-400 text-xs">
            {formatTimeAgo(props.issueData.createdAt)}
          </span>
        </div>
        <h1 className="font-bold line-clamp-2 w-full ">
          {props.issueData.title}
        </h1>
        <span className="text-gray-400 text-xs">
          {props.issueData.repository}
        </span>
      </div>
      <p className=" line-clamp-2">{props.issueData.content}</p>
      <div className="absolute top-3 right-3">
        <EditIcon
          className="cursor-pointer"
          width="25px"
          height="20px"
          onClick={() => {
            handleOpenEditModal();
            handleDefaultIssue(props.issueData);
            handleType("edit");
          }}
        />
      </div>
    </div>
  );
}
