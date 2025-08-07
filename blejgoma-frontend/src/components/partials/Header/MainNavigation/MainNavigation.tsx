import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../../../lib/context/AuthContext/AuthContext";
import { useCartSummary } from "../../../../lib/hooks/cart/useCartSummary";
import { useOutsideClickDetection } from "../../../../lib/hooks/useOutsideClickDetection";
import { useSkeleton } from "../../../../lib/hooks/useSkeleton";
import { useCartContext } from "../../../../lib/context/CartContext/CartContext";
import { Icon } from "../../../shared/Icon/Icon";

import "./MainNavigation.scss";

export const MainNavigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userRef = useRef(null);
  const authCtx = useAuthContext();
  const { isLoading } = useCartContext();
  const { totalItems, total } = useCartSummary();
  const s = useSkeleton(isLoading, {
    width: "36px",
    style: {
      backgroundColor: "#393e47",
      backgroundImage: "linear-gradient(90deg, #393e47, #444b55, #393e47",
    },
  });

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useOutsideClickDetection(userRef, () => setDropdownOpen(false));
  //TODO:Refactor
  return (
    <div className="MainNavigation">
      <div className="MainNavigation__nav_wrapper container">
        <ul className="MainNavigation__nav">
          <li>
            <NavLink className="MainNavigation__nav_link" to="/">
              BALLINA
            </NavLink>
          </li>
          <li>
            <NavLink className="MainNavigation__nav_link" to="/about-us">
              RRETH NESH
            </NavLink>
          </li>
          <li>
            <NavLink className="MainNavigation__nav_link" to="/contact">
              NA KONTAKTONI
            </NavLink>
          </li>
          <li>
            <NavLink className="MainNavigation__nav_link" to="/wishlist">
              LISTA E DËSHIRAVE
            </NavLink>
          </li>
        </ul>

        <span className="MainNavigation__right">
          {!authCtx.isAuthenticated ? (
            <NavLink className="MainNavigation__nav_link--orange" to="/login">
              KYÇU
            </NavLink>
          ) : (
            <div ref={userRef}>
              <span
                className="MainNavigation__user_name"
                onClick={toggleDropdown}
              >
                {`${authCtx.user?.firstName} ${authCtx.user?.lastName}`}
              </span>
              {dropdownOpen && (
                <ul
                  className="MainNavigation__user_dropdown"
                  onClick={() => setDropdownOpen(false)}
                >
                  <li>
                    <NavLink to="/my-profile">Profili im</NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist">Lista e dëshirave</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-orders">Porositë e mia</NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={authCtx.logout}>
                      Dil
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          )}

          <NavLink
            className="MainNavigation__cart MainNavigation__nav_link--orange"
            to="/cart"
          >
            <Icon className="MainNavigation__cart_icon" icon="cart" />
            {totalItems && (
              <span className="MainNavigation__items">{totalItems}</span>
            )}
            <span className="MainNavigation__price">{s(total)}</span>
          </NavLink>
        </span>
      </div>
    </div>
  );
};
