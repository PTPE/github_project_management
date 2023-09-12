import { useEffect } from "react";

import { useIssueData } from "../../contexts/IssueDataContext";
import IssueCard from "./IssueCard";

export default function IssueDataDisplay() {
  const { state, fetchIssue } = useIssueData()!;

  useEffect(() => {
    fetchIssue();
  }, [fetchIssue]);

  return (
    <>
      {state.issue.map((issue) => (
        <IssueCard key={issue.createdAt} issueData={issue} />
      ))}
    </>
  );
}
