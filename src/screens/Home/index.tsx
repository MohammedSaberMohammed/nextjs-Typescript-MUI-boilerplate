
// Components
import Search from './sections/Search/search';
import Intro from './sections/Intro/intro';
import Brief from './sections/Brief/brief';
import NewestProducts from './sections/NewestProducts/newestProducts';
import BestSellerProducts from './sections/BestSellerProducts/bestSellerProducts';
import NewAds from './sections/NewAds/newAds';
import Advertise from './sections/Advertise/advertise';
import MostVisitedAds from './sections/MostVisitedAds/mostVisitedAds';
import SparePartsSections from './sections/SparePartsSections/sparePartsSections';
import Brands from './sections/Brands/brands';
import Partners from './sections/Partners/partners';
// Models
import { HomeProps } from '@/models/pages/home';

const HomePage = ({
  bestSellerProducts,
  brands,
  categories,
  mostViewedAds,
  newAds,
  newestProducts
}: HomeProps) => {
  console.log({
    bestSellerProducts,
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
      {/* <BestSellerProducts products={bestSellerProducts}/>
      <NewAds ads={newAds} />
      <Advertise />
      <MostVisitedAds ads={mostViewedAds} />
      <SparePartsSections categories={categories} />
      <Brands brands={brands} />
      <Partners /> */}
    </>
  );
};

export default HomePage;
