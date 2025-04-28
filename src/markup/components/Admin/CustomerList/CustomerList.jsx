import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import customerService from "../../../../services/customer.service";
import { useNavigate } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { employee } = useAuth();
  const navigate = useNavigate();
  let token = employee?.employee_token || null;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    customerService.getAllCustomers(token)
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
        if (data?.data?.length) {
          setCustomers(data.data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleEdit = (customer) => {
    navigate(`/admin/customer/${customer.customer_id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const res = await customerService.deleteCustomer(id, token);
        if (res.ok) {
          setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
        } else {
          alert("Failed to delete customer.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred.");
      }
    }
  };

  const handleViewProfile = (customerId) => {
    navigate(`/admin/customer-profile/${customerId}`);
  };
 
  const filteredCustomers = customers.filter((customer) => {
    const fullText = `${customer.customer_first_name} ${customer.customer_last_name} ${customer.customer_email} ${customer.customer_phone_number}`.toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  const data = useMemo(() => filteredCustomers, [filteredCustomers]);

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "customer_id",
      id: "ustomer_id_column", // Add unique id
    },
    {
      Header: "First Name",
      accessor: "customer_first_name",
    },
    {
      Header: "Last Name",
      accessor: "customer_last_name",
    },
    {
      Header: "Email",
      accessor: "customer_email",
    },
    {
      Header: "Phone",
      accessor: "customer_phone_number",
    },
    {
      Header: "Added Date",
      accessor: "customer_added_date",
      Cell: ({ value }) => format(new Date(value), "MM - dd - yyyy | kk:mm"),
    },
    {
      Header: "Active",
      accessor: "active_customer_status",
      Cell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      Header: "Actions",
    id: "actions_column", // Unique ID
    Cell: ({ row }) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <FaEye
          // onClick={() => handleViewProfile(row.original.customer_id)}

          onClick={() => navigate(`/admin/customer-profile/${row.original.customer_id}`)}
          style={{ cursor: "pointer", color: "green" }}
        />
        <FaEdit
          onClick={() => navigate(`/admin/customer/${row.original.customer_id}`)}
          style={{ cursor: "pointer", color: "blue" }}
        />
        <FaTrash
          onClick={() => handleDelete(row.original.customer_id)}
          style={{ cursor: "pointer", color: "red" }}
        />
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
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search for a customer using first name, last name, email or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table {...getTableProps()} className="table table-striped table-bordered table-hover">
              <thead>
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
        </section>
      )}
    </>
  );
};

export default CustomersList;



// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
// import { FaEdit, FaTrash,FaEye } from "react-icons/fa";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { format } from "date-fns";
// import customerService from "../../../../services/customer.service";
// import { useNavigate } from "react-router-dom";
// import EditCustomers from "../EditCustomerForm/EditCustomerForm"; // Import the EditCustomers component

// const CustomersList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const { employee } = useAuth();
//   const navigate = useNavigate();
//   let token = employee?.employee_token || null;
//  const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = () => {
//     customerService.getAllCustomers(token)
//       .then((res) => {
//         if (!res.ok) {
//           setApiError(true);
//           setApiErrorMessage(
//             res.status === 401 ? "Please login again"
//             : res.status === 403 ? "You are not authorized to view this page"
//             : "Please try again later"
//           );
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data?.data?.length) {
//           setCustomers(data.data);
//         }
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   };

//   const handleEdit = (customer) => {
//     navigate(`/admin/customer/${customer.customer_id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this customer?")) {
//       try {
//         const res = await customerService.deleteCustomer(id, token);
//         if (res.ok) {
//           setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
//         } else {
//           alert("Failed to delete customer.");
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("An error occurred.");
//       }
//     }
//   };

//   return (
//     <>
//       {apiError ? (
//         <h2>{apiErrorMessage}</h2>
//       ) : (
//         <section className="contact-section">
//           <div className="auto-container">
//             <div className="contact-title">
//               <h2>Customers</h2>
//             </div>
//             {/* search for a customers using  */}
//             <div style={{ marginBottom: "20px" }}>
//   <input
//     type="text"
//     className="form-control"
//     placeholder="Search for a customer using first name,last name,email address of phone number"
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//   />
// </div>
//             {/* search the customer */}

//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Added Date</th>
//                   <th>Active</th>
//                   <th>Edit/Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//   {customers
//     .filter((customer) => {
//       const fullText = `${customer.customer_first_name} ${customer.customer_last_name} ${customer.customer_email} ${customer.customer_phone_number}`.toLowerCase();
//       return fullText.includes(searchTerm.toLowerCase());
//     })
//     .map((customer) => (
//       <tr key={customer.customer_id}>
//         <td>{customer.customer_id}</td>
//         <td>{customer.customer_first_name}</td>
//         <td>{customer.customer_last_name}</td>
//         <td>{customer.customer_email}</td>
//         <td>{customer.customer_phone_number}</td>
//         <td>
//           {format(
//             new Date(customer.customer_added_date),
//             "MM - dd - yyyy | kk:mm"
//           )}
//         </td>
//         <td>{customer.active_customer_status ? "Yes" : "No"}</td>
//         <td>
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               backgroundColor: "red",
//               padding: "10px",
//             }}
//           >
//             <FaEdit
//               style={{ cursor: "pointer", color: "white" }}
//               onClick={() => handleEdit(customer)}
//             />
//             <FaTrash
//               style={{ cursor: "pointer", color: "white" }}
//               onClick={() => handleDelete(customer.customer_id)}
//             />
//           </div>
//         </td>
//       </tr>
//     ))}
// </tbody>

//             </Table>




//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default CustomersList;


