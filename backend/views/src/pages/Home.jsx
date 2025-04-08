import '../App.css'
import Card from '../components/Card'
import VehicleSelection from '../components/VehicleSelection'
import Card2 from '../components/Card2';
import Cart from '../components/Cart';
import CarCarousel from '../components/carousel';
export default function Home() {
  return (
    <>
    <CarCarousel/>
    {/* <VehicleSelection/> */}
    <Card/>
    <Card2/>
    <Cart/>
    </>
  );
}

