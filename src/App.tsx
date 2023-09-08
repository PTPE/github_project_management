import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Issue from "./pages/Issue";
import { ModalContextProvider } from "./contexts/ModalContext";
function App() {
  return (
    <ModalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="issue" element={<Issue />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ModalContextProvider>
  );
}

export default App;
