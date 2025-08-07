export interface MarketI {
  slug: string;
  name: string;
}
export const getMarketsFromCarData = (data: Array<any>) => {
  let markets: MarketI[] = [];

  data.forEach((carModel) => {
    if (markets.some((item) => carModel.market.slug === item.slug)) return;
    markets.push({ slug: carModel.market.slug, name: carModel.market.name });
  });
  return markets;
};
