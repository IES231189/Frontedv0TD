import React, { useEffect, useState } from 'react';


const RegistroForm = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoId, setEmpleadoId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('/api/empleados');
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener empleados', error);
      }
    };
    fetchEmpleados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/registros', {
        empleado_id: empleadoId,
        fecha,
        horas_trabajadas: horasTrabajadas
      });
      alert('Día laborado registrado con éxito');
      setEmpleadoId('');
      setFecha('');
      setHorasTrabajadas('');
    } catch (error) {
      console.error('Error al registrar el día laborado', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="form-label">Empleado</label>
        <select
          className="form-control"
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
          required
        >
          <option value="">Seleccione un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="form-label">Horas Trabajadas</label>
        <input
          type="number"
          className="form-control"
          value={horasTrabajadas}
          onChange={(e) => setHorasTrabajadas(e.target.value)}
          required
        />
      </div>
      <button type="submit" >
        Registrar Día Laborado
      </button>
    </form>
  );
};

export default RegistroForm;
