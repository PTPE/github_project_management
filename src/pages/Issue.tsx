import AddNewIssue from "../components/issuePage/AddNewIssue";
import DecendenceFilter from "../components/issuePage/DecendenceFilter";
import Header from "../components/issuePage/Header";
import IssueDataDisplay from "../components/issuePage/IssueDataDisplay";
import SearchBar from "../components/issuePage/SearchBar";
import StatusFilter from "../components/issuePage/StatusFilter";
import EditIssueModal from "../components/modal/EditIssueModal";
import ErrorModal from "../components/modal/ErrorModal";
import { useIssueData } from "../contexts/IssueDataContext";
import { useModal } from "../contexts/ModalContext";
export default function Issue() {
  const { state } = useIssueData()!;
  const { isEditModalOpen, isErrorModalOpen } = useModal()!;

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-200 p-x-6 items-center gap-2">
      <Header />
      <SearchBar />
      <div className="flex items-center justify-between lg:w-[60%] lg:self-center md:w-[80%] md:self-center w-[90%] self-stretch mt-4 relative">
        <AddNewIssue />
        <StatusFilter />
        <DecendenceFilter />
      </div>
      <IssueDataDisplay />
      {isEditModalOpen && <EditIssueModal />}
      {isErrorModalOpen && <ErrorModal errorMessage={state.error} />}
    </div>
  );
}
