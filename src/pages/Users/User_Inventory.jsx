import React, { useState, useEffect } from 'react';
import DataTable from '../../components/atoms/Table';

const User_Inventory = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inventario/'); // Usa Aqui el endpoint
      const data = await response.json();
      setRows(data.map((producto, index) => ({  //debe coincidir con la api 
        id_inventario: index + 1,
        tipo_producto:producto.tipo_producto,
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        descripcion: producto.descripcion

      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: 'id_inventario', headerName: 'ID Producto', width: 150 },
    { field: 'tipo_producto', headerName: 'Nombre', width: 200 },
    { field: 'id_producto', headerName: 'Descripción', width: 250 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'descripcion', headerName: 'descripción', width: 150 },
    { field: 'actions', headerName: 'Acciones', width: 150 },
  ];

  const handleEdit = async (id) => {
    console.log('Edit item with id:', id);
    // Lógica para la edición
    // Ejemplo de cómo podrías actualizar los datos en la API:
    // await fetch(`https://api.tu-dominio.com/productos/${id}`, { method: 'PUT', body: JSON.stringify(datosActualizados) });
  };

  const handleDelete = async (id) => {
    console.log('Delete item with id:', id);
    try {
      await fetch(`https://api.tu-dominio.com/productos/${id}`, { method: 'DELETE' });
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className='content-section-page-user'>
      <h3>Inventario</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <DataTable 
          columns={columns} 
          rows={rows} 
          pageSize={5} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default User_Inventory;
