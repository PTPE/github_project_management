import { useModal } from "../contexts/ModalContext";
import AddNewIssue from "../components/issuePage/AddNewIssue";
import DecendenceFilter from "../components/issuePage/DecendenceFilter";
import IssueDataDisplay from "../components/issuePage/IssueDataDisplay";
import SearchBar from "../components/issuePage/SearchBar";
import StatusFilter from "../components/issuePage/StatusFilter";
import EditIssueModal from "../components/modal/EditIssueModal";
export default function Issue() {
  const { isModalOpen } = useModal()!;
  const owner = localStorage.getItem("owner");

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-200 p-6 items-center gap-2">
      <h1 className=" font-bold text-2xl">Hi! {owner}</h1>
      <SearchBar />
      <div className="flex items-center justify-between w-[50%] mt-4 relative">
        <AddNewIssue />
        <StatusFilter />
        <DecendenceFilter />
      </div>
      <IssueDataDisplay />
      {isModalOpen && <EditIssueModal />}
    </div>
  );
}
