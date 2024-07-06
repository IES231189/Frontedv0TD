import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';

const EmployesTables = () => {
  const [employeeRows, setEmployeeRows] = useState([]);
  const [workDaysRows, setWorkDaysRows] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingWorkDays, setLoadingWorkDays] = useState(true);

  // Función para obtener datos de empleados
  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://api.tu-dominio.com/empleados'); // URL de la API para empleados
      const data = await response.json();
      setEmployeeRows(data);
      setLoadingEmployees(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setLoadingEmployees(false);
    }
  };

  // Función para obtener datos de días laborados
  const fetchWorkDays = async () => {
    try {
      const response = await fetch('https://api.tu-dominio.com/dias-laborados'); // URL de la API para días laborados
      const data = await response.json();
      setWorkDaysRows(data);
      setLoadingWorkDays(false);
    } catch (error) {
      console.error('Error fetching work days data:', error);
      setLoadingWorkDays(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchWorkDays();
  }, []);

  const employeeColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'correo', headerName: 'Correo Electrónico', width: 200 },
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const workDaysColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombreEmpleado', headerName: 'Nombre del Empleado', width: 200 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'hora', headerName: 'Hora', width: 100 },
    { field: 'estado', headerName: 'Estado', width: 130 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Lógica para la edición
  };

  const handleDelete = async (id) => {
    console.log('Delete item with id:', id);
    try {
      await fetch(`https://api.tu-dominio.com/items/${id}`, { method: 'DELETE' });
      //filtrar
      setEmployeeRows(employeeRows.filter((row) => row.id !== id));
      setWorkDaysRows(workDaysRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <div>
        <p>Empleados Registrados</p>
        {loadingEmployees ? (
          <p>Cargando empleados...</p>
        ) : (
          <DataTable
            columns={employeeColumns}
            rows={employeeRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div>
        <p>Días Laborados</p>
        {loadingWorkDays ? (
          <p>Cargando días laborados...</p>
        ) : (
          <DataTable
            columns={workDaysColumns}
            rows={workDaysRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default EmployesTables;
