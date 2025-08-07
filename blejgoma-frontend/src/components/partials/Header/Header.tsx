import React from "react";
import { MainNavigation } from "./MainNavigation/MainNavigation";

//Styles
import "./Header.scss";
import { NavigationHeader } from "./NavigationHeader/NavigationHeader";
import { FullScreenMenu } from "./FullScreenMenu/FullScreenMenu";
import { useUIContext } from "../../../lib/context/UIContext/UIContext";

export const Header = () => {
  const uiCtx = useUIContext();
  return (
    <div className="Header">
      <MainNavigation />
      <NavigationHeader />
      {uiCtx.menuOpen && <FullScreenMenu />}
    </div>
  );
};
