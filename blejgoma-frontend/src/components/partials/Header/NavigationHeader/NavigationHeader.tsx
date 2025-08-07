import React, { useState } from "react";
import cs from "classnames";
import { useUIContext } from "../../../../lib/context/UIContext/UIContext";
import { Icon } from "../../../shared/Icon/Icon";
import { Search } from "../../../shared/Search/Search";
import { useRouter } from "../../../../lib/hooks/useRouter";
import { ReactComponent as LogoGray } from "../../../../assets/images/logo-gray.svg";
import { ReactComponent as LogoWhite } from "../../../../assets/images/logo-white.svg";

import "./NavigationHeader.scss";

export const NavigationHeader = () => {
  const router = useRouter();
  const searchValueFromURL = router.query.value || "";
  const [searchValue, setSearchValue] = useState(searchValueFromURL);
  const uiCtx = useUIContext();
  const toggleMenu = () => {
    uiCtx.setMenuOpen((prev) => !prev);
  };

  const redirectToSearchPage = () => {
    router.history.push(`/search?value=${searchValue}`);
  };

  const captureEnterKeyPress = (event: any) => {
    if (!searchValue) {
      return;
    }
    //Catch only Enter key press
    if (event.code === "Enter") {
      redirectToSearchPage();
    }
  };

  const handleSearchClick = () => {
    if (!searchValue) {
      return;
    }
    redirectToSearchPage();
  };
  return (
    <div
      className={cs(
        "NavigationHeader",
        uiCtx.menuOpen && "NavigationHeader--menu_open"
      )}
    >
      <div className="NavigationHeader__wrapper container">
        <span onClick={() => router.history.push("/")}>
          {uiCtx.menuOpen ? (
            <LogoWhite className="NavigationHeader__logo" />
          ) : (
            <LogoGray className="NavigationHeader__logo" />
          )}
          {/* <Icon className="NavigationHeader__logo" icon="logo" /> */}
        </span>
        <Search
          className="NavigationHeader__search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUpCapture={captureEnterKeyPress}
          onSearchIconClick={handleSearchClick}
        />
        <div className="NavigationHeader__menu_icon" onClick={toggleMenu}>
          <Icon icon={uiCtx.menuOpen ? "close" : "hamburger-menu"} />
        </div>
      </div>
    </div>
  );
};
