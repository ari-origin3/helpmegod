import React from "react";
import { Container } from "reactstrap";
import { ShopContextProvider } from "../../lib/context/ShopContext/ShopContextProvider";

import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ShopFilters } from "../../components/ShopFilters/ShopFilters";
import { ShopProducts } from "../../components/ShopProducts/ShopProducts";

import { useGetBrandAndCategoryBySlugQuery } from "../../graphql/generated/generated";
import { useRouter } from "../../lib/hooks/useRouter";
import { generateShopBreadCrumbsArray } from "../../lib/helpers/generateShopBreadCrumbsArray";

import "./Shop.scss";
import { Icon } from "../../components/shared/Icon/Icon";
import { useUIContext } from "../../lib/context/UIContext/UIContext";
import { useWindowWidth } from "../../lib/hooks/useWindowWidth";
import { useEffect } from "react";

const loadingBreadcrumbsData = [
  { label: "", path: "" },
  { label: "", path: "" },
];

export const Shop = () => {
  const { query: urlQueryParams } = useRouter();
  const { filtersSidebarOpen, setFiltersSidebarOpen } = useUIContext();
  const windowWidth = useWindowWidth();

  const { data, loading } = useGetBrandAndCategoryBySlugQuery({
    variables: {
      category: urlQueryParams.productCategories,
      brand: urlQueryParams.productManufacturers,
    },
  });
  const productCategory = data?.productCategories?.nodes?.[0];
  const productBrand = data?.productManufacturers?.nodes?.[0];
  const breadCrumbsData = generateShopBreadCrumbsArray(
    productCategory,
    productBrand
  );

  useEffect(() => {
    if (filtersSidebarOpen === true) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "visible";
  }, [filtersSidebarOpen]);

  const isMobile = windowWidth < 768;

  return (
    <div className="Shop">
      <ShopContextProvider>
        <Container>
          <BreadCrumbs
            data={loading ? loadingBreadcrumbsData : breadCrumbsData}
            loading={loading}
          />
          <div className="Shop__content">
            <ShopFilters />
            <ShopProducts />
            {isMobile && (
              <div
                className="Shop__filters_button"
                onClick={() => {
                  setFiltersSidebarOpen((prev) => !prev);
                  return;
                  // }
                }}
              >
                <Icon className="Shop__filter_icon" icon="filter-icon" />
              </div>
            )}
          </div>
        </Container>
      </ShopContextProvider>
    </div>
  );
};
