import React from "react";
import cs from "classnames";
import { Link } from "react-router-dom";
import { useGetAllProductCategoriesQuery } from "../../../../graphql/generated/generated";
import { Container } from "reactstrap";
import { useUIContext } from "../../../../lib/context/UIContext/UIContext";
import { Footer } from "../../Footer/Footer";
import { useAddStyleToBody } from "../../../../lib/hooks/useAddStyleToBody";
import { useSkeleton } from "../../../../lib/hooks/useSkeleton";

import "./FullScreenMenu.scss";
export const FullScreenMenu = () => {
  const { data, loading } = useGetAllProductCategoriesQuery();
  const uiCtx = useUIContext();
  useAddStyleToBody("overflow", "hidden");

  const toggleMenu = () => {
    uiCtx.setMenuOpen((prev) => false);
  };

  const s = useSkeleton(loading, {
    width: "150px",
    height: "15px",
    count: 4,
    style: {
      marginRight: "60px",
    },
  });

  return (
    <div
      className={cs(
        "FullScreenMenu",
        !uiCtx.menuOpen && "FullScreenMenu--closed"
      )}
    >
      <Container>
        <div className="FullScreenMenu__categories">
          {s(
            <ul>
              {data?.productCategories?.nodes?.map((item) => {
                return (
                  <li key={item?.slug}>
                    <Link
                      to={`/shop?productCategories=${item?.slug}`}
                      onClick={() => toggleMenu()}
                    >
                      {item?.name?.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <Footer className="FullScreenMenu__footer" />
      </Container>
    </div>
  );
};
