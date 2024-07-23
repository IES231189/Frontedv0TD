import CardButton from '../../components/atoms/Card.Button';
import '../../styles/reports.scss';

const Report=()=>{

    const props=[
        {path:'Inventorytrigger' , label:'Inventario'},
        {path:'Employestrigger' , label:'Empleados'},
        {path:'Servicestrigger' , label:'servicios'},
        {path:'Salestrigger' , label:'Ventas'},
        {path:'Productiontrigger' , label:'Production'},
        {path:'Maquinariatrigger' , label:'Maquinaria'}
    ]

    return(
        <div className="container-option-report">
            <CardButton  props={props} ></CardButton>
        </div>
        
    )
}

export default Report;