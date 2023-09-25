import { useEffect } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
import IssueCard from "./IssueCard";
import Spinner from "../../icons/Spinner";

export default function IssueDataDisplay() {
  const { state, fetchIssue } = useIssueData()!;

  useEffect(() => {
    fetchIssue();
  }, [fetchIssue]);

  if (state.isLoading) return <Spinner className="border-green" />;

  if (state.error)
    return <div>There's an error. Please wait and reload again.</div>;

  if (!state.issue) return <div>Create One!</div>;

  return (
    <div className="grid gap-16 pb-16 sm:grid-cols-1 sm:gap-5 sm:px-8  md:grid-cols-2 md:gap-16 md:px-16  lg:grid-cols-3 ">
      {state &&
        state.issue.map((issue) => (
          <IssueCard key={issue.createdAt} issueData={issue} />
        ))}
    </div>
  );
}
