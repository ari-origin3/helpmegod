import { ReactNode } from "react";
import { Col, Container, Row } from "reactstrap";
import cs from "classnames";
import Skeleton from "react-loading-skeleton";

//components
import { Icon } from "../../components/shared/Icon/Icon";
import { Image } from "../../components/shared/Image/Image";
import { RatingStars } from "../../components/shared/RatingStars/RatingStars";
import { WishListButton } from "../../components/shared/WishlistButton/WishlistButton";
import { Banner } from "../../components/Banner/Banner";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { ProductItem } from "../../components/products/ProductItem/ProductItem";
import {
  EUTyreLabel,
  LetterRange,
} from "../../components/EUTyreLabel/EUTyreLabel";
import { AddToCart } from "../../components/products/AddToCart/AddToCart";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { useProductAttributes } from "../../lib/hooks/useProductAttributes";
import {
  useGetProductQuery,
  SimpleProduct,
  useGetRelatedProductsQuery,
} from "../../graphql/generated/generated";
import { InfoPlaceholder } from "../../components/shared/InfoPlaceholder/InfoPlaceholder";
import { Maybe } from "graphql/jsutils/Maybe";
import Vere from "../../assets/icons/vera.svg";
import Dimer from "../../assets/icons/dimer.svg";
import Sezonale from "../../assets/icons/dimervere.svg";

//styles
import "./SingleProduct.scss";

interface Props {
  match: { params: { slug: string } };
}

export const SingleProduct = (props: Props) => {
  const productSlug = props.match.params.slug;
  const { data, loading } = useGetProductQuery({
    variables: { slug: productSlug },
  });

  const s = useSkeleton(loading, {
    width: "155px",
    style: {
      color: "white",
    },
  });

  const product = data?.products?.nodes?.[0] as SimpleProduct;
  const breadCrumbsData = generateSingleProductBreadCrumbsArray(
    data?.products?.nodes?.[0] as SimpleProduct
  );

  const productAttr = useProductAttributes(
    data?.products?.nodes?.[0] as SimpleProduct
  );
  const productImageSourceURL = encodeURI(
    `https://management.blejgoma.com/wp-content/uploads/photos/${product?.productMetas?.model}.jpg`
  );

  return (
    <div className="SingleProduct">
      {!loading && !product ? (
        <Container>
          <InfoPlaceholder
            className="mt-2"
            icon="vemendje-icon"
            text="Produkti nuk u gjet"
          />
        </Container>
      ) : (
        <>
          <Container>
            <BreadCrumbs data={breadCrumbsData} loading={loading} disableLast />
            <div className="SingleProduct__content">
              <div
                className={cs(
                  "SingleProduct__image",
                  loading && "SingleProduct__image--loading"
                )}
              >
                {s(<Image src={productImageSourceURL} />, {
                  height: "100%",
                  width: "100%",
                  style: { marginTop: "-5px" },
                })}
              </div>
              <div className="SingleProduct__details">
                <Col>
                  <div className="SingleProduct__brand">
                    {s(productAttr.brand.name, {
                      width: "57px",
                      style: {
                        backgroundColor: "#393e47",
                        backgroundImage:
                          "linear-gradient(90deg, #393e47, #444b55, #393e47",
                      },
                    })}
                  </div>
                  <RatingStars rate={5} />
                  <ProductLabel
                    className="SingleProduct__title"
                    label={s(productAttr.name, { width: "276px" })}
                    text={product?.productCategories?.nodes?.[0]?.name}
                  />
                  <ProductLabel label="Çmimi" text={s(productAttr.price)} />
                  {productAttr.tireSize && (
                    <ProductLabel
                      label="Përmasat e gomës"
                      text={s(productAttr.tireSize)}
                    />
                  )}
                  <ProductLabel
                    label="Gjendja"
                    className={cs(
                      "SingleProduct__stock_status",
                      productAttr.stockStatus === "OUT_OF_STOCK" &&
                        "SingleProduct__stock_status--out"
                    )}
                    text={s(
                      productAttr.stockStatus === "IN_STOCK"
                        ? "Në stok"
                        : "Jashtë stokut"
                    )}
                  />
                  {productAttr.loadIndex && (
                    <ProductLabel
                      label="Indeksi i ngarkesës"
                      text={s(productAttr.loadIndex)}
                    />
                  )}
                  {productAttr.speedIndex && (
                    <ProductLabel
                      label="Indeksi i shpejtësisë"
                      text={s(productAttr.speedIndex)}
                    />
                  )}
                  {productAttr.season.name && (
                    <ProductLabel
                      label="Sezoni"
                      text={s(productAttr.season.name)}
                    />
                  )}
                  <Row className="SingleProduct__add_to_cart">
                    <AddToCart
                      productCategory={productAttr.category.slug}
                      stock={productAttr!.stockQuantity}
                      productId={productAttr!.id}
                      disabled={loading}
                    />
                    <WishListButton id={productAttr.id} square />
                  </Row>
                  <Row>
                    <label className="SingleProduct__label">
                      Metoda e pagesës
                    </label>
                    <p className="SingleProduct__text"></p>
                    <div className="SingleProduct__payment_methods">
                      <Icon icon="mastercard" />
                      <Icon icon="maestro" />
                      <Icon icon="visa" />
                    </div>
                  </Row>
                </Col>
              </div>
            </div>

            {productAttr.euLabel.fuel && (
              <>
                <Row>
                  <label className="SingleProduct__label">
                    ETIKETË EUROPIANE
                  </label>
                </Row>
                <div className="SingleProduct__eu_label">
                  {s(
                    <EUTyreLabel
                      fuel={productAttr.euLabel.fuel as LetterRange}
                      rain={productAttr.euLabel.rain as LetterRange}
                      noise={productAttr.euLabel.noise}
                    />,
                    { width: "161px", height: "235px" }
                  )}

                  <div className="SingleProduct__label_info">
                    <p className="SingleProduct__label">
                      KONSUMI I KARBURANTIT
                    </p>
                    <p className="SingleProduct__eu_regulation">
                      Bazuar në Rregulloren Eu (EC) No 1222/2009 të 1 Nëntorit
                      2012, të gjitha gomat e shitura në Europë duhet të kenë
                      një etiketë zyrtare europiane. Kjo etiketë përfshinë këto
                      3 informata:
                    </p>
                    <p className="SingleProduct__eu_text">
                      A (Konsumi minimal) to G (Konsumi maksimal)
                    </p>

                    <p className="SingleProduct__label">
                      NË TERRENE TË VËSHTIRA:
                    </p>
                    <p className="SingleProduct__eu_text">
                      A ( distanca më e shkurtë e frenimit) to G (distanca më e
                      gjatë e frenimit)
                    </p>

                    <p className="SingleProduct__label">NIVELI I ZHURMËS</p>
                    <p className="SingleProduct__eu_text">
                      1 (më e lehtë), 2 (mesatare) 3 (më e zhurmshme)
                    </p>
                  </div>
                </div>
              </>
            )}
          </Container>
          <Banner />
          <Container>
            <div className="SingleProduct__related_wrapper">
              <ImageSlider className="SingleProduct__slider" />
              <RelatedProducts
                excludedProductId={productAttr.id}
                category={productAttr.category.slug}
              />
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

//Single product label component
interface ProductLabelProps {
  className?: string;
  label?: string | null | ReactNode;
  text?: string | null | ReactNode;
}
function ProductLabel(props: ProductLabelProps) {
  return (
    <Row className={cs("SingleProduct__wrapper", props.className)}>
      <label className="SingleProduct__label">{props.label}</label>
      <div className="seasonWrapper">
        <p className="SingleProduct__text">{props.text}</p>
        {props.text === "4 Sezonale" ? (
          <img className="LogoSezoni" src={Sezonale} alt="" />
        ) : (
          ""
        )}
        {props.text === "Vere" ? (
          <img className="LogoSezoni" src={Vere} alt="" />
        ) : (
          ""
        )}
        {props.text === "Dimer" ? (
          <img className="LogoSezoni" src={Dimer} alt="" />
        ) : (
          ""
        )}
      </div>
    </Row>
  );
}
interface RelatedProductsProps {
  excludedProductId: number;
  category?: Maybe<string>;
}

function RelatedProducts(props: RelatedProductsProps) {
  const { data, loading } = useGetRelatedProductsQuery({
    variables: {
      exclude: props.excludedProductId,
      limit: 3,
      category: props.category || "",
    },
  });
  const relatedProducts = data?.products?.nodes as SimpleProduct[];

  return (
    <div className="SingleProduct__related_products">
      <h5 className="SingleProduct__heading">Produkte të ngjajshme</h5>
      {loading ? (
        <Skeleton count={3} height="155px" style={{ marginBottom: "10px" }} />
      ) : (
        relatedProducts?.map((product) => <ProductItem product={product} />)
      )}
    </div>
  );
}

function generateSingleProductBreadCrumbsArray(product: SimpleProduct) {
  const category = product?.productCategories?.nodes?.[0];
  const brand = product?.productManufacturers?.nodes?.[0];

  return [
    { label: "Home", path: "/" },
    {
      label: category?.name,
      path: `/shop?productCategories=${category?.slug}`,
    },
    {
      label: brand?.name,
      path: category?.slug
        ? `/shop?productCategories=${
            category?.slug
          }&productManufacturers=${brand?.name?.toLowerCase()}`
        : `/shop?productManufacturers=${brand?.name?.toLowerCase()}`,
    },
    { label: product?.name, path: `/product/${product?.slug}` },
  ];
}
