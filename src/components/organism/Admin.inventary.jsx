import { useState } from "react";
import '../../styles/Inventory.scss';

const PiezasMaquinariaForm = () => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/api/maquinaria/agregarMaquinaria', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              nombre,
              descripcion,
              cantidad
            }),
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la respuesta del servidor: ${errorText}`);
          }
      
          alert('Pieza de maquinaria agregada con éxito');
          setNombre("");
          setDescripcion("");
          setCantidad("");
        } catch (error) {
          console.error('Error al agregar pieza de maquinaria:', error);
          alert(`Error al agregar pieza de maquinaria: ${error.message}`);
        }
      };
      
      

    return (
        <div> 
            <div className="form-title">
                <h2>Piezas de Maquinaria</h2>
            </div>
            <div className="container-render-form">
                <div id="contain-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre de la Pieza</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Cantidad</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Agregar Pieza</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


const CostalesHarinaForm = () => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [unidad, setUnidad] = useState("costales");
    const [descripcion, setDescripcion] = useState("Costales de harina");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtener el token del localStorage

        try {
            const response = await fetch('http://localhost:3000/api/materiaPrima/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Añadir el token en los encabezados
                },
                body: JSON.stringify({
                    nombre,
                    cantidad,
                    unidad,
                    descripcion
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            alert('Costal de harina agregado con éxito');
            setNombre("");
            setCantidad("");
            setUnidad("costales");
            setDescripcion("Costales de harina");
        } catch (error) {
            console.error('Error al agregar costal de harina:', error);
            alert('Error al agregar costal de harina');
        }
    };

    return (
        <div>
            <div className="form-title">
                <h2>Costales de Harina</h2>
            </div>
            <div className="container-render-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Unidad</label>
                        <input
                            type="text"
                            value={unidad}
                            onChange={(e) => setUnidad(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Agregar Costal</button>
                </form>
            </div>
        </div>
    );
};



const AdminInventary = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="container-inventory">
            <div className="container-section">
                <div className="container-option">
                    <p>Seleccione una opción</p>
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="piezas_maquinaria">Piezas de Maquinaria</option>
                        <option value="costales_harina">Costales de Harina</option>
                    </select>
                </div>
                <div>
                    {selectedOption === "piezas_maquinaria" && <PiezasMaquinariaForm />}
                    {selectedOption === "costales_harina" && <CostalesHarinaForm />}
                </div>
            </div>
        </div>
    );
};

export default AdminInventary;
