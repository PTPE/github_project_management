import AddNewIssue from "../components/issuePage/AddNewIssue";
import DecendenceFilter from "../components/issuePage/OrderFilter";
import Header from "../components/issuePage/Header";
import IssueDataDisplay from "../components/issuePage/IssueDataDisplay";
import SearchBar from "../components/issuePage/SearchBar";
import StatusFilter from "../components/issuePage/StatusFilter";
import EditIssueModal from "../components/modal/EditIssueModal";
import ErrorModal from "../components/modal/ErrorModal";
import { useIssueData } from "../contexts/IssueDataContext";
import { useModal } from "../contexts/ModalContext";
import { useEffect } from "react";
import Pagination from "../components/issuePage/Pagination";
export default function Issue() {
  const { state } = useIssueData()!;
  const { isEditModalOpen, isErrorModalOpen, handleOpenErrorModal } =
    useModal()!;

  useEffect(() => {
    if (state.error) handleOpenErrorModal();
  }, [handleOpenErrorModal, state.error]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-200 items-center gap-2">
      <Header />
      <SearchBar />
      <div className="flex flex-wrap items-center self-end mt-4 relative gap-3 sm:px-8 md:flex-row md:px-16">
        <StatusFilter />
        <div className="flex gap-3">
          <DecendenceFilter />
          <AddNewIssue />
        </div>
      </div>
      <IssueDataDisplay />
      <Pagination />
      {isEditModalOpen && <EditIssueModal />}
      {isErrorModalOpen && <ErrorModal errorMessage={state.error} />}
    </div>
  );
}
