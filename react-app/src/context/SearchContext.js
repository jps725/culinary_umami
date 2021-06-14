import React, { createContext, useState, useContext } from "react";

export const SearchContext = createContext();
export const useSearchValue = () => useContext(SearchContext);

export default function SearchProvider(props) {
  const [searchValue, setSearchValue] = useState(null);
  const [searchFlag, setSearchFlag] = useState(false);

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue, searchFlag, setSearchFlag }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
