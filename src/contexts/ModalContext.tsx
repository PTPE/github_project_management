import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
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
  dispatch: React.Dispatch<Action>;
  form: IssueType;
  type: "add" | "edit";
  handleType: (type: "edit" | "add") => void;
};

type Action = {
  type: string;
  payload: string;
};

const initialState = {
  repository: "",
  content: "",
  status: "",
  createdAt: "",
  title: "",
  number: "",
};

function reducer(state: IssueType, action: Action) {
  switch (action.type) {
    case "form/title":
      return { ...state, title: action.payload };
    case "form/repository":
      return { ...state, repository: action.payload };
    case "form/content":
      return { ...state, content: action.payload };
    case "form/status":
      return { ...state, status: action.payload };
    case "form/number":
      return { ...state, number: action.payload };
    default:
      return state;
  }
}

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
  dispatch: () => {},
  form: initialState,
  type: "edit",
});

function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [defaultIssue, setDefaultIssue] = useState(initialState);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("edit");
  const [form, dispatch] = useReducer(reducer, defaultIssue);

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

    dispatch({ type: "form/title", payload: defaultIssue.title });
    dispatch({ type: "form/repository", payload: defaultIssue.repository });
    dispatch({ type: "form/content", payload: defaultIssue.content });
    dispatch({ type: "form/status", payload: defaultIssue.status });
    dispatch({ type: "form/number", payload: defaultIssue.number });
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
    dispatch,
    form,
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
