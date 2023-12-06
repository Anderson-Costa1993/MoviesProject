import { createContext, useState, ReactNode } from "react";

type PageType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const ContextPage = createContext<PageType | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);

  const contextValue: PageType = {
    page,
    setPage,
  };

  return (
    <ContextPage.Provider value={contextValue}>{children}</ContextPage.Provider>
  );
};

export default ContextProvider;
