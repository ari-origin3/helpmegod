import { Banner } from "../../components/Banner/Banner";
import { FindTires } from "../../components/FindTires/FindTires";
import { CompaniesSlider } from "../../components/CompaniesSlider/CompaniesSlider";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { RecommendedProducts } from "../../components/RecommendedProducts/RecommendedProducts";
import { CamapignGrid } from "../../components/CampaignGrid/CampaignGrid";
import { BannerAd } from "../../components/BannerAd/BannerAd";

//styles
import "./Home.scss";

export const Home = () => {
  return (
    <div className="Home">
      <FindTires />
      <Banner className="Home__banner" />
      <div className="Home__row container">
        <ImageSlider className="Home__slider" />
        <RecommendedProducts />
      </div>
      <CompaniesSlider />
      <CamapignGrid />
      <BannerAd />
    </div>
  );
};
