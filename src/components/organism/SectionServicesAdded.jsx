import React, { useState } from 'react';
import DataTable from "../atoms/Table";

const Services = () => {
  // Columnas de la tabla de servicios
  const servicesColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'provedor', headerName: 'Proveedor', width: 110 },
    { field: 'contacto', headerName: 'Contacto', width: 160 },
    { field: 'actions', headerName: 'Actions', width: 150 },
  ];

  // Columnas de la tabla de pagos
  const paymentColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'serviceName', headerName: 'Nombre del Servicio', width: 150 },
    { field: 'cost', headerName: 'Costo', width: 110 },
    { field: 'status', headerName: 'Estado', width: 160 }, // Pendiente, No pendiente
    { field: 'actions', headerName: 'Actions', width: 150 },
  ];

  // Estados iniciales vacíos para almacenar las filas
  const [servicesRows, setServicesRows] = useState([]);
  const [paymentRows, setPaymentRows] = useState([]);

  const handleEditService = (id) => {
    alert(`Edit service with ID: ${id}`);
  };

  const handleDeleteService = (id) => {
    alert(`Delete service with ID: ${id}`);
  };

  const handleEditPayment = (id) => {
    alert(`Edit payment with ID: ${id}`);
  };

  const handleDeletePayment = (id) => {
    alert(`Delete payment with ID: ${id}`);
  };

  return (
    <div className="content-section-page-article">
      <div className="content-item">
        <p>Servicios Agregados</p>
        <DataTable 
          columns={servicesColumns} 
          rows={servicesRows} 
          onEdit={handleEditService} 
          onDelete={handleDeleteService} 
        />
      </div>

      <div className="content-item">
        <p>Pagos realizados</p>
        <DataTable 
          columns={paymentColumns} 
          rows={paymentRows} 
          onEdit={handleEditPayment} 
          onDelete={handleDeletePayment} 
        />
      </div>
    </div>
  );
};

export default Services;
