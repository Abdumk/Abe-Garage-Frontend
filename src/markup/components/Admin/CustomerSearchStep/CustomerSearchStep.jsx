import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import customerService from '../../../../services/customer.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import { Link } from 'react-router-dom';

const CustomerSearchStep = ({ onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchCustomers();
    }
  }, [searchTerm]);

  const searchCustomers = async () => {
    setLoading(true);
    try {
      const res = await customerService.getAllCustomers(token);
      const data = await res.json();
      if (data?.data) {
        setCustomers(data.data.filter(customer => 
          `${customer.customer_first_name} ${customer.customer_last_name} ${customer.customer_email} ${customer.customer_phone_number}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ));
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a customer using first name, last name, email address or phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.length > 0 && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : customers.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => onNext(customer)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No customers found</p>
          )}
        </>
      )}

      <div className="mt-3">
        <Link to="/admin/add-customer" className="btn btn-success">
          Add New Customer
        </Link>
      </div>
    </div>
  );
};

export default CustomerSearchStep;