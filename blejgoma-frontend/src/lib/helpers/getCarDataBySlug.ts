export const getCarDataBySlug = (data: Array<any>, slug: string) => {
  return data.find((obj) => obj.slug === slug);
};
