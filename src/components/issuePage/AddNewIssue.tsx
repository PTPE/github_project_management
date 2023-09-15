import { useModal } from "../../contexts/ModalContext";

export default function AddNewIssue() {
  const { handleOpenEditModal, handleDefaultIssue, handleType } = useModal()!;
  const defaultIssue = {
    title: "",
    repository: "",
    content: "",
    status: "",
    createdAt: "",
    number: "",
  };
  return (
    <div
      className="cursor-pointer w-8 h-8 flex items-center justify-center bg-[#facc15] rounded-full absolute right-[-40px]"
      onClick={() => {
        handleOpenEditModal(), handleDefaultIssue(defaultIssue);
        handleType("add");
      }}
    >
      ＋
    </div>
  );
}
