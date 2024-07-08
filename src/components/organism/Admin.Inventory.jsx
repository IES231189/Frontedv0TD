import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';

const AdminDataInventory = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    tipo_producto: '',
    id_producto: '',
    cantidad: '',
    descripcion: '',
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inventario/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRows(data.map((producto) => ({
        id: producto.id_inventario, // Usar id_inventario como id único
        id_inventario: producto.id_inventario,
        tipo_producto: producto.tipo_producto,
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        descripcion: producto.descripcion,
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (row) => {
    setEditingRow(row);
    setFormData({
      tipo_producto: row.tipo_producto,
      id_producto: row.id_producto,
      cantidad: row.cantidad,
      descripcion: row.descripcion,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/inventario/${editingRow.id_inventario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response was not ok: ${text}`);
      }
      const updatedProduct = await response.json();
      setRows(rows.map((row) => (row.id_inventario === editingRow.id_inventario ? { ...row, ...formData } : row)));
      setEditingRow(null);
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Error updating data');
    }
  };

  const handleDelete = async (id_inventario) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/inventario/${id_inventario}`, { method: 'DELETE' });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        setRows(rows.filter((row) => row.id_inventario !== id_inventario));
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Error deleting data');
      }
    }
  };

  const columns = [
    { field: 'id_inventario', headerName: 'ID Producto', width: 150 },
    { field: 'tipo_producto', headerName: 'Nombre', width: 200 },
    { field: 'id_producto', headerName: 'ID Producto', width: 150 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEdit(params.row)}>Editar</button>
          <button onClick={() => handleDelete(params.row.id_inventario)}>Eliminar</button>
        </>
      ),
    },
  ];

  return (
    <div className='content-section-page-user'>
      <h3 style={{ padding: '40px' }}>Inventario</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={rows}
            pageSize={5}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {editingRow && (
            <div>
              <h4>Editar Producto</h4>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <input
                  type='text'
                  value={formData.tipo_producto}
                  onChange={(e) => setFormData({ ...formData, tipo_producto: e.target.value })}
                  placeholder='Tipo de Producto'
                />
                <input
                  type='text'
                  value={formData.id_producto}
                  onChange={(e) => setFormData({ ...formData, id_producto: e.target.value })}
                  placeholder='ID Producto'
                />
                <input
                  type='number'
                  value={formData.cantidad}
                  onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                  placeholder='Cantidad'
                />
                <input
                  type='text'
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder='Descripción'
                />
                <button type='submit'>Guardar</button>
                <button onClick={() => setEditingRow(null)}>Cancelar</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDataInventory;
