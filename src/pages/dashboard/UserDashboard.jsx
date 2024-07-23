import { Outlet} from "react-router-dom";
import Header from "../../components/molecules/Header";
import Menu from "../../components/organism/HorizontalSlides";


const UserDashboard=()=>{
    
    const buttons=[
        {label:'Inventario' , path:'viewUserinventario'},
        {label:'Ventas' , path:'Ventas'},
        {label:'Caja' ,path:'Caja'}
    ]
    
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

export default UserDashboard;