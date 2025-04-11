import '../App.css'
import Card from '../components/Card'
import VehicleSelection from '../components/VehicleSelection'
import TrendingSection from '../components/Trending';
import Brands from '../components/Brands';
import CarCarousel from '../components/carousel';
export default function Home() {
  return (
    <>
    <CarCarousel/>
    <TrendingSection/>
    <Brands/>
    {/* <VehicleSelection/> */}
    {/* <Card/> */}
    </>
  );
}

