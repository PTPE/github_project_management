import { createContext, useCallback, useContext, useReducer } from "react";
import { IssueType } from "../modules/IssueType";

type action = {
  type: string;
  payload: string | state["issue"];
};

type state = {
  owner: string;
  token: string;
  search: string;
  filter: string;
  order: string;
  error: string;
  issue: IssueType[];
};

const initialState = {
  search: "",
  owner: "",
  token: "",
  filter: "",
  order: "",
  error: "",
  issue: [],
};

type ContextType = {
  state: state;
  fetchIssue: (page: number) => Promise<void>;
  fetchUser: (code: string) => Promise<void>;
  updateSearchKeyWord: (search: string) => void;
  updateFilter: (filter: string[]) => void;
  updateOrder: (order: string) => void;
  createIssue: (issueData: IssueType) => Promise<void>;
  updateIssue: (issueData: IssueType) => Promise<void>;
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
    case "issue/search":
      return { ...state, search: action.payload as string };
    case "issue/filter":
      return { ...state, filter: action.payload as string };
    case "issue/order":
      return { ...state, order: action.payload as string };
    case "issue/create":
      return { ...state, issue: action.payload as state["issue"] };
    case "error":
      return { ...state, error: action.payload as string };
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
    try {
      const res = await fetch(`${BASE_URL}/code/${code}`);
      if (!res.ok) throw new Error("Authentication Fails");

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err.message);
    }
  }

  const fetchUser = useCallback(async function (code: string) {
    try {
      const token = await fetchToken(code);
      const res = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Authentication Fails");
      const data = await res.json();

      localStorage.setItem("owner", data.login);
      localStorage.setItem("token", token);

      dispatch({ type: "token/load", payload: token });
      dispatch({ type: "user/load", payload: data.login });
    } catch (err) {
      dispatch({ type: "error", payload: err as string });
    }
  }, []);

  const fetchIssue = useCallback(
    async function (page: number) {
      try {
        const owner = localStorage.getItem("owner");
        if (!state.owner) dispatch({ type: "user/load", payload: owner! });

        const res = await fetch(
          `https://api.github.com/search/issues?q=owner:${owner} ${
            state.filter
          } ${state.search}&sort=created&per_page=${30}&${state.order}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        const issueData = data.items.map((issue: any) => {
          const repository = issue.repository_url.split("/").at(-1);
          return {
            repository: repository,
            content: issue.body,
            status: issue.state,
            createdAt: issue.created_at,
            title: issue.title,
            number: issue.number,
          };
        });

        dispatch({ type: "issue/load", payload: issueData });
        return issueData;
      } catch (err) {
        dispatch({ type: "error", payload: err as string });
      }
    },

    [state.owner, state.search, state.filter, state.order]
  );

  const updateSearchKeyWord = useCallback((search: string) => {
    const searchToUrl = `${search.length === 0 ? "" : `${search} in:body`}`;
    dispatch({ type: "issue/search", payload: searchToUrl });
  }, []);

  const updateFilter = useCallback((filter: string[]) => {
    const filterToUrl = filter
      .map((filter) => `state:${filter}`)
      .join("+")
      .toLocaleLowerCase();

    dispatch({ type: "issue/filter", payload: filterToUrl });
  }, []);

  const updateOrder = useCallback((order: string) => {
    const orderToUrl = `order=${order}`;
    dispatch({ type: "issue/order", payload: orderToUrl });
  }, []);

  const createIssue = useCallback(
    async (issue: IssueType) => {
      try {
        const owner = localStorage.getItem("owner");
        const token = localStorage.getItem("token");
        if (!state.owner) dispatch({ type: "user/load", payload: owner! });
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${issue.repository}/issues`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: issue.title,
              body: issue.content,
            }),
          }
        );
        if (!res.ok) throw new Error("Creating Issue Fails");
      } catch (err) {
        dispatch({ type: "error", payload: err as string });
      }
    },
    [state.owner]
  );

  async function updateIssue(issue: IssueType) {
    const owner = localStorage.getItem("owner");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${issue.repository}/issues/${issue.number}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: issue.title,
            body: issue.content,
            state: issue.status,
          }),
        }
      );
      if (!res.ok) throw new Error("Updating Issue Failss");
    } catch (err) {
      dispatch({ type: "error", payload: err as string });
    }
  }

  return (
    <IssueDataContext.Provider
      value={{
        state,
        fetchIssue,
        fetchUser,
        updateSearchKeyWord,
        updateFilter,
        updateOrder,
        createIssue,
        updateIssue,
      }}
    >
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
