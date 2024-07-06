import React, { useState } from 'react';
import '../../styles/calculator.scss'

const Calculator = () => {
    const [peso, setPeso] = useState('');
    const [kilo, setKilo] = useState(1);
    const [gramos, setGramos] = useState(0);

    // Manejar cambio en el input de peso
    const handlePesoChange = (e) => {
        const pesoValue = parseFloat(e.target.value);
        setPeso(e.target.value);

        if (!isNaN(pesoValue)) {

            // Convertir pesos a gramos
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


    const handleSubmit = (e) => {
        e.preventDefault();
        //aqui se debe enviar los datos a la api 
        console.log('Formulario enviado:', { peso, gramos });
    };

    return (
        <div className="calculator">
            <h1>Calculadora Peso-Kilo</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-container-calculator'>

                    <div>
                        <div className="input-field">
                            <p>En pesos</p>
                            <label>Precio (MXN)</label>
                            <input
                                type="number"
                                value={peso}
                                onChange={handlePesoChange}
                                placeholder="Ingresa el valor en pesos"
                            />
                        </div>
                        <div className="input-field">
                        <p>En kilos</p>
                            <label>Kilos</label>
                            <select value={kilo} onChange={handleKiloChange}>
                                {[...Array(10).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div>
                        <div className="input-field">
                            <p>total</p>
                            <label>Equivalente en gramos</label>
                            <input
                                type="number"
                                value={gramos}
                                readOnly // Solo lectura
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

export default Calculator;
