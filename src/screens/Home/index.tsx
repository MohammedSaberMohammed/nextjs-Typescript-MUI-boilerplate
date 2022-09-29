
// Components
import Search from './sections/Search/search';
import Intro from './sections/Intro/intro';
import Brief from './sections/Brief/brief';
import NewestProducts from './sections/NewestProducts/newestProducts';
import BestSellingProducts from './sections/BestSellingProducts/bestSellerProducts';
import NewAds from './sections/NewAds/newAds';
import Advertise from './sections/Advertise/advertise';
import MostVisitedAds from './sections/MostVisitedAds/mostVisitedAds';
import SparePartsSections from './sections/SparePartsSections/sparePartsSections';
import Brands from './sections/Brands/brands';
import Partners from './sections/Partners/partners';
// Models
import { HomeProps } from '@/models/pages/home';

const HomePage = ({
  bestSellingProducts,
  brands,
  categories,
  mostViewedAds,
  newAds,
  newestProducts
}: HomeProps) => {
  console.log({
    bestSellingProducts,
    brands,
    categories,
    mostViewedAds,
    newAds,
    newestProducts
  });
  return (
    <>
      <Search categories={categories} />
      <Intro />
      <Brief />
      <NewestProducts products={newestProducts} />
      <BestSellingProducts products={bestSellingProducts}/>
      <NewAds ads={newAds} />
      <Advertise />
      <MostVisitedAds ads={mostViewedAds} />
      <SparePartsSections categories={categories} />
      <Brands brands={brands} />
      <Partners /> 
    </>
  );
};

export default HomePage;
