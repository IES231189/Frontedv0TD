import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  maxWidth: 600,
  margin: 'auto',
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const FormSection = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(4),
}));

const FormTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '16px',
});

const ServiceForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // falta la logica para manejar el envio
    alert('Formulario enviado');
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <FormSection>
        <FormTitle variant="h5">Información del Servicio</FormTitle>
        <TextField
          fullWidth
          label="Nombre del Servicio"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Tipo de Servicio"
          variant="outlined"
          margin="normal"
          required
        />
      </FormSection>

      <FormSection>
        <FormTitle variant="h5">Información del Proveedor</FormTitle>
        <TextField
          fullWidth
          label="Nombre del Proveedor"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Contacto del Proveedor"
          variant="outlined"
          margin="normal"
          required
        />
      </FormSection>

      <button className='btn-warning'>
              Agregar
      </button>

    </FormContainer>
  );
};

export default ServiceForm;
