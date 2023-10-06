import { useNavigate } from "react-router-dom";
import { useIssueData } from "../../contexts/IssueDataContext";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useIssueData()!;
  const owner = localStorage.getItem("owner");

  return (
    <header className="w-full flex justify-between text-white bg-green mb-6 py-4 px-6 items-center">
      <h1 className="shrink sm:text-sm md:text-2xl">GitHub Issue Management</h1>
      <div className="flex gap-4 text-lg">
        <span className="flex shrink-0 items-center sm:text-sm md:text-lg">
          Hi👋 {owner}
        </span>
        <button
          className="border px-2 py-1 self-center rounded-lg hover:bg-white hover:text-green transition ease-in-out delay-150 sm:text-sm sm:py-1 md:text-xl"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
