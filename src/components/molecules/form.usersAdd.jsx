import React, { useState } from 'react';
import '../../styles/usuarios.scss'

const FormularioAddUSers = () => {
  const [formValues, setFormValues] = useState({
    usuario: '',
    contrasena: '',
    correo: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // nos falta manejar la logica del envio 
    console.log(formValues);
  };

  return (
    <div className="form-container">
      <h2>Información de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formValues.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formValues.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formValues.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            name="tipo"
            value={formValues.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="tipo1">Tipo 1</option>
            <option value="tipo2">Tipo 2</option>
          </select>
        </div>
        <div className='contain-button-user'>
          <button type="submit" className='button'>Agregar</button>
        </div>
        
      </form>
    </div>
  );
};

export default FormularioAddUSers;
