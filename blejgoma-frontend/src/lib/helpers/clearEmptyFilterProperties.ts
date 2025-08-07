import _ from "lodash";

export const clearEmptyFilterProperties = <filters extends object>(
  arrayOfFilters: filters
) => {
  return _.pickBy(arrayOfFilters, _.identity);
};
