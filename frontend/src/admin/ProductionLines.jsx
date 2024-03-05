import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

function ProductionLines() {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]); // State for prediction data
  const [selectedProductionLine, setSelectedProductionLine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    productionLines: '',
    maxSMV: '',
    minSMV: '',
  });

  const downloadCsv = () => {
    try {
      if (data.length === 0) {
        console.log('No data available to export.');
        return;
      }

      const csvContent = Papa.unparse(data, { header: true });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'production_line_data.csv');
    } catch (error) {
      console.error('Error creating CSV:', error);
    }
  };

  const downloadPdf = () => {
    try {
      const pdf = new jsPDF();
  
      pdf.text('Prediction History Report', 10, 10);
  
      const headers = ['Predicted Disease', 'Remedy', 'Duration','Date & Time'];
      const dataRows = predictions.map((prediction) => [
        prediction['predicted_disease'],
        prediction['remedy'],
        prediction['duration'],
        prediction['created_at'],

      ]);
  
      pdf.autoTable({
        head: [headers],
        body: dataRows,
        startY: 20,
        margin: { top: 20 },
      });
  
      pdf.save('prediction_history.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };
  
  
  useEffect(() => {
    axios
      .get('http://localhost:8081/getProductionLines')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        }
      })
      .catch((err) => console.log(err));

      axios
      .get('http://localhost:8081/getPredictions')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setPredictions(res.data.Result);
        }
      })
      .catch((err) => console.log(err));


  }, []);

  return (
    <Container className="d-flex flex-column align-items-center add-users">
      <h1 className="mt-5">Prediction History</h1>

      <div className="d-flex justify-content-end w-100">
        {/* <Button variant="success" className="my-3 ms-3" onClick={downloadCsv}>
          Download CSV
        </Button> */}
        <Button variant="success" className="my-3 ms-3" onClick={downloadPdf}>
          Download PDF
        </Button>
      </div>

       <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Predicted Disease</th>
            <th>Remedy</th>
            <th>Duration</th>
            <th>Date & Time</th>

            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => {
            return (
              <tr key={index}>
                <td>{prediction['predicted_disease']}</td>
                <td>{prediction['remedy']}</td>
                <td>{prediction['duration']}</td>
                <td>{prediction['created_at']}</td>

                {/* Add more cells if needed */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductionLines;
