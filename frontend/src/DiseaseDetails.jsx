import React from 'react';
import { useLocation } from 'react-router-dom';

function DiseaseDetails() {
  const location = useLocation();
  const { disease } = location.state || {}; // Use destructuring with default value to avoid "Cannot read properties of undefined"

  if (!disease) {
    return <div>Disease not found</div>;
  }

  return (
    <div style={{marginLeft: '10rem' }}>
      <h2>{disease.name}</h2>
      <img src={`/${disease.image}`} alt={disease.name} style={{height: '20rem' }} />
      <p>Description: {disease.description}</p>
      <p>Remedy: {disease.remedy}</p>
      <p>Duration: {disease.duration}</p>
    </div>
  );
}

export default DiseaseDetails;
