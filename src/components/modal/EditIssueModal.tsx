import { useModal } from "../../contexts/ModalContext";
import Exit from "./Exit";
import Modal from "./Modal";
import StatusOption from "./StatusOption";
import { useIssueData } from "../../contexts/IssueDataContext";
import { useEffect, useState } from "react";

export default function EditIssueModal() {
  const { handleCloseEditModal, defaultIssue, type } = useModal()!;

  const { createIssue, updateIssue, state, fetchRepositoryList } =
    useIssueData()!;

  const [form, setForm] = useState(defaultIssue);

  useEffect(() => {
    fetchRepositoryList();
  }, [fetchRepositoryList]);

  const isDisabled =
    form.title.length === 0 || form.content.split("").length < 30;

  return (
    <Modal>
      <form className="flex flex-col p-10 gap-3">
        <Exit
          className="self-end cursor-pointer"
          onClick={handleCloseEditModal}
        />
        <label>
          Title <span className="text-red-600 text-xs">*必填</span>
        </label>
        <textarea
          className="border-transparent border-2 outline-green rounded-lg h-[40px] p-[5px] bg-gray-200 "
          defaultValue={defaultIssue.title}
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <label>Status</label>
        <StatusOption
          className={`bg-gray-200 h-[40px] ${
            type === "add" ? "text-zinc-500 cursor-not-allowed" : ""
          }`}
          defaultValue={defaultIssue.status}
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, status: e.target.value };
            })
          }
        />
        <label>
          Repository <span className="text-red-600 text-xs">*必填</span>
        </label>
        <select
          className={`border-transparent border-2 outline-green rounded-lg h-[40px] p-[5px] bg-gray-200 text-center ${
            type === "edit" ? "text-zinc-500 cursor-not-allowed" : ""
          }`}
          defaultValue={defaultIssue.repository}
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, status: e.target.value };
            })
          }
          disabled={type === "edit"}
        >
          {state.repositoryList.map((repository) => (
            <option key={repository}>{repository}</option>
          ))}
        </select>
        <label>
          Content <span className="text-red-600 text-xs">*至少30字</span>
        </label>
        <textarea
          className="border-transparent border-2 outline-green rounded-lg  bg-gray-200 h-[120px] p-[5px]"
          defaultValue={defaultIssue.content}
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
        />
        <button
          type="submit"
          className={`p-[8px] rounded-lg mt-6 ${
            isDisabled
              ? "bg-zinc-400 cursor-not-allowed"
              : "bg-green text-black hover:bg-teal-500 hover:text-white  "
          }`}
          onClick={(e) => {
            e.preventDefault();

            if (type === "add") createIssue(form);
            if (type === "edit") updateIssue(form);
            handleCloseEditModal();
          }}
          disabled={isDisabled}
        >
          提交
        </button>
      </form>
    </Modal>
  );
}
