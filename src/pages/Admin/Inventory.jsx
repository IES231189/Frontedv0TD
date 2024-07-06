import {Link , Outlet} from 'react-router-dom'

const InventaryPanel=()=>{
  
      
    return(
        <>
        <div className="list-inventory">

             <Link to='addInventory'> Agregar</Link>
             <Link to='addedInventory'>Ver Inventario</Link>
        </div>
             <div>
                <Outlet></Outlet>
             </div>
      
           
        </>
    )
}

export default InventaryPanel;  