import React, { useState } from "react";
import '../../styles/employes.scss';

const FormularioEmployes = () => {
    // Definir los estados para cada campo del formulario
    const [idEmpleado, setIdEmpleado] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const empleado = {
            id_empleado: idEmpleado,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            telefono: telefono
        };

        try {
            const response = await fetch('http://localhost:3000/api/empleados/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleado)
            });

            if (!response.ok) {
                throw new Error('Error al agregar el empleado');
            }

            const result = await response.text(); // Leer la respuesta como texto

            // Mostrar mensaje de alerta basado en la respuesta del servidor
            alert(result);

            // Opcional: resetear los campos del formulario
            setIdEmpleado('');
            setNombre('');
            setApellidos('');
            setEmail('');
            setTelefono('');
        } catch (error) {
            console.error('Hubo un problema al agregar el empleado:', error.message);
            alert('Hubo un problema al agregar el empleado');
        }
    };

    return (
        <div className="container-form-employes">
            <p> Datos básicos</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group-employes">
                    <label>ID Empleado</label>
                    <input 
                        type="text" 
                        value={idEmpleado} 
                        onChange={(e) => setIdEmpleado(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group-employes">
                    <label>Apellidos</label>
                    <input 
                        type="text" 
                        value={apellidos} 
                        onChange={(e) => setApellidos(e.target.value)} 
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
                        />
                    </div>
                    <div className="form-group-employes">
                        <label>Teléfono</label>
                        <input 
                            type="tel" 
                            value={telefono} 
                            onChange={(e) => setTelefono(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="contain-button">
                    <button type="submit" className="button">Agregar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioEmployes;
