// LineChartFromDatabase.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LineChartFromDatabase() {
  const navigate = useNavigate();

  function truncateDescription(description, limit) {
    if (!description) return ''; // Return empty string if description is undefined or null
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return description;
  }
  

  const diseases = [
    {
      name: 'Red Leaf Spots',
      image: 'Red Leaf Spot.jpg',
      description: 'Red spot disease in tea leaves, often occurring in Sri Lanka (SL), is a fungal infection caused primarily by the fungus *Cercospora theae*. It manifests as small, red or reddish-brown spots on the tea leaves, which can lead to significant quality and yield losses if not controlled. The spots may sometimes be surrounded by a yellow halo and can coalesce into larger lesions as the disease progresses. High humidity and warm temperatures typically exacerbate the spread and severity of red spot disease. Management practices include the use of resistant tea cultivars, proper field sanitation, balanced fertilization to avoid excessive nitrogen, and the application of appropriate fungicides as part of an integrated pest management strategy.',
      remedy: 'Detailed remedy for Red Leaf Spots.',
      duration: '4 - 5 Weeks'
    },
    {
      name: 'Algal Leaf',
      image: 'Algal leaf spot.jpg',
      description: 'Algal leaf spot disease in tea leaves, seen in Sri Lanka (SL), is caused by the green algae *Cephaleuros virescens*. This disease is marked by the appearance of green to orange or rust-colored spots on the upper surfaces of tea leaves. These spots are slightly raised and velvety in texture. Over time, they can lead to a reduction in photosynthesis, weakening the tea plant and potentially decreasing the yield and quality of the tea leaves. Algal leaf spot is more common in areas with high humidity, excessive rainfall, and where tea plants are under stress due to poor nutrition or other environmental factors. Management strategies include improving air circulation within tea fields through proper pruning, ensuring balanced nutrition to avoid plant stress, and applying copper-based fungicides or algaecides in severe cases as part of an integrated disease management approach.',
      remedy: 'Detailed remedy for Algal Leaf.',
      duration: '3 - 4 weeks'
    },
    {
      name: 'Bird Eye Spot',
      image: 'Bird Eye Spot.jpg',
      description: 'Bird eye spot disease in tea leaves in Sri Lanka (SL) is caused by the fungus *Cercospora theae*. This disease is identifiable by its distinctive small, circular spots with a reddish-brown center and a yellowish halo, resembling a birds eye. The spots are primarily found on the leaves, and severe infections can lead to premature leaf drop, reducing the overall yield and quality of the tea. Bird eye spot favors warm, humid conditions, which are prevalent in the tea-growing regions of Sri Lanka. To manage this disease, tea growers can adopt strategies such as using resistant tea plant varieties, ensuring proper field sanitation by removing and destroying infected leaves, and applying fungicides as part of an integrated pest management program to control the spread of the fungus.',
      remedy: 'Detailed remedy for Bird Eye Spot.',
      duration: '5-6 weeks'
    },
    {
      name: 'Gray Light',
      image: 'Grey blight.jpg',
      description: 'Grey blight disease in tea leaves, prevalent in Sri Lanka (SL), is caused by the fungus *Pestalotiopsis theae*. This disease is recognizable by the appearance of small, circular, or irregular grey spots on the tea leaves. These spots can expand, leading to significant leaf damage and, subsequently, a reduction in the overall tea quality and yield. Grey blight thrives in conditions of high humidity and moderate temperatures, common in many tea-growing regions of Sri Lanka. To manage grey blight, tea growers may employ strategies including the cultivation of resistant varieties, the maintenance of proper field hygiene to reduce fungal spore levels, and the application of fungicides as part of an integrated disease management program.',
      remedy: 'Detailed remedy for Gray Light.',
      duration: '3-4 weeks'
    },
    {
      name: 'White Spot',
      image: 'White spot.jpg',
      description: 'White spot disease in tea leaves, encountered in Sri Lanka (SL), is a fungal infection caused by the pathogen *Corticium salmonicolor*. This disease is characterized by the presence of small, white to pale pink spots on the tea leaves. These spots can enlarge over time and merge, forming larger patches of infected tissue. In severe cases, the fungus can also affect the stems and branches of the tea plant, leading to a decline in the plants overall health. The white spots can reduce the photosynthetic area of the leaves, weakening the tea plant and potentially decreasing both the yield and quality of the tea produced. White spot disease thrives in warm, humid conditions, which are common in many tea-growing areas of Sri Lanka. Management of this disease includes the implementation of good agricultural practices such as pruning to improve air circulation, removing infected plant parts to reduce disease spread, and applying fungicides when necessary as part of an integrated disease management strategy.',
      remedy: 'Detailed remedy for White Spot.',
      duration: '4-6 Weeks'
    },
    {
      name: 'Anthracnose',
      image: 'Anthracnose.jpg',
      description: 'Anthracnose disease in tea leaves in Sri Lanka (SL) is caused by the fungus *Colletotrichum* spp. This disease is characterized by the appearance of dark, sunken lesions on the leaves, stems, and sometimes the buds of tea plants. The affected areas can lead to significant defoliation and shoot dieback, severely impacting the health of the tea plants and reducing both the yield and quality of tea leaves. Anthracnose thrives in warm, wet conditions, which are common in many tea-growing areas of Sri Lanka. Management of anthracnose involves adopting practices such as using disease-resistant tea varieties, improving air circulation through pruning, ensuring field sanitation to remove infected plant material, and applying fungicides when necessary as part of an integrated pest management strategy.',
      remedy: 'Detailed remedy for Anthracnose.',
      duration: '3-4 Weeks'
    },
    {
      name: 'Brown Blight',
      image: 'brown blight.jpg',
      description: 'Brown blight disease in tea leaves in Sri Lanka (SL) is primarily caused by the pathogen *Colletotrichum* spp. This fungal disease is characterized by the formation of brown or dark brown patches on the tea leaves. These patches often start at the leaf edges and can spread, leading to significant leaf damage. The affected areas may become dry and brittle, which can result in reduced photosynthetic efficiency, weakening the plant, and potentially leading to decreased tea yield and quality. Brown blight tends to occur in conditions of high humidity and temperature, which are prevalent in many tea-growing regions of Sri Lanka. Effective management of brown blight includes practices such as using disease-resistant cultivars, maintaining proper field sanitation to remove and destroy infected leaves, and applying appropriate fungicides as part of an integrated pest management (IPM) strategy to control the spread of the disease.',
      remedy: 'Detailed remedy for Brown Blight.',
      duration: '2-3 weeks'
    },
  ];

  const handleCardClick = (diseaseName) => {
    const selectedDisease = diseases.find(disease => disease.name === diseaseName);
    navigate(`/disease-details/${encodeURIComponent(diseaseName)}`, { state: { disease: selectedDisease } });
  };
  
  const truncatedDescription = truncateDescription(diseases.description, 20);

  return (
    <div className="container mt-4">
      <h1 className='text-center'>Welcome to our Tea Leaf Disease Detection System!</h1>
      <p>This tool uses smart technology to help Sri Lanka's tea farmers quickly find out what's wrong with their tea plants. It tells them the disease, how to fix it, and how long it will take to get their plants healthy again. Our easy-to-use system is here to make tea farming better by saving crops and supporting green farming. Dive in to see how we're changing the future of tea farming with technology!</p>
      <Row>
        {diseases.map((disease, index) => (
          <Col md={4} key={index}>
            <Card
              style={{ marginBottom: '20px', width: '100%' }}
              onClick={() => handleCardClick(disease.name)}
            >
              <Card.Img variant="top" src={`/${disease.image}`} style={{ marginBottom: '20px', height: '20rem' }}
/>
              <Card.Body>
                <Card.Title>{disease.name}</Card.Title>
                <Card.Text>{truncatedDescription}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default LineChartFromDatabase;
