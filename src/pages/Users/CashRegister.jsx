import React, { useState, useEffect } from 'react';
import '../../styles/user.Cash.scss';

const CajaForm = () => {
  const [montoInicial, setMontoInicial] = useState('');
  const [montoFinal, setMontoFinal] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNaN(parseFloat(montoInicial)) && !isNaN(parseFloat(montoFinal))) {
      setTotal(parseFloat(montoFinal) - parseFloat(montoInicial));
    }
  }, [montoInicial, montoFinal]);

  const handleSubmit = async (e) => {
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
    const corteCaja = { 
      monto_inicial: parseFloat(montoInicial), 
      monto_final: parseFloat(montoFinal), 
      total 
    };

    try {
      const response = await fetch('http://localhost:3000/api/corte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you have a token in local storage
        },
        body: JSON.stringify(corteCaja)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setError(errorText || 'Error al registrar el corte de caja.');
        return;
      }

      const data = await response.json();
      console.log('Corte de caja registrado:', data);
      setMontoInicial('');
      setMontoFinal('');
      setTotal(0);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <div className='content-section-page-user'>
      <form onSubmit={handleSubmit} className='form-monto-Cash'>
        <div className="form-group">
          <label htmlFor="montoInicial">Monto Inicial en Caja:</label>
          <input
            type="number"
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
            type="number"
            id="montoFinal"
            name="montoFinal"
            value={montoFinal}
            onChange={(e) => setMontoFinal(e.target.value)}
            className="form-control"
            placeholder="Ingrese el monto final"
          />
        </div>
        <div className="form-group">
          <label htmlFor="total">Total:</label>
          <input
            type="text"
            id="total"
            name="total"
            value={total}
            className="form-control"
            readOnly
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-warning">Registrar</button>
      </form>
    </div>
  );
};

export default CajaForm;
