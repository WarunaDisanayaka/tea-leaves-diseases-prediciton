import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function LineChartFromDatabase() {
  const cardStyle = {
    marginBottom: '20px',
    width: '100%' // Ensure cards take up full width
  };

  const titleStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    fontWeight: 'bold'
  };

  const remedyStyle = {
    padding: '10px'
  };

  return (
    <div className="container mt-4">
      <h1 className='text-center'>Welcome to our Tea Leaf Disease Detection System!</h1>
      <p>This tool uses smart technology to help Sri Lanka's tea farmers quickly find out what's wrong with their tea plants. It tells them the disease, how to fix it, and how long it will take to get their plants healthy again. Our easy-to-use system is here to make tea farming better by saving crops and supporting green farming. Dive in to see how we're changing the future of tea farming with technology!</p>
      <Row>
        {/* Red Leaf Spots */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>Red Leaf Spots</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>Isolating the infected plant from healthy plants to prevent the spread of the disease.</li>
                <li>Remove and destroy infected leaves or parts of the plant this helps to reduce and prevent the spread of the disease.</li>
                <li>Consult with a plant pathology expert to identify the specific pathogen causing the red leaf spots who can recommend suitable fungicides for treatment.</li>
                <li>Apply a suitable fungicide based on the identified pathogen. Copper-based fungicides are commonly used for various fungal diseases. Follow the manufacturer's instructions for application.</li>
                <li>Avoid overhead watering to reduce humidity around the plant.</li>
                <li>Regularly monitor the effectiveness of the chosen remedy and make adjustments as needed.</li>
                <li>If problems arise, please consult the nearest TRI for further advice.</li>
              </ul>
              <p><strong>Duration:</strong> 4 - 5 Weeks</p>
            </Card.Body>
          </Card>
        </Col>
        {/* Algal Leaf */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>Algal Leaf</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>If the infection is small, gently wipe or wash the affected leaves with a damp cloth or sponge to physically remove the algae.</li>
                <li>Mix neem oil with water and a small amount of mild soap. Spray the solution on affected areas.</li>
                <li>Ensure that the plants receive adequate sunlight.</li>
                <li>Mix about 1 teaspoon of baking soda in a gallon of water and apply it to the affected leaves.</li>
                <li>Implement preventive measures, such as proper spacing of plants, good air circulation, and regular monitoring, to reduce the likelihood of algal growth.</li>
              </ul>
              <p><strong>Duration:</strong> 3 - 4 weeks</p>
            </Card.Body>
          </Card>
        </Col>
        {/* Bird Eye Spot */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>Bird Eye Spot</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>If the fungal infection is identified, consider using fungicides recommended for the specific pathogen causing the issue.</li>
                <li>Use organic remedies like neem oil or insecticidal soap which can be effective against pests.</li>
                <li>Remove and destroy severely affected plant parts to prevent the spread of diseases or pests.</li>
                <li>Regularly monitor the affected plants for any changes. Early detection allows for prompt and effective action.</li>
              </ul>
              <p><strong>Duration:</strong> 5-6 weeks</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* Gray Light */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>Gray Light</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>Apply fungicides that are effective against the specific fungal pathogen causing grey blight. Copper-based fungicides are commonly used for various fungal diseases.</li>
                <li>Prune affected branches or leaves, making sure to disinfect pruning tools between cuts.</li>
                <li>Avoid overwatering and ensure proper drainage to reduce excess moisture.</li>
                <li>Proper spacing between plants, to improve air circulation and reduce humidity.</li>
                <li>Sulfur-based fungicides can also be effective against certain fungal pathogens.</li>
                <li>Copper hydroxide is another copper-based compound that can be effective against fungal diseases.</li>
              </ul>
              <p><strong>Duration:</strong> 3-4 weeks</p>
            </Card.Body>
          </Card>
        </Col>
        {/* White Spot */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>White Spot</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>Choose a fungicide specifically formulated for tea leaf spot diseases. Copper-based fungicides or those containing ingredients like azoxystrobin and difenoconazole are often effective. Apply according to the manufacturer's recommendations.</li>
                <li>Prune affected leaves and branches, and promptly remove and destroy any fallen leaves. This helps reduce the overall pathogen load.</li>
                <li>Minimize moisture on the leaves, creating a less favorable environment for fungal growth.</li>
                <li>Isolate infected plants to prevent the spread of the disease to healthy tea plants.</li>
              </ul>
              <p><strong>Duration:</strong> 4-6 Weeks</p>
            </Card.Body>
          </Card>
        </Col>
        {/* Anthracnose */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>Anthracnose</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>Consider the use of copper nanoparticles as a fungicidal treatment. Copper nanoparticles have shown promise in effectively controlling fungal diseases, including anthracnose.</li>
                <li>Prepare a garlic extract by blending garlic cloves with water. Strain the mixture and dilute it with water. Spray this garlic extract on the affected tea leaves. Garlic has natural antifungal properties.</li>
                <li>Aloe vera has antifungal and antibacterial properties. Prepare a solution using aloe vera gel and water. Spray the solution on the affected leaves to help control anthracnose.</li>
                <li>Create a solution of baking soda by mixing it with water. Baking soda has fungicidal properties and can help control the spread of anthracnose. Apply this solution to the affected areas.</li>
              </ul>
              <p><strong>Duration:</strong> 3-4 Weeks</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* Brown Blight */}
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Header style={titleStyle}>Brown Blight</Card.Header>
            <Card.Body style={remedyStyle}>
              <p><strong>Remedy:</strong></p>
              <ul>
                <li>Prepare a solution using green tea extract. Green tea has antioxidants and antifungal properties. Spray the solution on affected leaves to help control the brown blight.</li>
                <li>Create a paste using turmeric powder and water. Turmeric has natural antifungal and antibacterial properties. Apply the paste to affected areas on the tea leaves.</li>
                <li>Consider the use of copper hydroxide nanoparticles. Copper nanoparticles have demonstrated efficacy against various fungal diseases.</li>
                <li>Mix apple cider vinegar with water (1:1 ratio) and apply as a foliar spray. Vinegar creates an acidic environment, which can be unfavorable for fungal growth.</li>
                <li>Combine milk and cinnamon powder to create a solution. Both milk and cinnamon have antifungal properties. Spray on tea leaves affected by brown blight.</li>
              </ul>
              <p><strong>Duration:</strong> 2-3 weeks</p>
            </Card.Body>
          </Card>
        </Col>
        {/* Repeat the above structure for other diseases */}
      </Row>
    </div>
  );
}

export default LineChartFromDatabase;
