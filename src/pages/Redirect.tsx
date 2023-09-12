import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../icons/Spinner";
import { useIssueData } from "../contexts/IssueDataContext";

export default function Redirect() {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const navigate = useNavigate();
  const { state, fetchUser } = useIssueData()!;

  useEffect(() => {
    fetchUser(code!);
  }, [code, fetchUser]);

  useEffect(() => {
    if (state.owner && state.token) navigate("/issue");
  }, [state, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <Spinner className="border-green border-[10px] w-[100px] h-[100px]" />
    </div>
  );
}
