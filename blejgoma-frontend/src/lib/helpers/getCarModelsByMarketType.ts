export const getCarModelsByMarketType = (
  data: Array<any>,
  marketSlug: string
) => {
  return data.filter((carData) => carData.market.slug === marketSlug);
};
