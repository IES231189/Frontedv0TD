import React, { useState } from 'react';
import MantenimientoForm from '../molecules/Mantenimiento.form';
import MateriaPrimaForm from '../molecules/MateriaPrima.form';
import '../../styles/RendersFormProduction.scss'

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState('mantenimiento');

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'mantenimiento':
        return <MantenimientoForm />;
      case 'materia-prima':
        return <MateriaPrimaForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <h1>Registro de Datos</h1>
      <div className="btn-group mb-4" role="group">
        <button
          type="button"
          className={`btn ${selectedForm === 'mantenimiento' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedForm('mantenimiento')}
        >
          Mantenimiento
        </button>
        <button
          type="button"
          className={`btn ${selectedForm === 'materia-prima' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedForm('materia-prima')}
        >
          Materia Prima
        </button>
      </div>
      {renderSelectedForm()}
    </div>
  );
};

export default FormSelector;
