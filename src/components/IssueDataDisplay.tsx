import IssueCard from "./IssueCard";
const dummyData = {
  status: "close" as const,
  title: "Title",
  repo: "Repo",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officia consequatur? Reprehenderit veniam blanditiis maxime, non iure est, neque fugiat, saepe corrupti ratione ab praesentium molestias. Nostrum ipsa est impedit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officia consequatur? Reprehenderit veniam blanditiis maxime, non iure est, neque fugiat, saepe corrupti ratione ab praesentium molestias. Nostrum ipsa est impedit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, officia consequatur? Reprehenderit veniam blanditiis maxime, non iure est, neque fugiat, saepe corrupti ratione ab praesentium molestias. Nostrum ipsa est impedit?",
};
export default function IssueDataDisplay() {
  return <IssueCard issueData={dummyData}></IssueCard>;
}
