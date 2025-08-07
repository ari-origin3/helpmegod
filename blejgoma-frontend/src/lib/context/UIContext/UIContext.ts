import React, { Dispatch, SetStateAction, useContext } from "react";

export interface UIContextType {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  filtersSidebarOpen: boolean;
  setFiltersSidebarOpen: Dispatch<SetStateAction<boolean>>;
  loadingCarsData: boolean;
  setLoadingCarsData: Dispatch<SetStateAction<boolean>>;
  isOnMotoTab: boolean;
  setIsOnMotoTab: Dispatch<SetStateAction<boolean>>;
}

const UIContextValues: UIContextType = {
  menuOpen: false,
  setMenuOpen: () => false,
  filtersSidebarOpen: false,
  setFiltersSidebarOpen: () => false,
  loadingCarsData: false,
  setLoadingCarsData: () => false,
  isOnMotoTab: false,
  setIsOnMotoTab: () => false,
};

export const UIContext = React.createContext<UIContextType>(UIContextValues);

export const useUIContext = () => useContext(UIContext);
