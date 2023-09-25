import { createContext, useCallback, useContext, useState } from "react";
import { IssueType } from "../modules/IssueType";

type ContextValueType = {
  isEditModalOpen: boolean;
  isErrorModalOpen: boolean;
  handleOpenEditModal: () => void;
  handleCloseEditModal: () => void;
  handleOpenErrorModal: () => void;
  handleCloseErrorModal: () => void;
  handleDefaultIssue(defaultIssue: IssueType): void;
  defaultIssue: IssueType;
  type: "add" | "edit";
  handleType: (type: "edit" | "add") => void;
};

const initialState = {
  repository: "",
  content: "",
  status: "",
  createdAt: "",
  title: "",
  number: "",
};

const ModalContext = createContext<ContextValueType | null>({
  isErrorModalOpen: false,
  isEditModalOpen: false,
  handleOpenEditModal: () => {},
  handleCloseEditModal: () => {},
  handleOpenErrorModal: () => {},
  handleCloseErrorModal: () => {},
  handleDefaultIssue: () => {},
  handleType: () => {},
  defaultIssue: initialState,
  type: "edit",
});

function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [defaultIssue, setDefaultIssue] = useState(initialState);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("edit");

  function handleOpenEditModal() {
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }

  const handleOpenErrorModal = useCallback(function () {
    setIsErrorModalOpen(true);
  }, []);

  function handleCloseErrorModal() {
    setIsErrorModalOpen(false);
  }

  function handleType(type: "edit" | "add") {
    setType(type);
  }

  function handleDefaultIssue(defaultIssue: IssueType) {
    setDefaultIssue(defaultIssue);
  }

  const contextValue = {
    isEditModalOpen,
    isErrorModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenErrorModal,
    handleCloseErrorModal,
    handleDefaultIssue,
    handleType,
    defaultIssue,

    type,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { ModalContextProvider, useModal };
