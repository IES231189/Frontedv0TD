import { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import Login from "./auth/login";
import ErrorPage from "./routes/error-page";
import ProtectedRoute from "./routes/ProtectedRoute";

import AdminEmployes from "./pages/Admin/Employes.jsx";
import AdminProduction from "./pages/Admin/Production";
import AdminServices from "./pages/Admin/Services";
import AdminUsers from "./pages/Admin/Users";
import Services from "./components/organism/SectionServicesAdded.jsx";
import AgregarServicio from "./components/organism/Section.ServiceAñadir.jsx";
import FormularioAddUSers from "./components/molecules/form.usersAdd.jsx";
import formularioPago from "./components/molecules/FormPayload.jsx";

import UsersAdded from "./components/organism/Section.users.added.jsx";
import FormularioEmployes from "./components/molecules/Form.employes.jsx";
import FormularioPago from "./components/molecules/FormPayload.jsx";
import RegistroForm from "./components/organism/SectionallregisterEmployes.jsx";
import FormSelector from "./components/organism/Form.selector.jsx";
import Calculator from "./pages/Users/Sales.jsx";
import User_Inventory from "./pages/Users/User_Inventory.jsx";
import CajaForm from "./pages/Users/CashRegister.jsx";
import EmployesTables from "./components/organism/employes.tables.jsx";
import Production from "./components/organism/production.employes.jsx";
import InventaryPanel from "./pages/Admin/Inventory.jsx";
import AdminInventary from "./components/organism/Admin.inventary.jsx";
import AdminDataInventory from "./components/organism/Admin.Inventory.jsx";
import Report from "./pages/Report/Reportes.main.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  //esta funcion la usaremos despues cuando el backend este listo para enviar tokens
  /*useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setAuthenticated(true);
      setUserRole(user.role);
    }
  }, []);*/


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
            //aqui nesecito pasarle SetAuthenticated y setUserRole al componente y pasarle el evento handle login al formulario
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="admin">
           <AdminDashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'produccion',
          element: <AdminProduction />,
          children:[
            {path:'agregar-produccion',element:<FormSelector></FormSelector>},
            {path:'allregisters' , element:<Production></Production>}
          ]
        },
        {
          path: 'inventario',
          element: <InventaryPanel></InventaryPanel>,
          children:[
            {path:'addInventory' , element:<AdminInventary></AdminInventary>},
            {path:'addedInventory' , element:<AdminDataInventory></AdminDataInventory>}
          ]
        },
        {
          path: 'empleados',
          element: <AdminEmployes />,
          children:[
            {path:'employesAdd' , element:<FormularioEmployes></FormularioEmployes>},
            {path:'daysAdd' ,element:<RegistroForm></RegistroForm>},
            {path:'employesAdded' , element:<EmployesTables></EmployesTables>}
          ]
        },
        {
          path: 'servicios',
          element: <AdminServices />,
          children:[
            {
              index: true, 
              element: <AgregarServicio></AgregarServicio>,
            },
            {
            path:'serviciosAdded',
            element:<Services></Services>
          },{

            path:'agregar-servicio',
            element:<AgregarServicio></AgregarServicio>
          },{
            path:'registrar-pago',
            element:<FormularioPago></FormularioPago>
          }
        ]
        },
        {
          path: 'usuarios',
          element: <AdminUsers />,
          children:[
            {
              index: true, 
              element: <FormularioAddUSers></FormularioAddUSers>,
            },
            {path:'agregar-usuario',element:<FormularioAddUSers></FormularioAddUSers>},
            { path:'usersAdded', element:<UsersAdded></UsersAdded>}
          ]
        },
        {
          /* Necesito modificar las rutas*/
          path: 'reportes',
          element: <Report></Report>,
          children:[
            {path:'Employestrigger' , element:<></>},
            { path:'' ,element:<></>},
            { path:'' , element:<></>}
          ]
        },
      ]
    },
    {
      path: '/user',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="user">
            <UserDashboard></UserDashboard>
        </ProtectedRoute>
      ),children:[
           {path:'viewUserinventario',
            element:<User_Inventory></User_Inventory>},
            {path:'Ventas',element:<Calculator></Calculator> },
            {path:'Caja' , element:<CajaForm></CajaForm>}
      ]
    },
    {
      path: '*',
      element: <ErrorPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
