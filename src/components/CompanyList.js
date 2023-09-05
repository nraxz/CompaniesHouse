// src/components/CompanyList.js

import React, { useState, useEffect } from 'react';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
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
        setCompanies(data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
              <a href={company.URI} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View</a>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="col-12 text-center">Loading...</p>
    )}
  </div>
);
};

export default CompanyList;


