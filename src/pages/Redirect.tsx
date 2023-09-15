import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIssueData } from "../contexts/IssueDataContext";
import Spinner from "../icons/Spinner";
import { useModal } from "../contexts/ModalContext";
import ErrorModal from "../components/modal/ErrorModal";

export default function Redirect() {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const navigate = useNavigate();
  const { state, fetchUser } = useIssueData()!;
  const { handleOpenErrorModal, isErrorModalOpen } = useModal()!;

  useEffect(() => {
    (async () => {
      await fetchUser(code!);
      const owner = localStorage.getItem("owner");
      const token = localStorage.getItem("token");
      if (owner && token) navigate("/issue");
    })();
  }, [code, fetchUser, navigate]);

  useEffect(() => {
    if (String(state.error).length) handleOpenErrorModal();
  }, [state.error, handleOpenErrorModal]);

  // useEffect(() => {
  //   if (state.owner && state.token) navigate("/issue");
  // }, [state, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <Spinner className="border-green border-[10px] w-[100px] h-[100px]" />
      {isErrorModalOpen && (
        <ErrorModal errorMessage={state.error} onClick={() => navigate("/")} />
      )}
    </div>
  );
}
