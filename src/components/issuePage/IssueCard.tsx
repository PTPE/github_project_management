import { useModal } from "../../contexts/ModalContext";
import EditIcon from "../../icons/EditIcon";
import StatusOption from "./StatusOption";
import { IssueType } from "../../modules/IssueType";
import { useIssueData } from "../../contexts/IssueDataContext";

type IssueCard = {
  issueData: IssueType;
};

function formatTime(time: string) {
  const dateTime = new Date(time);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} `;

  return formattedDateTime;
}

export default function IssueCard(props: IssueCard) {
  const { handleOpenEditModal, handleDefaultIssue, handleType } = useModal()!;
  const { updateIssue } = useIssueData()!;

  return (
    <div className="lg:w-[60%] md:w-[80%] h-40 bg-white rounded-xl shadow-md p-5 flex  gap-5 items-center relative">
      <div className="flex gap-2 flex-col items-center w-1/4">
        <StatusOption
          defaultValue={props.issueData.status}
          onChange={(e) => {
            updateIssue({ ...props.issueData, status: e.target.value });
          }}
        />
        <h1 className="font-bold line-clamp-2 w-full text-center">
          {props.issueData.title}
        </h1>
        <span className="text-center">{props.issueData.repository}</span>
        <span>{formatTime(props.issueData.createdAt)}</span>
      </div>
      <p className=" line-clamp-5	w-2/3 text-center">
        {props.issueData.content}
      </p>
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
