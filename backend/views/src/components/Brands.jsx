import React from 'react';
import bently from "../assets/logo/bently.png";
import maserati from "../assets/logo/maserati.png";
import volkswagon from "../assets/logo/volkswagon.png";

function Brands() {
  return (
    <>
      <div className="text-white bg-[#6b7280]/70 my-10" style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}>
        <div className="text-center py-10">
          <h1 className="text-3xl font-semibold">
            Explore Luxury Cars {"\t"}
            <span className="text-yellow-500">
              by Brand
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-10 pb-12">
          {/* Brand Logos */}
          <div className="text-center">
            <img alt="Aston Martin logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2024/04/Aston-martin.png" />
            <p>Aston Martin</p>
          </div>
          <div className="text-center">
            <img alt="Audi logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002914.png" />
            <p>Audi</p>
          </div>
          <div className="text-center">
            <img alt="Bentley logo" className="mx-auto mb-2 h-16" src={bently} />
            <p>Bentley</p>
          </div>
          <div className="text-center">
            <img alt="BMW logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002917.png" />
            <p>BMW</p>
          </div>
          <div className="text-center">
            <img alt="DC logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2024/07/dc2.png" />
            <p>DC</p>
          </div>
          <div className="text-center">
            <img alt="Ferrari logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2024/01/Untitled-2.png" />
            <p>Ferrari</p>
          </div>
          <div className="text-center">
            <img alt="Ford logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002916.png" />
            <p>Ford</p>
          </div>
          <div className="text-center">
            <img alt="Jaguar logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002929.png" />
            <p>Jaguar</p>
          </div>
          <div className="text-center">
            <img alt="Jeep logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002930.png" />
            <p>Jeep</p>
          </div>
          <div className="text-center">
            <img alt="Kia logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002931.png" />
            <p>Kia</p>
          </div>
          <div className="text-center">
            <img alt="Lamborghini logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002923.png" />
            <p>Lamborghini</p>
          </div>
          <div className="text-center">
            <img alt="Lexus logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002925.png" />
            <p>Lexus</p>
          </div>

          <div className="text-center">
            <img alt="Maserati logo" className="mx-auto mb-2 h-16" src={maserati} />
            <p>Maserati</p>
          </div>

          <div className="text-center">
            <img alt="Mercedes Benz logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002922.png" />
            <p>Mercedes Benz</p>
          </div>

          <div className="text-center">
            <img alt="MG logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002924.png" />
            <p>MG</p>
          </div>

          <div className="text-center">
            <img alt="Mini logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002927.png" />
            <p>Mini</p>
          </div>

          <div className="text-center">
            <img alt="Porsche logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002920.png" />
            <p>Porsche</p>
          </div>

          <div className="text-center">
            <img alt="Range Rover/Land Rover logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002919.png" />
            <p>Range Rover/Land Rover</p>
          </div>

          <div className="text-center">
            <img alt="Rolls Royce logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2024/04/rr_logo-removebg-preview.png" />
            <p>Rolls Royce</p>
          </div>

          <div className="text-center">
            <img alt="Toyota logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002915.png" />
            <p>Toyota</p>
          </div>

          <div className="text-center">
            <img alt="Volkswagon logo" className="mx-auto mb-2 h-16" src={volkswagon} />
            <p>Volkswagon</p>
          </div>

          <div className="text-center">
            <img alt="Volvo logo" className="mx-auto mb-2 h-16" src="https://fusioncars.in/wp-content/uploads/2023/06/Group-1000002921.png" />
            <p>Volvo</p>
          </div>

          <div className="text-center">
            <img alt="Volvo logo" className="mx-auto mb-2 h-16" src="https://w7.pngwing.com/pngs/221/233/png-transparent-bugatti-veyron-car-bugatti-chiron-bugatti-vision-gran-turismo-bugatti-emblem-label-text-thumbnail.png" />
            <p>Bugatti</p>
          </div>

          <div className="text-center">
            <img alt="Volvo logo" className="mx-auto mb-2 h-16" src="https://icon2.cleanpng.com/20180630/rch/aayk7cz41.webp" />
            <p>Tesla</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brands;