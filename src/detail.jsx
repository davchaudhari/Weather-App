// CityDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function CityDetail() {
  let { cityName } = useParams();

  // You can fetch more detailed data using cityName or just display it
  return (
    <div>
      <h2>Details for {cityName}</h2>
    </div>
  );
}

export default CityDetail;
