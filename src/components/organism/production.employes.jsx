import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table'; // Asegúrate de que la ruta a tu componente DataTable sea correcta

const Production = () => {
  const [materiaPrimaRows, setMateriaPrimaRows] = useState([]);
  const [mantenimientoRows, setMantenimientoRows] = useState([]);
  const [loadingMateriaPrima, setLoadingMateriaPrima] = useState(true);
  const [loadingMantenimiento, setLoadingMantenimiento] = useState(true);

  // Función para obtener datos de Materia Prima
  const fetchMateriaPrima = async () => {
    try {
      const response = await fetch('https://api.tu-dominio.com/materia-prima'); // URL de la API para Materia Prima
      const data = await response.json();
      setMateriaPrimaRows(data);
      setLoadingMateriaPrima(false);
    } catch (error) {
      console.error('Error fetching materia prima data:', error);
      setLoadingMateriaPrima(false);
    }
  };

  // Función para obtener datos de Mantenimiento
  const fetchMantenimiento = async () => {
    try {
      const response = await fetch('https://api.tu-dominio.com/mantenimiento'); // URL de la API para Mantenimiento
      const data = await response.json();
      setMantenimientoRows(data);
      setLoadingMantenimiento(false);
    } catch (error) {
      console.error('Error fetching mantenimiento data:', error);
      setLoadingMantenimiento(false);
    }
  };

  useEffect(() => {
    fetchMateriaPrima();
    fetchMantenimiento();
  }, []);

  const materiaPrimaColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'provedor', headerName: 'Proveedor', width: 150 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 130,
      sortable: false,
      filterable: false,
    },
  ];

  const mantenimientoColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'tipo_mantenimiento', headerName: 'Tipo de Mantenimiento', width: 200 },
    { field: 'tecnico', headerName: 'Técnico', width: 150 },
    { field: 'estado', headerName: 'Estado', width: 130 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
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
      // Filtrar los datos actualizados después de la eliminación
      setMateriaPrimaRows(materiaPrimaRows.filter((row) => row.id !== id));
      setMantenimientoRows(mantenimientoRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <div>
        <p>Materia Prima</p>
        {loadingMateriaPrima ? (
          <p>Cargando materia prima...</p>
        ) : (
          <DataTable
            columns={materiaPrimaColumns}
            rows={materiaPrimaRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div>
        <p>Mantenimiento</p>
        {loadingMantenimiento ? (
          <p>Cargando mantenimiento...</p>
        ) : (
          <DataTable
            columns={mantenimientoColumns}
            rows={mantenimientoRows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Production;
