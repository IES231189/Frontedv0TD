// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../../styles/calculator.scss';

const Sales = () => {
  const [peso, setPeso] = useState('');
  const [kilo, setKilo] = useState(1);
  const [gramos, setGramos] = useState(0);
  const [fecha, setFecha] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  const handlePesoChange = (e) => {
    const pesoValue = parseFloat(e.target.value);
    setPeso(e.target.value);

    if (!isNaN(pesoValue)) {
      const kilos = pesoValue / 20;
      const gramosEquivalentes = kilos * 1000;
      setGramos(gramosEquivalentes.toFixed(2));
    } else {
      setGramos(0);
    }
  };

  const handleKiloChange = (e) => {
    const kiloValue = parseInt(e.target.value, 10);
    setKilo(kiloValue);

    setPeso((kiloValue * 20).toFixed(2));
    setGramos((kiloValue * 1000).toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ventaData = {
      id_venta: Math.floor(Math.random() * 1000), // Generar un ID de venta aleatorio
      fecha: new Date(fecha).toISOString().split('T')[0], // Formato YYYY-MM-DD
      id_empleado: parseInt(idEmpleado, 10),
      id_usuario: parseInt(idUsuario, 10),
      total: parseFloat(peso),
    };

    try {
      const response = await fetch('http://localhost:3000/api/ventas/agregarVenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaData),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la red');
      }

      console.log('Venta registrada con éxito');
    } catch (error) {
      console.error('Error registrando la venta:', error);
    }
  };

  return (
    <div className="calculator">
      <h1>Registrar Venta</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-container-calculator'>
          <div>
            <div className="input-field">
              <label>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>ID Empleado</label>
              <input
                type="number"
                value={idEmpleado}
                onChange={(e) => setIdEmpleado(e.target.value)}
                placeholder="Ingresa el ID del empleado"
                required
              />
            </div>
            <div className="input-field">
              <label>ID Usuario</label>
              <input
                type="number"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
                placeholder="Ingresa el ID del usuario"
                required
              />
            </div>
            <div className="input-field">
              <label>Precio (MXN)</label>
              <input
                type="number"
                value={peso}
                onChange={handlePesoChange}
                placeholder="Ingresa el valor en pesos"
                required
              />
            </div>
          </div>
          <div>
            <div className="input-field">
              <label>Kilos</label>
              <select value={kilo} onChange={handleKiloChange}>
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <label>Equivalente en gramos</label>
              <input
                type="number"
                value={gramos}
                readOnly
                placeholder="Equivalente en gramos"
              />
            </div>
            <button type="submit" className="add-button">
              Agregar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sales;
