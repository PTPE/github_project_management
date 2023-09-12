import { createContext, useCallback, useContext, useReducer } from "react";

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
  search: "",
  owner: "",
  token: "",
  filter: "",
  order: "",
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
  updateSearchKeyWord: (search: string) => void;
  updateFilter: (filter: string[]) => void;
  updateOrder: (order: string) => void;
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
        `https://api.github.com/search/issues?q=${owner} ${state.filter} ${state.search}&sort=created&${state.order}`
      );

      const data = await res.json();
      const issueData = data.items.map((issue: any) => {
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

  return (
    <IssueDataContext.Provider
      value={{
        state,
        fetchIssue,
        fetchUser,
        updateSearchKeyWord,
        updateFilter,
        updateOrder,
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
