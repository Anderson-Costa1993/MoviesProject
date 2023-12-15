import { createContext, useState, ReactNode } from "react";

type PageType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  scrollTop: () => void
};

export const ContextPage = createContext<PageType | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);

  const scrollTop  = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contextValue: PageType = {
    page,
    setPage,
    scrollTop
  };

  return (
    <ContextPage.Provider value={contextValue}>{children}</ContextPage.Provider>
  );
};

export default ContextProvider;
