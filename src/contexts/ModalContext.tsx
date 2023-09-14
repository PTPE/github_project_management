import { createContext, useContext, useReducer, useState } from "react";
import { IssueType } from "../modules/IssueType";

type ContextValueType = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleDefaultIssue(defaultIssue: IssueType): void;
  defaultIssue: IssueType;
  dispatch: React.Dispatch<Action>;
  state: IssueType;
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
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleDefaultIssue: () => {},
  handleType: () => {},
  defaultIssue: initialState,
  dispatch: () => {},
  state: initialState,
  type: "edit",
});

function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [defaultIssue, setDefaultIssue] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<"add" | "edit">("edit");
  const [state, dispatch] = useReducer(reducer, defaultIssue);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
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
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleDefaultIssue,
    handleType,
    defaultIssue,
    dispatch,
    state,
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
