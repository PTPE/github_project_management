import { useEffect } from "react";
import { useIssueData } from "../../contexts/IssueDataContext";
import IssueCard from "./IssueCard";
const dummyData = {
  status: "close",
  title: "Title",
  repository: "Repo",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officia consequatur? Reprehenderit veniam blanditiis maxime, non iure est, neque fugiat, saepe corrupti ratione ab praesentium molestias. Nostrum ipsa est impedit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officia consequatur? Reprehenderit veniam blanditiis maxime, non iure est, neque fugiat, saepe corrupti ratione ab praesentium molestias. Nostrum ipsa est impedit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officia consequatur? Reprehenderit veniam blanditiis maxime, non iure est, neque fugiat, saepe corrupti ratione ab praesentium molestias. Nostrum ipsa est impedit?",
};
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
