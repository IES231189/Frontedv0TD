import Navigation from "../../components/organism/navigation";

const AdminProduction=()=>{
    const info = [
        { label: "Registrados", path: "allregisters" },
        { label: "Agregar", path: "agregar-produccion" }
      ];

    return(
        <div >
        <Navigation className={'content-box-section-2'} info={info} ></Navigation>
   </div>
    )
}

export default AdminProduction;