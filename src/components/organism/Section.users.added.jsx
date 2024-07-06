
import DataTable from "../atoms/Table";

const UsersAdded = () => {
  const servicesColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'Nombre', headerName: 'Nombre', width: 150 },
    { field: 'Correo', headerName: 'Correo electronico', width: 110 },
    { field: 'tipo', headerName: 'tipo', width: 160 },
    { field: 'estatus', headerName: 'estatus', width: 160 },
    { field: 'actions', headerName: 'Actions', width: 150 },
  ];

  const servicesRows = [
    { id: 1, nombre: '', Correo: 0, tipo: '' ,estatus:'false'},
  ];

  const handleEditService = (id) => {
    alert(`Editar servicio con ID: ${id}`);
  };

  const handleDeleteService = (id) => {
    alert(`Eliminar servicio con ID: ${id}`);
  };

  return (
    <div className="content-section-page-article">
      <div className="content-item1">
        <p>Usuarios Agregados</p>
        <DataTable 
          columns={servicesColumns} 
          rows={servicesRows} 
          onEdit={handleEditService} 
          onDelete={handleDeleteService} 
        />
      </div>
    </div>
  );
};

export default UsersAdded;