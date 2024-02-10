import { createContext, useContext, useState } from "react";

const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDetails, setIsDetails] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <ResultContext.Provider value={{ createType, isCreating, isEditing, isDetails, isSearching, setIsSearching, setIsDetails, setCreateType, setIsCreating, setIsEditing }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
