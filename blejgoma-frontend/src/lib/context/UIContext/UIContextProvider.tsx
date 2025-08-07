import React, { useState } from "react";
import { UIContext, UIContextType } from "./UIContext";

interface UIContextProviderProps {
  children: React.ReactNode | null;
}

// interface UIContextProviderState {
//   menuOpen: boolean;
// }

export const UIContextProvider = (props: UIContextProviderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersSidebarOpen, setFiltersSidebarOpen] = useState(false);
  const [loadingCarsData, setLoadingCarsData] = useState(false);
  const [isOnMotoTab, setIsOnMotoTab] = useState(false);

  const context: UIContextType = {
    menuOpen,
    setMenuOpen,
    filtersSidebarOpen,
    setFiltersSidebarOpen,
    loadingCarsData,
    setLoadingCarsData,
    isOnMotoTab,
    setIsOnMotoTab,
  };

  return (
    <UIContext.Provider value={context}>{props.children}</UIContext.Provider>
  );
};
