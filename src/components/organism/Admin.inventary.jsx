import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import '../../styles/Inventory.scss';



const PiezasMaquinariaForm = () => (
    <div> 
    <div className="form-title">
                <h2>Piezas de Maquinaria</h2>
            </div>
        <div className="container-render-form">
           

            <div id="contain-form">
                <form>
                    <div className="form-group">
                        <label>Nombre de la Pieza</label>
                        <input type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input type="number" required />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea required></textarea>
                    </div>
                    <button type="submit">Agregar Pieza</button>
                </form>
            </div>
        </div>
    </div>
);



const CostalesHarinaForm = () => (
    <div>
        <div className="form-title">
            <h2>Costales de Harina</h2>
        </div>

        <div className="container-render-form">


            <form>
                <div className="form-group">
                    <label>Tipo de Harina</label>
                    <input type="text" required />
                </div>
                <div className="form-group">
                    <label>Cantidad de Costales</label>
                    <input type="number" required />
                </div>
                <div className="form-group">
                    <label>Fecha de Entrada</label>
                    <input type="date" required />
                </div>
                <button type="submit">Agregar Costal</button>
            </form></div>
    </div>
);

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