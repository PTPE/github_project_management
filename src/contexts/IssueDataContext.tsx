import { createContext, useCallback, useContext, useReducer } from "react";

type action = {
  type: string;
  payload: string | state["issue"];
};

type state = {
  owner: string;
  token: string;
  issue: IssueType[];
};

type IssueType = {
  repository: string;
  content: string;
  status: string;
  createdAt: string;
  title: string;
};

const initialState = {
  isLoading: "",
  owner: "",
  token: "",
  issue: [
    {
      repository: "",
      content: "",
      status: "",
      createdAt: "",
      title: "",
    },
  ],
};

type ContextType = {
  state: state;
  fetchIssue: () => Promise<void>;
  fetchUser: (code: string) => Promise<void>;
};

const BASE_URL = "http://localhost:8080";

const IssueDataContext = createContext<ContextType | null>(null);

function reducer(state: state, action: action): state {
  switch (action.type) {
    case "token/load":
      return { ...state, token: action.payload as string };
    case "user/load":
      return { ...state, owner: action.payload as string };
    case "issue/load":
      return { ...state, issue: action.payload as state["issue"] };

    default:
      return state;
  }
}

export function IssueDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchToken(code: string) {
    const res = await fetch(`${BASE_URL}/code/${code}`);
    const data = await res.json();
    return data;
  }

  const fetchUser = useCallback(async function (code: string) {
    const token = await fetchToken(code);
    const res = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    localStorage.setItem("owner", data.login);
    localStorage.setItem("token", token);

    dispatch({ type: "token/load", payload: token });
    dispatch({ type: "user/load", payload: data.login });
  }, []);

  const fetchIssue = useCallback(
    async function () {
      const owner = localStorage.getItem("owner");
      if (!state.owner) dispatch({ type: "user/load", payload: owner! });

      const res = await fetch(
        `https://api.github.com/search/issues?q=${state.owner}`
      );
      const data = await res.json();

      const issueData = data.items.map((issue) => {
        const repository = issue.repository_url.split("/").at(-1);
        return {
          repository: repository,
          content: issue.body,
          status: issue.state,
          createdAt: issue.created_at,
          title: issue.title,
        };
      });

      dispatch({ type: "issue/load", payload: issueData });
    },
    [state.owner]
  );

  return (
    <IssueDataContext.Provider value={{ state, fetchIssue, fetchUser }}>
      {children}
    </IssueDataContext.Provider>
  );
}

export function useIssueData() {
  const context = useContext(IssueDataContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the IssueDataContext");

  return context;
}
