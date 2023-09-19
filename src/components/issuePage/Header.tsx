import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const owner = localStorage.getItem("owner");

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <header className="w-full flex justify-between text-white bg-green mb-6 py-4 px-6 items-center">
      <h1 className="text-2xl">GitHub Issue Management</h1>
      <div className="flex gap-4 text-lg">
        <span className="flex items-center">Hi👋 {owner}</span>
        <button
          className="border px-2 py-1 rounded-lg hover:bg-white hover:text-green transition ease-in-out delay-150"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
