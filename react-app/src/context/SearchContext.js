import React, { createContext, useState, useContext } from "react";

export const SearchContext = createContext();
export const useSearchValue = () => useContext(SearchContext);

export default function SearchProvider(props) {
  const [searchValue, setSearchValue] = useState(null);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {props.children}
    </SearchContext.Provider>
  );
}
