import React, { useState } from 'react';
import '../../styles/user.Cash.scss'

const CajaForm = ({ onSubmit }) => {
  const [montoInicial, setMontoInicial] = useState('');
  const [montoFinal, setMontoFinal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!montoInicial || !montoFinal) {
      setError('Por favor, complete ambos campos.');
      return;
    }

    if (isNaN(montoInicial) || isNaN(montoFinal)) {
      setError('Ambos valores deben ser numéricos.');
      return;
    }

    if (parseFloat(montoInicial) < 0 || parseFloat(montoFinal) < 0) {
      setError('Los valores no pueden ser negativos.');
      return;
    }

    setError('');
    onSubmit({ montoInicial: parseFloat(montoInicial), montoFinal: parseFloat(montoFinal) });
    setMontoInicial('');
    setMontoFinal('');
  };

  return (
    <div className='content-section-page-user'>
      <form onSubmit={handleSubmit} className='form-monto-Cash'>
        <div className="form-group">
          <label htmlFor="montoInicial">Monto Inicial en Caja:</label>
          <input
            type="text"
            id="montoInicial"
            name="montoInicial"
            value={montoInicial}
            onChange={(e) => setMontoInicial(e.target.value)}
            className="form-control"
            placeholder="Ingrese el monto inicial"
          />
        </div>
        <div className="form-group">
          <label htmlFor="montoFinal">Monto Final en Caja:</label>
          <input
            type="text"
            id="montoFinal"
            name="montoFinal"
            value={montoFinal}
            onChange={(e) => setMontoFinal(e.target.value)}
            className="form-control"
            placeholder="Ingrese el monto final"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-warning">Registrar</button>
      </form>
    </div>
  );
};

export default CajaForm;
