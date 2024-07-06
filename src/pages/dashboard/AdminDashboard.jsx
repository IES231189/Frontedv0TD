import {Outlet, Link } from "react-router-dom";
import Header from "../../components/molecules/Header";
import Menu from "../../components/organism/HorizontalSlides";


const AdminDashboard = ()=>{
   
    const buttons = [
        { label: 'Producción', path: 'produccion' },
        { label: 'Inventario', path: 'inventario' },
        { label: 'Empleados', path: 'empleados' },
        { label: 'Usuarios', path: 'usuarios' },
        { label: 'Servicios', path: 'servicios' },
        { label: 'Reportes', path: 'reportes' }
      ];
    return(
        <>
             <Header>
               <Menu buttons={buttons}></Menu>
            </Header>

            <div className="main-content">
                <Outlet></Outlet>
            </div>

        </>
       
    )
}

export default AdminDashboard;

