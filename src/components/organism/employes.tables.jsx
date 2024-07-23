import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';

const EmployesTables = () => {
  const [employeeRows, setEmployeeRows] = useState([]);
  const [workDaysRows, setWorkDaysRows] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingWorkDays, setLoadingWorkDays] = useState(true);

  // Obtén el token del localStorage
  const token = localStorage.getItem('authToken');

  // Función para obtener datos de empleados
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/empleado/', {
        headers: {
          'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployeeRows(data);
      } else {
        console.error('Error fetching employee data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Función para obtener datos de días laborados
  const fetchWorkDays = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/diasLaborados/', {
        headers: {
           'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setWorkDaysRows(data);
      } else {
        console.error('Error fetching work days data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching work days data:', error);
    } finally {
      setLoadingWorkDays(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchWorkDays();
  }, []);

  const employeeColumns = [
    { field: 'id_empleado', headerName: 'ID', width: 90 },
    { field: 'id_usuario', headerName: 'ID Usuario', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'estado_civil', headerName: 'Estado Civil', width: 150 },
    { field: 'edad', headerName: 'Edad', width: 100 },
    { field: 'sexo', headerName: 'Sexo', width: 100 },
    { field: 'email', headerName: 'Correo Electrónico', width: 200 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'fecha_ingreso', headerName: 'Fecha de Ingreso', width: 150 },
    { field: 'sueldo_semanal', headerName: 'Sueldo Semanal', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const workDaysColumns = [
    { field: 'id_dia_laborado', headerName: 'ID', width: 90 },
    { field: 'id_empleado', headerName: 'ID Empleado', width: 150 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
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

  const handleDelete = async (id, type) => {
    console.log('Delete item with id:', id);
    try {
      const endpoint = type === 'employee' ? `/api/empleado/${id}` : `/api/diasLaborados/${id}`;
      await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (type === 'employee') {
        setEmployeeRows(employeeRows.filter((row) => row.id_empleado !== id));
      } else {
        setWorkDaysRows(workDaysRows.filter((row) => row.id_dia_laborado !== id));
      }
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
            onDelete={(id) => handleDelete(id, 'employee')}
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
            onDelete={(id) => handleDelete(id, 'workDay')}
          />
        )}
      </div>
    </div>
  );
};

export default EmployesTables;
