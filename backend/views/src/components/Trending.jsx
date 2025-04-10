import React from 'react';
import Card from './Card'; // Adjust the path if needed

const TrendingSection = () => {
    return (
        <div className="trending-section px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-2xl font-bold">Trending</h2>
                
            </div>

            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default TrendingSection;
