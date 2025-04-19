// import React from 'react'

// function ServiceManager() {
//   return (
//     <>
//     <div className="page-wrapper">
// <section className="services-section">
//  <div className="auto-container">
//    <div className="sec-title style-two">
//      <h2>Services We Provide</h2>
//      <div className="text">
//        Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going
//        forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud
//        solution.
//      </div>
//    </div>
//    <div className="row">
//      <div className="col-lg-4 service-block-one">
//        <div className="inner-box hvr-float-shadow">
//          <h5>Service and Repairs</h5>
//          <h2>Performance Upgrade</h2>
//          <a href="#" className="read-more">
//            read more +
//          </a>
//          <div className="icon">
//            <span className="flaticon-power"></span>
//          </div>
//        </div>
//      </div>
//      <div className="col-lg-4 service-block-one">
//        <div className="inner-box hvr-float-shadow">
//          <h5>Service and Repairs</h5>
//          <h2>Transmission Services</h2>
//          <a href="#" className="read-more">
//            read more +
//          </a>
//          <div className="icon">
//            <span className="flaticon-gearbox"></span>
//          </div>
//        </div>
//      </div>
//      <div className="col-lg-4 service-block-one">
//        <div className="inner-box hvr-float-shadow">
//          <h5>Service and Repairs</h5>
//          <h2>Break Repair & Service</h2>
//          <a href="#" className="read-more">
//            read more +
//          </a>
//          <div className="icon">
//            <span className="flaticon-brake-disc"></span>
//          </div>
//        </div>
//      </div>
//      <div className="col-lg-4 service-block-one">
//        <div className="inner-box hvr-float-shadow">
//          <h5>Service and Repairs</h5>
//          <h2>Engine Service & Repair</h2>
//          <a href="#" className="read-more">
//            read more +
//          </a>
//          <div className="icon">
//            <span className="flaticon-car-engine"></span>
//          </div>
//        </div>
//      </div>
//      <div className="col-lg-4 service-block-one">
//        <div className="inner-box hvr-float-shadow">
//          <h5>Service and Repairs</h5>
//          <h2>Tyre & Wheels</h2>
//          <a href="#" className="read-more">
//            read more +
//          </a>
//          <div className="icon">
//            <span className="flaticon-tire"></span>
//          </div>
//        </div>
//      </div>
//      <div className="col-lg-4 service-block-one">
//        <div className="inner-box hvr-float-shadow">
//          <h5>Service and Repairs</h5>
//          <h2>Denting & Painting</h2>
//          <a href="#" className="read-more">
//            read more +
//          </a>
//          <div className="icon">
//            <span className="flaticon-spray-gun"></span>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
// </section>
// </div>

//  </>
//   )
// }

// export default ServiceManager

// import React, { useState } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const initialServices = [
//   { id: 1, name: 'Oil change' },
//   { id: 2, name: 'Spark Plug replacement' },
//   { id: 3, name: 'Fuel Cap tightening' },
//   { id: 4, name: 'Oxygen Sensor replacement' },
//   { id: 5, name: 'Brake work' },
//   { id: 6, name: 'Tire repairs and changes' },
//   { id: 7, name: 'The Ignition System' },
//   { id: 8, name: 'Programming the camera software' },
// ];

// function ServicesManager() {
//   const [services, setServices] = useState(initialServices);
//   const [editId, setEditId] = useState(null);
//   const [editedName, setEditedName] = useState('');

//   const handleDelete = (id) => {
//     setServices(services.filter(service => service.id !== id));
//   };

//   const handleEdit = (id, currentName) => {
//     setEditId(id);
//     setEditedName(currentName);
//   };

//   const handleSave = (id) => {
//     setServices(
//       services.map(service =>
//         service.id === id ? { ...service, name: editedName } : service
//       )
//     );
//     setEditId(null);
//     setEditedName('');
//   };

//   return (
  
//          <div className="page-wrapper">
// <section className="services-section">
//  <div className="auto-container">
//    <div className="sec-title style-two">
//      <h2>Services We Provide</h2>
//      <div className="text">
//        Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going
//        forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud
//        solution.
//      </div>
//    </div>
//    </div>
   


//    {/* </section>
//    </div> */}
//       <table className="table table-striped">
//         {/* <thead className="thead-dark">
//           <tr>
//             <th>#</th>
//             <th>Service Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead> */}
//         <tbody>
//           {services.map((service, index) => (
//             <tr key={service.id}>
//               <td>{index + 1}</td>
//               <td>
//                 {editId === service.id ? (
//                   <input
//                     type="text"
//                     className="col-lg-4 service-block-one"
//                     value={editedName}
//                     onChange={(e) => setEditedName(e.target.value)}
//                   />
//                 ) : (
//                   service.name
//                 )}
//               </td>
//               <td>
//                 {editId === service.id ? (
//                   <button
//                     className="btn btn-sm btn-success me-2"
//                     onClick={() => handleSave(service.id)}
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-sm btn-primary me-2"
//                     onClick={() => handleEdit(service.id, service.name)}
//                   >
//                     <FaEdit />
//                   </button>
//                 )}
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => handleDelete(service.id)}
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
   
//     </section>
//    </div>
//   );
// }

// export default ServicesManager;


// import React, { useState } from 'react';

// const ServicesManager = () => {
//   const initialServices = [
//     {
//       id: 1,
//       name: 'Oil change',
//       description: 'Every 5,000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape.',
//     },
//     {
//       id: 2,
//       name: 'Spark Plug replacement',
//       description: 'Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.',
//     },
//     {
//       id: 3,
//       name: 'Fuel Cap tightening',
//       description: 'Loose fuel caps are actually a main reason why the "check engine" light in a car comes on.',
//     },
//     {
//       id: 4,
//       name: 'Oxygen Sensor replacement',
//       description: 'Oxygen sensors measure the concentration of oxygen in the exhaust gases in order to optimize engine performance and emissions.',
//     },
//     {
//       id: 5,
//       name: 'Brake work',
//       description: 'We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.',
//     },
//     {
//       id: 6,
//       name: 'Tire repairs and changes',
//       description: 'Without good, inflated tires, you lose speed, control, and fuel efficiency. Hence the need to get them patched if there\'s a leak or replaced if they\'re too worn.',
//     },
//     {
//       id: 7,
//       name: 'The Ignition System',
//       description: 'A car’s ignition system includes its battery, starter, and the ignition itself.',
//     },
//     {
//       id: 8,
//       name: 'Programming the camera software',
//       description: 'Without good, inflated tires, you lose speed, control, and fuel efficiency. Hence the need to get them patched if there\'s a leak (for example, if you run over a nail), or replaced if they’re too worn.',
//     },
//   ];

//   const [services, setServices] = useState(initialServices);
//   const [editId, setEditId] = useState(null);
//   const [editedName, setEditedName] = useState('');

//   const handleEdit = (id, currentName) => {
//     setEditId(id);
//     setEditedName(currentName);
//   };

//   const handleSave = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, name: editedName } : service
//       )
//     );
//     setEditId(null);
//     setEditedName('');
//   };

//   const handleDelete = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id)
//     );
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4"> Services </h2>
//       <table className="table table-bordered table-hover">
//         <thead className="table-light">
//           <tr>
//             <th>Service</th>
//             <th className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {services.map((service) => (
//             <tr key={service.id}>
//               <td>
//                 {editId === service.id ? (
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editedName}
//                     onChange={(e) => setEditedName(e.target.value)}
//                   />
//                 ) : (
//                   <>
//                     <strong>{service.name}</strong>
//                     <p className="text-muted mb-0">{service.description}</p>
//                   </>
//                 )}
//               </td>
//               <td className="text-center">
//                 {editId === service.id ? (
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => handleSave(service.id)}
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <>
//                     <button
//                       className="btn btn-primary btn-sm me-2"
//                       onClick={() => handleEdit(service.id, service.name)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(service.id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ServicesManager;
// import React, { useState } from 'react';

// const ServicesManager = () => {
//   const initialServices = [
//     {
//       id: 1,
//       name: 'Oil change',
//       description: 'Every 5,000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape.',
//     },
//     {
//       id: 2,
//       name: 'Spark Plug replacement',
//       description: 'Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.',
//     },
//     {
//       id: 3,
//       name: 'Fuel Cap tightening',
//       description: 'Loose fuel caps are actually a main reason why the "check engine" light in a car comes on.',
//     },
//     {
//       id: 4,
//       name: 'Oxygen Sensor replacement',
//       description: 'Oxygen sensors measure the concentration of oxygen in the exhaust gases in order to optimize engine performance and emissions.',
//     },
//     {
//       id: 5,
//       name: 'Brake work',
//       description: 'We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.',
//     },
//     {
//       id: 6,
//       name: 'Tire repairs and changes',
//       description: 'Without good, inflated tires, you lose speed, control, and fuel efficiency. Hence the need to get them patched if there\'s a leak or replaced if they\'re too worn.',
//     },
//     {
//       id: 7,
//       name: 'The Ignition System',
//       description: 'A car’s ignition system includes its battery, starter, and the ignition itself.',
//     },
//     {
//       id: 8,
//       name: 'Programming the camera software',
//       description: 'Without good, inflated tires, you lose speed, control, and fuel efficiency. Hence the need to get them patched if there\'s a leak (for example, if you run over a nail), or replaced if they’re too worn.',
//     },
//   ];

//   const [services, setServices] = useState(initialServices);
//   const [editId, setEditId] = useState(null);
//   const [editedName, setEditedName] = useState('');

//   const handleEdit = (id, currentName) => {
//     setEditId(id);
//     setEditedName(currentName);
//   };

//   const handleSave = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, name: editedName } : service
//       )
//     );
//     setEditId(null);
//     setEditedName('');
//   };

//   const handleDelete = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id)
//     );
//   };

//   return (
//     <div className="page-wrapper">
//       <section className="services-section py-5">
//         <div className="auto-container container">
//           <div className="sec-title style-two text-center mb-5">
//             <h2>Services We Provide</h2>
//             <div className="text">
//               Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day,
//               going forward, a new normal that has evolved from generation X is on the runway heading towards a
//               streamlined cloud solution.
//             </div>
//           </div>

//           <div className="row">
//             {services.map((service) => (
//               <div key={service.id} className="col-md-6 mb-4">
//                 <div className="p-4 border rounded shadow-sm h-100 bg-white">
//                   {editId === service.id ? (
//                     <input
//                       type="text"
//                       className="form-control mb-2"
//                       value={editedName}
//                       onChange={(e) => setEditedName(e.target.value)}
//                     />
//                   ) : (
//                     <h5 className="fw-bold">{service.name}</h5>
//                   )}

//                   <p className="text-muted mb-3">{service.description}</p>

//                   <div>
//                     {editId === service.id ? (
//                       <button
//                         className="btn btn-success btn-sm me-2"
//                         onClick={() => handleSave(service.id)}
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-primary btn-sm me-2"
//                         onClick={() => handleEdit(service.id, service.name)}
//                       >
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(service.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default ServicesManager;
// import React, { useState } from 'react';

// const ServicesManager = () => {
//   const initialServices = [
//     {
//       id: 1,
//       name: 'Oil change',
//       description: 'Every 5,000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape.',
//     },
//     {
//       id: 2,
//       name: 'Spark Plug replacement',
//       description: 'Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.',
//     },
//     {
//       id: 3,
//       name: 'Fuel Cap tightening',
//       description: 'Loose fuel caps are actually a main reason why the "check engine" light in a car comes on.',
//     },
//     {
//       id: 4,
//       name: 'Oxygen Sensor replacement',
//       description: 'Oxygen sensors measure the concentration of oxygen in the exhaust gases in order to optimize engine performance and emissions.',
//     },
//     {
//       id: 5,
//       name: 'Brake work',
//       description: 'We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.',
//     },
//     {
//       id: 6,
//       name: 'Tire repairs and changes',
//       description: 'Without good, inflated tires, you lose speed, control, and fuel efficiency. Hence the need to get them patched if there\'s a leak or replaced if they\'re too worn.',
//     },
//     {
//       id: 7,
//       name: 'The Ignition System',
//       description: 'A car’s ignition system includes its battery, starter, and the ignition itself.',
//     },
//     {
//       id: 8,
//       name: 'Programming the camera software',
//       description: 'Without good, inflated tires, you lose speed, control, and fuel efficiency. Hence the need to get them patched if there\'s a leak (for example, if you run over a nail), or replaced if they’re too worn.',
//     },
//   ];

//   const [services, setServices] = useState(initialServices);
//   const [editId, setEditId] = useState(null);
//   const [editedName, setEditedName] = useState('');

//   const handleEdit = (id, currentName) => {
//     setEditId(id);
//     setEditedName(currentName);
//   };

//   const handleSave = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, name: editedName } : service
//       )
//     );
//     setEditId(null);
//     setEditedName('');
//   };

//   const handleDelete = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id)
//     );
//   };

//   return (
//     <div className="page-wrapper">
//       <section className="services-section py-5">
//         <div className="auto-container container">
//           <div className="sec-title style-two text-center mb-5">
//             <h2>Services We Provide</h2>
//             <div className="text">
//               Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day,
//               going forward, a new normal that has evolved from generation X is on the runway heading towards a
//               streamlined cloud solution.
//             </div>
//           </div>

//           <div className="row">
//             {/* Map over services and display each service */}
//             {services.map((service) => (
//               <div key={service.id} className="col-md-12 mb-4">
//                 <div className="p-4 border rounded shadow-sm h-100 bg-white">
//                   {/* First Column: Service ID, Name, and Description */}
//                   <div className="row mb-3">
//                     <div className="col-md-8">
//                       <h6 className="text-muted">ID: {service.id}</h6>
//                       {editId === service.id ? (
//                         <input
//                           type="text"
//                           className="form-control mb-2"
//                           value={editedName}
//                           onChange={(e) => setEditedName(e.target.value)}
//                         />
//                       ) : (
//                         <h5 className="fw-bold">{service.name}</h5>
//                       )}
//                       <p className="text-muted">{service.description}</p>
//                     </div>

//                     {/* Last Column: Edit/Save/Delete buttons */}
//                     <div className="col-md-4 text-center">
//                       {editId === service.id ? (
//                         <button
//                           className="btn btn-success btn-sm me-2"
//                           onClick={() => handleSave(service.id)}
//                         >
//                           Save
//                         </button>
//                       ) : (
//                         <button
//                           className="btn btn-primary btn-sm me-2"
//                           onClick={() => handleEdit(service.id, service.name)}
//                         >
//                           Edit
//                         </button>
//                       )}
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(service.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default ServicesManager;


// import React, { useState } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import './ServiceManager.css'; // Assuming you have a CSS file for styles
// const ServicesManager = () => {
//   const initialServices = [
//     { id: 1, name: 'Oil change', description: 'Change the oil every 5,000 kilometers to maintain engine health.' },
//     { id: 2, name: 'Spark Plug replacement', description: 'Replace spark plugs to ensure efficient engine performance.' },
//     { id: 3, name: 'Fuel Cap tightening', description: 'Tighten loose fuel caps to avoid engine alerts.' },
//     { id: 4, name: 'Oxygen Sensor replacement', description: 'Replace sensors to optimize engine performance and emissions.' },
//     { id: 5, name: 'Brake work', description: 'Ensure brakes are functioning to prevent accidents.' },
//     { id: 6, name: 'Tire repairs and changes', description: 'Repair or replace tires for safety and efficiency.' },
//     { id: 7, name: 'The Ignition System', description: 'Maintain the ignition system for reliable vehicle operation.' },
//     { id: 8, name: 'Programming the camera software', description: 'Update software for optimal camera functionality.' },
//   ];

//   const [services, setServices] = useState(initialServices);
//   const [editId, setEditId] = useState(null);
//   const [editedName, setEditedName] = useState('');
//   const [editedDescription, setEditedDescription] = useState('');

//   const handleEdit = (id, currentName) => {
//     const service = services.find((s) => s.id === id);
//     setEditId(id);
//     setEditedName(currentName);
//     setEditedDescription(service?.description || '');
//   };

//   const handleSave = (id) => {
//     setServices((prevServices) =>
//       prevServices.map((service) =>
//         service.id === id ? { ...service, name: editedName, description: editedDescription } : service
//       )
//     );
//     setEditId(null);
//     setEditedName('');
//     setEditedDescription('');
//   };

//   const handleDelete = (id) => {
//     setServices((prevServices) =>
//       prevServices.filter((service) => service.id !== id)
//     );
//   };

//   const handleAddService = () => {
//     if (editedName.trim() && editedDescription.trim()) {
//       const newService = {
//         id: services.length + 1,
//         name: editedName,
//         description: editedDescription,
//       };
//       setServices([...services, newService]);
//       setEditedName('');
//       setEditedDescription('');
//     }
//   };

//   return (
//     <>
//       <div className="all page-wrapper">
//         <section className="services-section py-1">
//           <div className="container">
//             <div className="sec-title style-two">
//               <h2>Services We Provide</h2>
//               <div className="text">
//                 Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going
//                 forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud
//                 solution.
//               </div>
//             </div>

//             <div className="row">
//               {services.map((service) => (
//                 <div key={service.id} className="col-md-12 mb-3">
//                   <div className="p-2 border rounded shadow-sm bg-white">
//                     <div className="row mb-1">
//                       <div className="col-md-8">
//                         {editId === service.id ? (
//                           <>
//                             <input
//                               type="text"
//                               className="form-control mb-1"
//                               value={editedName}
//                               onChange={(e) => setEditedName(e.target.value)}
//                             />
//                             <textarea
//                               className="form-control mb-1"
//                               rows={3}
//                               value={editedDescription}
//                               onChange={(e) => setEditedDescription(e.target.value)}
//                             />
//                           </>
//                         ) : (
//                           <>
//                             <h4 className="fw-bold">{service.name}</h4>
//                             <p className="text-muted">{service.description}</p>
//                           </>
//                         )}
//                       </div>
//                       <div className="col-md-4 text-center">
//                         {editId === service.id ? (
//                           <button
//                             className="btn btn-success btn-sm me-2"
//                             onClick={() => handleSave(service.id)}
//                           >
//                             Save
//                           </button>
//                         ) : (
//                           <button
//                              className="btn btn-primary btn-sm me-3"
//                             onClick={() => handleEdit(service.id, service.name)}
//                           >
//                             <FaEdit /> 
//                             {/* Edit */}


//                           </button>
//                         )}
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() => handleDelete(service.id)}
//                         >
//                           <FaTrash /> 
//                           {/* Delete */}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </section>
//       </div>

//       <div className="all page-wrapper">
//         <section className="services-section py-1">
//         {/* <section className="services-section pt-2 pb-5"> less top, keep bottom */}
//           <div className="container"></div>
//       <div className="page-wrapper d-flex justify-content-center align-items-center py-5">
//   <div className="service-card p-4 shadow bg-white rounded" style={{ maxWidth: '1100px', width: '100%' }}>
//     <div className="section-title mb-4">
//     <div className="container">
//             <div className="sec-title style-two">
//               <h2>Add a New Service</h2>
//             </div>
            

//     </div>

//     <div className="add-service">
//       <input
//         type="text"
//         className="form-control custom-input mb-1"
//         placeholder="Service name"
//         value={editedName}
//         onChange={(e) => setEditedName(e.target.value)}
//       />
//       <textarea
//         className="form-control custom-textarea mb-4"
//         placeholder="Service description"
//         rows={6}
//         value={editedDescription}
//         onChange={(e) => setEditedDescription(e.target.value)}
//       />
//       <button className="btn btn-danger px-4 py-2 text-uppercase fw-bold" onClick={handleAddService}>
//         Add Service
//       </button>
//     </div>
//   </div>
// </div>
// </div>
//         </section>
//       </div> 
//     </>
//   );
// };

// export default ServicesManager;
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ServiceManager.css';

const ServicesManager = () => {
  const initialServices = [
    { id: 1, name: 'Oil change', description: 'Change the oil every 5,000 kilometers to maintain engine health.' },
    { id: 2, name: 'Spark Plug replacement', description: 'Replace spark plugs to ensure efficient engine performance.' },
    { id: 3, name: 'Fuel Cap tightening', description: 'Tighten loose fuel caps to avoid engine alerts.' },
    { id: 4, name: 'Oxygen Sensor replacement', description: 'Replace sensors to optimize engine performance and emissions.' },
    { id: 5, name: 'Brake work', description: 'Ensure brakes are functioning to prevent accidents.' },
    { id: 6, name: 'Tire repairs and changes', description: 'Repair or replace tires for safety and efficiency.' },
    { id: 7, name: 'The Ignition System', description: 'Maintain the ignition system for reliable vehicle operation.' },
    { id: 8, name: 'Programming the camera software', description: 'Update software for optimal camera functionality.' },
  ];

  const [services, setServices] = useState(initialServices);
  const [editId, setEditId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleEdit = (id, currentName) => {
    const service = services.find((s) => s.id === id);
    setEditId(id);
    setEditedName(currentName);
    setEditedDescription(service?.description || '');
  };

  const handleSave = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, name: editedName, description: editedDescription } : service
      )
    );
    setEditId(null);
    setEditedName('');
    setEditedDescription('');
  };

  const handleDelete = (id) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id)
    );
  };

  const handleAddService = () => {
    if (editedName.trim() && editedDescription.trim()) {
      const newService = {
        id: services.length + 1,
        name: editedName,
        description: editedDescription,
      };
      setServices([...services, newService]);
      setEditedName('');
      setEditedDescription('');
    }
  };

  return (
    <div className="all page-wrapper">
      <section className="services-section py-5">
        <div className="container">

          {/* Section Title */}
          <div className="sec-title style-two">
            <h2>Services We Provide</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going
              forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud
              solution.
            </div>
          </div>

          {/* Services List */}
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-md-12 mb-3">
                <div className="p-2 border rounded shadow-sm bg-white">
                  <div className="row mb-1">
                    <div className="col-md-8">
                      {editId === service.id ? (
                        <>
                          <input
                            type="text"
                            className="form-control mb-1"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                          <textarea
                            className="form-control mb-1"
                            rows={3}
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                          />
                        </>
                      ) : (
                        <>
                          <h4 className="fw-bold">{service.name}</h4>
                          <p className="text-muted">{service.description}</p>
                        </>
                      )}
                    </div>
                    <div className="col-md-4 text-center">
                      {editId === service.id ? (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSave(service.id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button   style={{
                          backgroundColor: 'transparent',
                          color: '#007bff', // blue color for edit icon
                          border: 'none',
                          padding: 0,
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          marginRight: '12px' // add space between buttons
                        }}
                          className=" btn-sm me-3"
                          onClick={() => handleEdit(service.id, service.name)}
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button   style={{
    backgroundColor: 'transparent',
    color: 'red',
    border: 'none',
    padding: 0,
    fontSize: '1.2rem',
    cursor: 'pointer'
  }}
                        className=" btn-sm"
                        onClick={() => handleDelete(service.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Service Form */}
          <div className="page-wrapper d-flex justify-content-center align-items-center py-5">
            <div className="service-card p-4 shadow bg-white rounded" style={{ maxWidth: '1100px', width: '100%' }}>
            <div className="sec-title style-two">
                <h2>Add a New Service</h2>
              </div>
              <div className="add-service">
                <input
                  type="text"
                  className="form-control custom-input mb-1"
                  placeholder="Service name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <textarea
                  className="form-control custom-textarea mb-4"
                  placeholder="Service description"
                  rows={6}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button className="btn btn-danger px-4 py-2 text-uppercase fw-bold" onClick={handleAddService}>
                  Add Service
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ServicesManager;
