import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Issue from "./pages/Issue";
import Redirect from "./pages/Redirect";
import { ModalContextProvider } from "./contexts/ModalContext";
import { IssueDataContextProvider } from "./contexts/IssueDataContext";

function App() {
  return (
    <IssueDataContextProvider>
      <ModalContextProvider>
        <HashRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="redirect" element={<Redirect />} />
            <Route path="issue" element={<Issue />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </HashRouter>
      </ModalContextProvider>
    </IssueDataContextProvider>
  );
}

export default App;
