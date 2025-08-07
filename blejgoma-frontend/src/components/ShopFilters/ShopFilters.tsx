import { useRef } from "react";
import cs from "classnames";
import Skeleton from "react-loading-skeleton";
import { useGetAllFiltersQuery } from "../../graphql/generated/generated";
import { useShopContext } from "../../lib/context/ShopContext/ShopContext";
import { ProductFilters } from "../../lib/context/ShopContext/ShopContextProvider";
import { useUIContext } from "../../lib/context/UIContext/UIContext";
import {
  selectFilterType,
  transformArrayToFilterOptions,
} from "../../lib/helpers/transformArrayToFilterOptions";
import { useWindowWidth } from "../../lib/hooks/useWindowWidth";
import { Accordion } from "../Accordion/Accordion";
import { CheckBox } from "../shared/CheckBox/CheckBox";
import { Select, Option as SelectOption } from "../shared/Select/Select";

import "./ShopFilters.scss";

const filterTitles: any = {
  paWidths: "Gjerësia",
  paHeights: "Lartësia",
  paDiameters: "Diametri",
  paSeasons: "Sezoni",
  productCategories: "Kategoritë",
  productManufacturers: "Brendi",
};
export const ShopFilters = () => {
  const { data, loading } = useGetAllFiltersQuery();
  const shopCtx = useShopContext();
  const { filtersSidebarOpen, setFiltersSidebarOpen } = useUIContext();
  const filtersRef = useRef(null);
  const windowWidth = useWindowWidth();

  const transformedData = transformArrayToFilterOptions(data);
  const isMobile = windowWidth < 768;

  return (
    <div className="ShopFilters__wrapper" ref={filtersRef}>
      <div
        className={cs("ShopFilters", filtersSidebarOpen && "ShopFilters--open")}
      >
        <span className="ShopFilters__label">Filtro</span>
        {loading ? (
          <Skeleton height="980px" />
        ) : (
          <div className="ShopFilters__content">
            {transformedData?.map((item) => {
              const key = item.key as keyof ProductFilters;

              return (
                <Accordion title={filterTitles[item.key] || ""} key={item.key}>
                  {selectFilterType[key] ? (
                    item.nodes.map((node) => {
                      return (
                        <CheckBox
                          small
                          key={`ShopFilter--${node.value}`}
                          value={shopCtx.filters?.[key]?.includes(
                            node?.value as string
                          )}
                          label={node.label as string}
                          onChange={(event) => {
                            shopCtx.handleCheckboxFilterChange(
                              key,
                              node?.value as string
                            );
                          }}
                        />
                      );
                    })
                  ) : (
                    <Select
                      className="ShopFilters__select"
                      options={item?.nodes}
                      onChange={(option: SelectOption | null) => {
                        shopCtx.handleSelectFilterChange(
                          item.key as any,
                          option as any
                        );
                      }}
                      small
                      isMulti
                      value={item.nodes?.filter((item: any) => {
                        return shopCtx.filters?.[key].includes(item?.value);
                      })}
                    />
                  )}
                </Accordion>
              );
            })}
          </div>
        )}
      </div>
      <div
        className={cs(
          "ShopFilters__overlay",
          isMobile && filtersSidebarOpen && "ShopFilters__overlay--show"
        )}
        onClick={() => setFiltersSidebarOpen(false)}
      />
    </div>
  );
};
