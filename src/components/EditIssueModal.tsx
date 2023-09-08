import { useModal } from "../contexts/ModalContext";
import Exit from "./Exit";
import Modal from "./Modal";
import StatusOption from "./StatusOption";

export default function EditIssueModal() {
  const { handleCloseModal } = useModal();

  return (
    <Modal>
      <form className="flex flex-col p-10 gap-3">
        <Exit className="self-end cursor-pointer" />
        <label>Title</label>
        <input className="border-transparent border-2 outline-green rounded-lg p-[2px] bg-gray-200 " />
        <label>Status</label>
        <StatusOption className="border-transparent border-2rounded-lg p-[2px] bg-gray-200 text-black " />
        <label>Repository</label>
        <input className="border-transparent border-2 outline-green rounded-lg p-[2px] bg-gray-200 " />
        <label>Content</label>
        <input className="border-transparent border-2 outline-green rounded-lg p-[2px] bg-gray-200 " />
        <button
          type="submit"
          className="bg-green hover:bg-teal-500 p-[5px] rounded-lg mt-6"
          onClick={(e) => {
            e.preventDefault();
            handleCloseModal();
          }}
        >
          提交
        </button>
      </form>
    </Modal>
  );
}
