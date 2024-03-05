import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Lineprediction() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');
  const [remedy, setRemedy] = useState('');
  const [duration, setDuration] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const allowedTypes = ['image/jpeg', 'image/png']; // Add more types if needed

      // Check if the selected file type is allowed
      if (allowedTypes.includes(selectedImage.type)) {
        setImage(selectedImage);
        setError('');
      } else {
        setImage(null);
        setError('Please select a valid image file (JPEG, PNG, GIF).');
      }
    } else {
      setImage(null);
      setError('Please select an image.');
    }
  };

  const handleRemedy = (predictedDisease) => {
    // You can add more cases for other diseases if needed
    switch (predictedDisease) {
      case 'red leaf spot':
        setRemedy(
          "Remedy:\n" +
          "● Isolating the infected plant from healthy plants to prevent the spread of the disease.\n" +
          "● Remove and destroy infected leaves or parts of the plant this helps to reduce and prevent the spread of the disease.\n" +
          "● Consult with a plant pathology expert to identify the specific pathogen causing the red leaf spots who can recommend suitable fungicides for treatment.\n" +
          "● Apply a suitable fungicide based on the identified pathogen. Copper-based fungicides are commonly used for various fungal diseases. Follow the manufacturer's instructions for application.\n" +
          "● Avoid overhead watering to reduce humidity around the plant.\n" +
          "● Regularly monitor the effectiveness of the chosen remedy and make adjustments as needed.\n" +
          "● If problems arise, please consult the nearest TRI for further advice."
        );
        setDuration('Duration: 4 - 5 Weeks');
        break;

      case 'algal leaf':
        setRemedy(
          "Remedy:\n" +
          "● If the infection is small, gently wipe or wash the affected leaves with a damp cloth or sponge to physically remove the algae.\n" +
          "● Mix neem oil with water and a small amount of mild soap. Spray the solution on affected areas.\n" +
          "● Ensure that the plants receive adequate sunlight.\n" +
          "● Mix about 1 teaspoon of baking soda in a gallon of water and apply it to the affected leaves.\n" +
          "● Implement preventive measures, such as proper spacing of plants, good air circulation, and regular monitoring, to reduce the likelihood of algal growth."
        );
        setDuration('Duration: 3 - 4 weeks');
        break;

      case 'bird eye spot':
        setRemedy(
          "Remedy:\n" +
          "● If the fungal infection is identified, consider using fungicides recommended for the specific pathogen causing the issue.\n" +
          "● Use organic remedies like neem oil or insecticidal soap which can be effective against pests.\n" +
          "● Remove and destroy severely affected plant parts to prevent the spread of diseases or pests.\n" +
          "● Regularly monitor the affected plants for any changes. Early detection allows for prompt and effective action."
        );
        setDuration('Duration: 5-6 weeks');
        break;

      case 'gray light':
        setRemedy(
          "Remedy:\n" +
          "● Apply fungicides that are effective against the specific fungal pathogen causing grey blight. Copper-based fungicides are commonly used for various fungal diseases.\n" +
          "● Prune affected branches or leaves, making sure to disinfect pruning tools between cuts.\n" +
          "● Avoid overwatering and ensure proper drainage to reduce excess moisture.\n" +
          "● Proper spacing between plants, to improve air circulation and reduce humidity.\n" +
          "● Sulfur-based fungicides can also be effective against certain fungal pathogens.\n" +
          "● Copper hydroxide is another copper-based compound that can be effective against fungal diseases."
        );
        setDuration('Duration: 3-4 weeks');
        break;

      case 'white spot':
        setRemedy(
          "Remedy:\n" +
          "● Choose a fungicide specifically formulated for tea leaf spot diseases. Copper-based fungicides or those containing ingredients like azoxystrobin and difenoconazole are often effective. Apply according to the manufacturer's recommendations.\n" +
          "● Prune affected leaves and branches, and promptly remove and destroy any fallen leaves. This helps reduce the overall pathogen load.\n" +
          "● Minimize moisture on the leaves, creating a less favorable environment for fungal growth.\n" +
          "● Isolate infected plants to prevent the spread of the disease to healthy tea plants."
        );
        setDuration('Duration: 4-6 Weeks');
        break;

      case 'Anthracnose':
        setRemedy(
          "Remedy:\n" +
          "● Consider the use of copper nanoparticles as a fungicidal treatment. Copper nanoparticles have shown promise in effectively controlling fungal diseases, including anthracnose.\n" +
          "● Prepare a garlic extract by blending garlic cloves with water. Strain the mixture and dilute it with water. Spray this garlic extract on the affected tea leaves. Garlic has natural antifungal properties.\n" +
          "● Aloe vera has antifungal and antibacterial properties. Prepare a solution using aloe vera gel and water. Spray the solution on the affected leaves to help control anthracnose.\n" +
          "● Create a solution of baking soda by mixing it with water. Baking soda has fungicidal properties and can help control the spread of anthracnose. Apply this solution to the affected areas."
        );
        setDuration('Duration: 3-4 Weeks');
        break;

      case 'brown blight':
        setRemedy(
          "Remedy:\n" +
          "● Prepare a solution using green tea extract. Green tea has antioxidants and antifungal properties. Spray the solution on affected leaves to help control the brown blight.\n" +
          "● Create a paste using turmeric powder and water. Turmeric has natural antifungal and antibacterial properties. Apply the paste to affected areas on the tea leaves.\n" +
          "● Consider the use of copper hydroxide nanoparticles. Copper nanoparticles have demonstrated efficacy against various fungal diseases.\n" +
          "● Mix apple cider vinegar with water (1:1 ratio) and apply as a foliar spray. Vinegar creates an acidic environment, which can be unfavorable for fungal growth.\n" +
          "● Combine milk and cinnamon powder to create a solution. Both milk and cinnamon have antifungal properties. Spray on tea leaves affected by brown blight."
        );
        setDuration('Duration: 2-3 weeks');
        break;

      // Add more cases for other diseases here

      default:
        setRemedy('');
        setDuration('');
        break;
    }
    savePredictionData(predictedDisease,remedy,duration);


  };

  const savePredictionData = (predictedDisease,remedy,duration) => {
    // Make an API call to save prediction data
    const formData = {
      predictedDisease,
      remedy,
      duration,
    };

    axios.post('http://localhost:8081/savePrediction', formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log('Prediction data saved successfully');
        } else {
          console.error('Error saving prediction data:', res.data.Error);
        }
      })
      .catch((err) => {
        console.error('An error occurred while saving prediction data:', err.message);
      });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append('file', image);  // Ensure that 'file' matches the field name expected by Flask

      axios
        .post('http://127.0.0.1:5000/predict', formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },  // Set Content-Type to 'multipart/form-data'
        })
        .then((res) => {
          if (res.data.error) {
            console.log('Error:', res.data.error);
            setError('Error occurred during prediction.');
            setPrediction('');
            setRemedy('');
            setDuration('');
          } else {
            const predictedDisease = res.data.prediction;
            console.log('Predicted Disease:', predictedDisease);
            setPrediction(predictedDisease);
            handleRemedy(predictedDisease);
            Swal.fire('Success', `Predicted Disease: ${predictedDisease}`, 'success');

          }
        })
        .catch((err) => {
          console.log('An error occurred:', err.message);
          setError('Error occurred during prediction.');
          setPrediction('');
          setRemedy('');
          setDuration('');
        });
    } else {
      setError('Please select an image before submitting.');
      setPrediction('');
      setRemedy('');
      setDuration('');
    }
  };

  return (
    <div className="container-fluid mt-5 add-users">
      <h1 className="text-center">Scan Diseases</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload your image</label>
              <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} />
              {error && <span className="error-text">{error}</span>}
            </div>
            <div className="mt-3 mb-4 text-center">
              <button type="submit" className="btn btn-primary">
                Scan Image
              </button>
            </div>
          </form>

          {prediction && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title text-center">Prediction Result</h5>
                <p className="card-text">Predicted Disease: {prediction}</p>
                {remedy && <p className="card-text">{remedy}</p>}
                {duration && <p className="card-text">{duration}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lineprediction;
