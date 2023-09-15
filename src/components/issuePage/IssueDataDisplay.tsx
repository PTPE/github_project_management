import { useEffect, useState } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
import IssueCard from "./IssueCard";
import Spinner from "../../icons/Spinner";
import { useModal } from "../../contexts/ModalContext";

export default function IssueDataDisplay() {
  const { state, fetchIssue } = useIssueData()!;
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
    fetchIssue(page);
  }, [fetchIssue, page]);

  useEffect(() => {
    if (String(state.error).length) handleOpenErrorModal();
  }, [handleOpenErrorModal, state.error]);

  return (
    <>
      {state.issue[0].content ? (
        state.issue.map((issue) => (
          <IssueCard key={issue.createdAt} issueData={issue} />
        ))
      ) : (
        <Spinner className="border-green" />
      )}
    </>
  );
}
