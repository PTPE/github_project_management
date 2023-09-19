import { useEffect, useState } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
import IssueCard from "./IssueCard";
import Spinner from "../../icons/Spinner";
import { useModal } from "../../contexts/ModalContext";

export default function IssueDataDisplay() {
  const { state, fetchIssue, fetchRepositoryList } = useIssueData()!;
  const { handleOpenErrorModal } = useModal()!;
  const [page, setPage] = useState(1);

  document.addEventListener("scroll", () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (window.scrollY > 1000 && window.scrollY >= scrollableHeight) {
      setTimeout(() => {
        setPage(page + 1);
      }, 1000);
    }
  });

  useEffect(() => {
    fetchRepositoryList();
  }, [fetchRepositoryList]);

  useEffect(() => {
    fetchIssue(page);
  }, [fetchIssue, page]);

  useEffect(() => {
    if (state.error) handleOpenErrorModal();
  }, [handleOpenErrorModal, state.error]);

  if (!state.issue) return <div>Create One!</div>;

  return (
    <div className="grid gap-16 pb-16 sm:grid-cols-1 sm:gap-5 sm:px-8  md:grid-cols-2 md:gap-16 md:px-16  lg:grid-cols-3 ">
      {state ? (
        state.issue.map((issue) => (
          <IssueCard key={issue.createdAt} issueData={issue} />
        ))
      ) : (
        <Spinner className="border-green" />
      )}
    </div>
  );
}
