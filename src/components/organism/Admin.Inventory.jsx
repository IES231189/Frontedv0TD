import React, { useState, useEffect } from 'react';
import DataTable from '../atoms/Table';
import '../../styles/user.Cash.scss';

const AdminDataInventory = () => {
  const [maquinariaRows, setMaquinariaRows] = useState([]);
  const [materiaPrimaRows, setMateriaPrimaRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    id_maquinaria: '',
    nombre: '',
    descripcion: '',
    cantidad: '',
    unidad: '',
  });

  const fetchMaquinaria = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/maquinaria/verMaquinar', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMaquinariaRows(data.map((maquinaria) => ({
        id: maquinaria.id_maquinaria,
        id_maquinaria: maquinaria.id_maquinaria,
        nombre: maquinaria.nombre,
        descripcion: maquinaria.descripcion,
        cantidad: maquinaria.cantidad,
      })));
    } catch (error) {
      console.error('Error fetching maquinaria data:', error);
      setError('Error fetching maquinaria data');
    } finally {
      setLoading(false);
    }
  };

  const fetchMateriaPrima = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/materiaPrima/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMateriaPrimaRows(data.map((materiaPrima) => ({
        id: materiaPrima.id_materia_prima,
        id_materia_prima: materiaPrima.id_materia_prima,
        nombre: materiaPrima.nombre,
        descripcion: materiaPrima.descripcion,
        cantidad: materiaPrima.cantidad,
        unidad: materiaPrima.unidad,
      })));
    } catch (error) {
      console.error('Error fetching materia prima data:', error);
      setError('Error fetching materia prima data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaquinaria();
    fetchMateriaPrima();
  }, []);

  const handleEdit = (row) => {
    setEditingRow(row);
    setFormData({
      id_maquinaria: row.id_maquinaria || '',
      nombre: row.nombre || '',
      descripcion: row.descripcion || '',
      cantidad: row.cantidad || '',
      unidad: row.unidad || '',
    });
  };

  const handleSave = async () => {
    try {
      const response = editingRow.id_maquinaria 
        ? await fetch(`http://localhost:3000/api/maquinaria/${editingRow.id_maquinaria}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData),
          })
        : await fetch('http://localhost:3000/api/maquinaria/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData),
          });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Network response was not ok: ${text}`);
      }
      const updatedProduct = await response.json();

      if (editingRow.id_maquinaria) {
        setMaquinariaRows(maquinariaRows.map((row) => (row.id_maquinaria === editingRow.id_maquinaria ? { ...row, ...formData } : row)));
      } else {
        setMaquinariaRows([...maquinariaRows, updatedProduct]);
      }

      setEditingRow(null);
      setFormData({
        id_maquinaria: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        unidad: '',
      });
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Error updating data');
    }
  };

  const handleDelete = async (id_maquinaria) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/maquinaria/${id_maquinaria}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        setMaquinariaRows(maquinariaRows.filter((row) => row.id_maquinaria !== id_maquinaria));
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Error deleting data');
      }
    }
  };

  const handleAdd = async () => {
    // Similar to handleSave, but will be triggered when a new product is being added
    await handleSave();
  };

  const columnsMaquinaria = [
    { field: 'id_maquinaria', headerName: 'ID Maquinaria', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEdit(params.row)}>Editar</button>
          <button onClick={() => handleDelete(params.row.id_maquinaria)}>Eliminar</button>
        </>
      ),
    },
  ];

  const columnsMateriaPrima = [
    { field: 'id_materia_prima', headerName: 'ID Materia Prima', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'unidad', headerName: 'Unidad', width: 150 },
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
          <h4>Maquinaria</h4>
          <DataTable
            columns={columnsMaquinaria}
            rows={maquinariaRows}
            pageSize={5}
          />
          <h4>Materia Prima</h4>
          <DataTable
            columns={columnsMateriaPrima}
            rows={materiaPrimaRows}
            pageSize={5}
          />
          <div>
            <h4>{editingRow ? 'Editar' : 'Agregar'} Elemento</h4>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <input
                type='text'
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder='Nombre'
              />
              <input
                type='text'
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder='Descripción'
              />
              <input
                type='number'
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                placeholder='Cantidad'
              />
              <input
                type='text'
                value={formData.unidad}
                onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                placeholder='Unidad'
              />
              <button type='submit'>{editingRow ? 'Guardar Cambios' : 'Agregar Elemento'}</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDataInventory;
