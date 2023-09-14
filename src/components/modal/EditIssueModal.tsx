import { useModal } from "../../contexts/ModalContext";
import Exit from "./Exit";
import Modal from "./Modal";
import StatusOption from "../issuePage/StatusOption";
import { useEffect } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";

export default function EditIssueModal() {
  const { handleCloseModal, defaultIssue, dispatch, state, type } = useModal()!;
  const { createIssue, updateIssue } = useIssueData()!;

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Modal>
      <form className="flex flex-col p-10 gap-3">
        <Exit className="self-end cursor-pointer" />
        <label>Title</label>
        <textarea
          className="border-transparent border-2 outline-green rounded-lg p-[5px] bg-gray-200 "
          defaultValue={defaultIssue.title}
          onChange={(e) =>
            dispatch({ type: "form/title", payload: e.target.value })
          }
        />
        <label>Status</label>
        <StatusOption
          className=" bg-gray-200 "
          defaultValue={defaultIssue.status}
          onChange={(e) =>
            dispatch({ type: "form/status", payload: e.target.value })
          }
        />
        <label>Repository</label>
        <textarea
          className="border-transparent border-2 outline-green rounded-lg p-[5px] bg-gray-200 "
          defaultValue={defaultIssue.repository}
          onChange={(e) =>
            dispatch({ type: "form/repository", payload: e.target.value })
          }
          disabled={type === "edit"}
        />
        <label>Content</label>
        <textarea
          className="border-transparent border-2 outline-green rounded-lg p-[5px] bg-gray-200 h-[120px]"
          defaultValue={defaultIssue.content}
          onChange={(e) =>
            dispatch({ type: "form/content", payload: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-green hover:bg-teal-500 p-[5px] rounded-lg mt-6"
          onClick={(e) => {
            e.preventDefault();
            if (type === "add") createIssue(state);
            if (type === "edit") updateIssue(state);
            handleCloseModal();
          }}
        >
          提交
        </button>
      </form>
    </Modal>
  );
}
