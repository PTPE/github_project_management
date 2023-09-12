import { useEffect } from "react";

import { useIssueData } from "../../contexts/IssueDataContext";
import IssueCard from "./IssueCard";

export default function IssueDataDisplay() {
  const { state, fetchIssue } = useIssueData()!;

  useEffect(() => {
    fetchIssue();
  }, [fetchIssue]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      {state.issue.map((issue) => (
        <IssueCard issueData={issue} />
      ))}
    </>
  );
}
