import React from 'react';
import '../css/card.css'; // Ensure the CSS path is correct
import carimage from "../assets/carimage2.webp"
function Card() {
    return (
        <div className="card">
            <img src={carimage} alt="Sentinel Classic Widebody" className="card-image" />
            <div className="card-info">
                <p className="brand-name">Übermacht</p>
                <h2 className="car-name">Sentinel Classic Widebody</h2>
                <p className="car-details">Class: Sports</p>
                <p className="car-speed">Maximum Speed: 120.4 mph</p>
                <p className="car-price">Price: $150,000</p>
                <p className="car-uploaded">Upgrade</p>
                <p className="car-uploaded">Released Nov 12, 2020</p>
            </div>
        </div>
    );
}

export default Card;
