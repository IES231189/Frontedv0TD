import { useState } from "react";
import '../../styles/employes.scss'

const FormularioEmployes = () => {
    // Definir los estados para cada campo del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipo, setTipo] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [areaLaboral, setAreaLaboral] = useState('');
    const [salario, setSalario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        // Por ejemplo, puedes enviar los datos a una API o realizar alguna acción con ellos.
        console.log({
            nombre,
            email,
            telefono,
            tipo,
            fechaIngreso,
            areaLaboral,
            salario
        });
        alert('Empleado agregado correctamente');
        // Opcional: resetear los campos del formulario
        setNombre('');
        setEmail('');
        setTelefono('');
        setTipo('');
        setFechaIngreso('');
        setAreaLaboral('');
        setSalario('');
    };

    return (
        <div className="container-form-employes">
            <p> Datos básicos</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group-employes">
                    <label>Nombre Completo</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="content-section-form">
                    <div className="form-group-employes">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group-employes">
                        <label>Teléfono</label>
                        <input 
                            type="tel" 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                            required 
                        />
                    </div>
                </div>

                <div className="form-group-employes">
                    <label>Tipo de Empleado</label>
                    <select 
                        name="tipo" 
                        value={tipo} 
                        onChange={(e) => setTipo(e.target.value)} 
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="tipo1">Tipo 1</option>
                        <option value="tipo2">Tipo 2</option>
                    </select>
                </div>

                <p>Datos del Empleado</p>
                <div className="content-section-form">
                    <div className="form-group-employes">
                        <label>Fecha de Ingreso</label>
                        <input 
                            type="date" 
                            value={fechaIngreso} 
                            onChange={(e) => setFechaIngreso(e.target.value)} 
                        />
                    </div>

                    <div className="form-group-employes">
                        <label>Área Laboral</label>
                        <input 
                            type="text" 
                            value={areaLaboral} 
                            onChange={(e) => setAreaLaboral(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="form-group-employes">
                    <label>Salario</label><br/>
                    <input 
                        type="text" 
                        value={salario} 
                        onChange={(e) => setSalario(e.target.value)} 
                    />
                </div>
                 <div className="contain-button">
                    <button type="submit" className="button">Agregar</button>
                 </div>
                
            </form>
        </div>
    );
};

export default FormularioEmployes;
