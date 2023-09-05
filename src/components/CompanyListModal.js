import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // To track the selected company
  const apiUrl = 'https://eu-west-1.aws.data.mongodb-api.com/app/companyhouse-yssbb/endpoint/allcompany';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from API:', data);
        setCompanies(data.results); // Access the "results" array
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to open the modal for a selected company
  const openModal = (company) => {
    setSelectedCompany(company);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="row">
      <h1 className="col-12 text-center">Company List</h1>
      {Array.isArray(companies) && companies.length > 0 ? (
        companies.map((company) => (
          <div className="col-md-4 mb-4" key={company.CompanyNumber}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{company.CompanyName}</h5>
                <p className="card-text">Company Number: {company.CompanyNumber}</p>
                <p className="card-text">Company Status: {company.CompanyStatus}</p>
                <p className="card-text">Company Category: {company.CompanyCategory}</p>
                <Button
                  variant="primary"
                  onClick={() => openModal(company)} // Open modal when button is clicked
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="col-12 text-center">Loading...</p>
      )}

      {/* Modal */}
      <Modal show={selectedCompany !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCompany?.CompanyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Company Number: {selectedCompany?.CompanyNumber}</p>
          <p>Company Status: {selectedCompany?.CompanyStatus}</p>
          <p>Company Category: {selectedCompany?.CompanyCategory}</p>
          <a
            href={selectedCompany?.URI}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Company URI
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyList;
