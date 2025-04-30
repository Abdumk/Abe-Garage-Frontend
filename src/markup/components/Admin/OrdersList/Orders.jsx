// import React, { useState, useEffect, useMemo } from "react";
// import { useTable } from "react-table";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { format } from "date-fns";
// import orderService from "../../../../services/order.service";
// import { useNavigate } from "react-router-dom";
// import AdminMenu from '../AdminMenu/AdminMenu';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { employee } = useAuth();
//   const navigate = useNavigate();
//   let token = employee?.employee_token || null;

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = () => {
//     orderService.getAllOrders(token)
//       .then((res) => {
//         if (!res.ok) {
//           setApiError(true);
//           setApiErrorMessage(
//             res.status === 401 ? "Please login again"
//               : res.status === 403 ? "You are not authorized to view this page"
//               : "Please try again later"
//           );
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data?.length) {
//           setOrders(data);
//         }
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   };

//   const handleEdit = (order) => {
//     navigate(`/admin/order/${order.order_id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       try {
//         const res = await orderService.deleteOrder(id, token);
//         if (res.ok) {
//           setOrders((prev) => prev.filter((o) => o.order_id !== id));
//         } else {
//           alert("Failed to delete order.");
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("An error occurred.");
//       }
//     }
//   };

//   const handleViewOrder = (orderId) => {
//     navigate(`/admin/order-details/${orderId}`);
//   };

//   const filteredOrders = orders.filter((order) => {
//     const fullText = `${order.order_id} ${order.customer?.customer_first_name} ${order.customer?.customer_last_name} ${order.vehicle?.vehicle_make} ${order.vehicle?.vehicle_model} ${order.vehicle?.vehicle_year}`.toLowerCase();
//     return fullText.includes(searchTerm.toLowerCase());
//   });

//   const data = useMemo(() => filteredOrders, [filteredOrders]);

//   const columns = useMemo(() => [
//     {
//       Header: "Order ID",
//       accessor: "order_id",
//     },
//     {
//       Header: "Customer",
//       id: "customer_column",
//       Cell: ({ row }) => (
//         <div>
//           <div>{row.original.customer?.customer_first_name} {row.original.customer?.customer_last_name}</div>
//           <div className="text-muted small">{row.original.customer?.customer_email}</div>
//           <div className="text-muted small">{row.original.customer?.customer_phone_number}</div>
//         </div>
//       ),
//     },
//     {
//       Header: "Vehicle",
//       id: "vehicle_column",
//       Cell: ({ row }) => (
//         <div>
//           <div>{row.original.vehicle?.vehicle_year} {row.original.vehicle?.vehicle_make} {row.original.vehicle?.vehicle_model}</div>
//           <div className="text-muted small">{row.original.vehicle?.vehicle_tag}</div>
//         </div>
//       ),
//     },
//     {
//       Header: "Order Date",
//       accessor: "order_date",
//       Cell: ({ value }) => format(new Date(value), "MM/dd/yyyy"),
//     },
//     {
//       Header: "Received by",
//       id: "employee_column",
//       Cell: ({ row }) => (
//         <div>
//           {row.original.employee?.employee_first_name} {row.original.employee?.employee_last_name}
//         </div>
//       ),
//     },
//     {
//       Header: "Status",
//       id: "status_column",
//       Cell: ({ row }) => (
//         <span className={`badge ${row.original.order_completed ? 'bg-success' : 'bg-warning'}`}>
//           {row.original.order_completed ? "Completed" : "In Progress"}
//         </span>
//       ),
//     },
//     {
//       Header: "Actions",
//       id: "actions_column",
//       Cell: ({ row }) => (
//         <div style={{ display: "flex", gap: "10px" }}>
//           <FaEye
//             onClick={() => handleViewOrder(row.original.order_id)}
//             style={{ cursor: "pointer", color: "green" }}
//           />
//           <FaEdit
//             onClick={() => handleEdit(row.original)}
//             style={{ cursor: "pointer", color: "blue" }}
//           />
//           <FaTrash
//             onClick={() => handleDelete(row.original.order_id)}
//             style={{ cursor: "pointer", color: "red" }}
//           />
//         </div>
//       ),
//     },
//   ], []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({ columns, data });

//   return (
//     <div className="container-fluid admin-pages">
//       <div className="row">
//         <div className="col-md-3 admin-left-side">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9 admin-right-side">
//           {apiError ? (
//             <div className="alert alert-danger">{apiErrorMessage}</div>
//           ) : (
//             <section className="contact-section">
//               <div className="auto-container">
//                 <div className="contact-title">
//                   <h2>Orders</h2>
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search orders by ID, customer name, or vehicle"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>

//                 <div className="table-responsive">
//                   <table {...getTableProps()} className="table table-striped table-bordered table-hover">
//                     <thead className="table-dark">
//                       {headerGroups.map((headerGroup) => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                           {headerGroup.headers.map((column) => (
//                             <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                           ))}
//                         </tr>
//                       ))}
//                     </thead>
//                     <tbody {...getTableBodyProps()}>
//                       {rows.map((row) => {
//                         prepareRow(row);
//                         return (
//                           <tr {...row.getRowProps()}>
//                             {row.cells.map((cell) => (
//                               <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                             ))}
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import orderService from "../../../../services/order.service";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { employee } = useAuth();
  const navigate = useNavigate();
  let token = employee?.employee_token || null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    orderService.getAllOrders(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          setApiErrorMessage(
            res.status === 401 ? "Please login again"
              : res.status === 403 ? "You are not authorized to view this page"
              : "Please try again later"
          );
        }
        return res.json();
      })
      .then((data) => {
        if (data?.length) {
          setOrders(data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleEdit = (order) => {
    navigate(`/admin/order/${order.order_id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await orderService.deleteOrder(id, token);
        if (res.ok) {
          setOrders((prev) => prev.filter((o) => o.order_id !== id));
        } else {
          alert("Failed to delete order.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred.");
      }
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/admin/order-details/${orderId}`);
  };

  const filteredOrders = orders.filter((order) => {
    const fullText = `${order.order_id} ${order.customer?.customer_first_name} ${order.customer?.customer_last_name} ${order.vehicle?.vehicle_make} ${order.vehicle?.vehicle_model}`.toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  const data = useMemo(() => filteredOrders, [filteredOrders]);

  const columns = useMemo(() => [
    {
      Header: "Order ID",
      accessor: "order_id",
    },
    {
      Header: "Customer",
      id: "customer_column",
      Cell: ({ row }) => (
        <div>
          <div>{row.original.customer?.customer_first_name} {row.original.customer?.customer_last_name}</div>
          <div className="text-muted small">{row.original.customer?.customer_email}</div>
          <div className="text-muted small">{row.original.customer?.customer_phone_number}</div>
        </div>
      ),
    },
    {
      Header: "Vehicle",
      id: "vehicle_column",
      Cell: ({ row }) => (
        <div>
          <div>{row.original.vehicle?.vehicle_year} {row.original.vehicle?.vehicle_make} {row.original.vehicle?.vehicle_model}</div>
          <div className="text-muted small">{row.original.vehicle?.vehicle_tag}</div>
        </div>
      ),
    },
    {
      Header: "Order Date",
      accessor: "order_date",
      Cell: ({ value }) => format(new Date(value), "MM/dd/yyyy"),
    },
    {
      Header: "Status",
      id: "status_column",
      Cell: ({ row }) => (
        <span className={`badge ${row.original.order_completed ? 'bg-success' : 'bg-warning'}`}>
          {row.original.order_completed ? "Completed" : "In Progress"}
        </span>
      ),
    },
    {
      Header: "view/Edit",
      id: "actions_column",
      Cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button 
            onClick={() => handleViewOrder(row.original.order_id)}
            className="btn btn-sm btn-outline-primary"
            title="View"
          >
            <FaEye />
          </button>
          <button 
            onClick={() => handleEdit(row.original)}
            className="btn btn-sm btn-outline-secondary"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => handleDelete(row.original.order_id)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <>
      {apiError ? (
        <h2>{apiErrorMessage}</h2>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search orders by ID, customer name, or vehicle"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="table-responsive">
              <table {...getTableProps()} className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;