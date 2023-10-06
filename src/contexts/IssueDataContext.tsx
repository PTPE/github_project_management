import { createContext, useCallback, useContext, useReducer } from "react";
import { IssueType } from "../modules/IssueType";

type action = {
  type: string;
  payload?: string | state["issue"] | string[] | number;
};

type state = {
  currentPage: number;
  totalPage: number;
  search: string;
  isLoading: boolean;
  filter: string;
  order: string;
  error: string;
  issue: IssueType[];
  repositoryList: string[];
};

const initialState = {
  search: "",
  filter: "",
  order: "",
  error: "",
  totalPage: 1,
  currentPage: 1,
  isLoading: false,
  issue: [],
  repositoryList: [],
};

type ContextType = {
  state: state;
  fetchIssue: () => Promise<void>;
  fetchUser: (code: string) => Promise<void>;
  updateSearchKeyWord: (search: string) => void;
  updateFilter: (filter: string[]) => void;
  updateOrder: (order: string) => void;
  createIssue: (issueData: IssueType) => Promise<void>;
  updateIssue: (issueData: IssueType) => Promise<void>;
  fetchRepositoryList: () => Promise<void>;
  updateCurrentPage: (page: number) => void;
  logout: () => void;
};

const BASE_URL = "http://localhost:8080";

const IssueDataContext = createContext<ContextType | null>(null);

function reducer(state: state, action: action): state {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "repositoryList/load":
      return {
        ...state,
        repositoryList: action.payload as string[],
      };
    case "totalPage/load":
      return { ...state, totalPage: action.payload as number };
    case "issue/load":
      return {
        ...state,
        issue: action.payload as state["issue"],
        isLoading: false,
      };
    case "issue/search":
      return { ...state, search: action.payload as string };
    case "issue/filter":
      return { ...state, filter: action.payload as string };
    case "issue/order":
      return { ...state, order: action.payload as string };
    case "issue/currentPage":
      return { ...state, currentPage: action.payload as number };
    case "issue/create":
      return {
        ...state,
        issue: action.payload as state["issue"],
        isLoading: false,
      };
    case "issue/update":
      return {
        ...state,
        issue: action.payload as state["issue"],
        isLoading: false,
      };
    case "logout":
      return initialState;
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
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/code/${code}`);

      if (!res.ok) throw new Error("Authentication Fails");

      const data = await res.json();

      return data;
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const fetchUser = useCallback(async function (code: string) {
    dispatch({ type: "loading" });
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
    } catch (err) {
      dispatch({ type: "error", payload: err as string });
    }
  }, []);

  const fetchIssue = useCallback(
    async function () {
      dispatch({ type: "loading" });

      try {
        const owner = localStorage.getItem("owner");

        const res = await fetch(
          `https://api.github.com/search/issues?q=owner:${owner} ${state.filter} ${state.search}&sort=created&per_page=12&page=${state.currentPage}&${state.order}`
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

        const totalPage = Math.ceil(data["total_count"] / 12);

        dispatch({
          type: "totalPage/load",
          payload: totalPage,
        });
        dispatch({ type: "issue/load", payload: issueData });
        return issueData;
      } catch (err) {
        dispatch({ type: "error", payload: err as string });
      }
    },

    [state.search, state.filter, state.order, state.currentPage]
  );

  const fetchRepositoryList = useCallback(async () => {
    const owner = localStorage.getItem("owner");

    const res = await fetch(`https://api.github.com/users/${owner}/repos`);
    const data = await res.json();
    const repositoryList = data.map((data: any) => data.name);

    dispatch({ type: "repositoryList/load", payload: repositoryList });
  }, []);

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

  const updateCurrentPage = useCallback((page: number) => {
    dispatch({ type: "issue/currentPage", payload: page });
  }, []);

  const createIssue = useCallback(
    async (issue: IssueType) => {
      dispatch({ type: "loading" });

      try {
        const owner = localStorage.getItem("owner");
        const token = localStorage.getItem("token");

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

        const updatedIssueList = [issue, ...state.issue];

        dispatch({ type: "issue/create", payload: updatedIssueList });
      } catch (err) {
        dispatch({ type: "error", payload: err as string });
      }
    },
    [state.issue]
  );

  async function updateIssue(issue: IssueType) {
    const owner = localStorage.getItem("owner");
    const token = localStorage.getItem("token");
    dispatch({ type: "loading" });

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

      if (!res.ok) throw new Error("Updating Issue Fails");

      const updatedIssueList = state.issue.map((issueEl) => {
        if (issueEl.number === issue.number) return issue;
        else return issueEl;
      });

      dispatch({ type: "issue/update", payload: updatedIssueList });
    } catch (err) {
      dispatch({ type: "error", payload: err as string });
    }
  }
  function logout() {
    localStorage.clear();
    dispatch({ type: "logout" });
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
        fetchRepositoryList,
        updateCurrentPage,
        logout,
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
