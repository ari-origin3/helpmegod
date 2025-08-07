export const generateShopBreadCrumbsArray = (category: any, brand: any) => {
  let breadCrumbsArr = [{ label: "Home", path: "/" }];
  if (!category && !brand) return breadCrumbsArr;
  if (!!category && !brand) {
    breadCrumbsArr.push({
      label: category.name,
      path: `/shop?productCategories=${category.slug}`,
    });
  }
  if (!category && !!brand) {
    breadCrumbsArr.push({
      label: brand.name,
      path: `/shop?productManufacturers=${brand.slug}`,
    });
  }

  if (!!category && !!brand) {
    breadCrumbsArr.push({
      label: category.name,
      path: `/shop?productCategories=${category.slug}`,
    });
    breadCrumbsArr.push({
      label: brand.name,
      path: `/shop?productCategories=${category.slug}&productManufacturers=${brand.slug}`,
    });
  }

  return breadCrumbsArr;
};
