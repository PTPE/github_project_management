import { useEffect } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
import { useModal } from "../../contexts/ModalContext";

export default function AddNewIssue() {
  const { state, fetchRepositoryList } = useIssueData()!;
  const { handleOpenEditModal, handleDefaultIssue, handleType } = useModal()!;

  const defaultIssue = {
    title: "",
    repository: state.repositoryList[0],
    content: "",
    status: "open",
    createdAt: "",
    number: "",
  };

  useEffect(() => {
    fetchRepositoryList();
  }, [fetchRepositoryList]);

  return (
    <div
      className="cursor-pointer w-8 h-8 flex items-center justify-center bg-[#facc15] rounded-full "
      onClick={() => {
        handleOpenEditModal(), handleDefaultIssue(defaultIssue);
        handleType("add");
      }}
    >
      ＋
    </div>
  );
}
