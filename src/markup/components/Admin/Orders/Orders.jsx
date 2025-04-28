import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import orderService from '../../../../services/order.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import AdminMenu from '../AdminMenu/AdminMenu';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getAllOrders(token);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Orders</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>
                        {order.customer?.customer_first_name} {order.customer?.customer_last_name}
                        <br />
                        {order.customer?.customer_email}
                      </td>
                      <td>
                        {order.vehicle?.vehicle_year} {order.vehicle?.vehicle_make} {order.vehicle?.vehicle_model}
                        <br />
                        {order.vehicle?.vehicle_tag}
                      </td>
                      <td>{new Date(order.order_date).toLocaleDateString()}</td>
                      <td>{order.order_completed ? 'Completed' : 'In Progress'}</td>
                      <td>
                        <Link 
                          to={`/admin/orders/${order.order_id}`}
                          className="btn btn-sm btn-primary"
                        >
                          View/Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;