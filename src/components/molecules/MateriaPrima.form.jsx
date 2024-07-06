import React, { useState } from 'react';
import '../../styles/RendersFormProduction.scss'


const MateriaPrimaForm = () => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [unidades, setUnidades] = useState('kilogramos');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/materia-prima', {
                nombre,
                fecha,
                cantidad,
                proveedor,
                unidades,
                descripcion
            });
            alert('Registro de materia prima agregado con éxito');
            setNombre('');
            setFecha('');
            setCantidad('');
            setProveedor('');
            setUnidades('kilogramos');
            setDescripcion('');
        } catch (error) {
            console.error('Error al registrar la materia prima', error);
        }
    };

    return (
        <div className='form-container-render'>
            <form onSubmit={handleSubmit} className="p-4">
                <h3>Registrar Materia Prima</h3>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input type="number" step="0.01" className="form-control" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Proveedor</label>
                    <input type="text" className="form-control" value={proveedor} onChange={(e) => setProveedor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Unidades</label>
                    <select className="form-select" value={unidades} onChange={(e) => setUnidades(e.target.value)} required>
                        <option value="kilogramos">Kilogramos</option>
                        <option value="litros">Litros</option>
                        <option value="unidades">Unidades</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <button type="submit" className="button">Registrar Materia Prima</button>
            </form>
        </div>
    );
};

export default MateriaPrimaForm;
