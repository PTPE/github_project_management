import { useModal } from "../../contexts/ModalContext";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import EditIssueModal from "../modal/EditIssueModal";
import StatusOption from "./StatusOption";
type IssueCard = {
  issueData: {
    status: string;
    title: string;
    repository: string;
    content: string;
  };
};
export default function IssueCard(props: IssueCard) {
  const { handleOpenModal, isModalOpen } = useModal();

  return (
    <div className="w-[50%] h-40 bg-white rounded-xl shadow-md p-5 flex gap-5 items-center relative">
      <div className="flex gap-2 flex-col items-center w-1/5">
        <StatusOption defaultValue={props.issueData.status} />
        <h1 className="text-2xl line-clamp-1 w-full text-center">
          {props.issueData.title}
        </h1>
        <span className="text-center">{props.issueData.repository}</span>
      </div>
      <p className="self-start line-clamp-5	w-2/3">{props.issueData.content}</p>
      <div className="absolute top-3 right-3">
        <DeleteIcon className="cursor-pointer" width="25px" height="25px" />
        <EditIcon
          className="cursor-pointer"
          width="25px"
          height="20px"
          onClick={handleOpenModal}
        />
      </div>
      {isModalOpen && <EditIssueModal />}
    </div>
  );
}
