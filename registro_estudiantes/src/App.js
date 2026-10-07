import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  
  const [formulario, setFormulario] = useState({
    nombre: '',
    matricula: '',
    materia: '',
    calificacion: ''
  });


  const obtenerEstudiantes = async () => {
    const respuesta = await fetch('http://localhost:3001/api/estudiantes');
    const datos = await respuesta.json();
    setEstudiantes(datos);
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const registrarEstudiante = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/estudiantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario)
    });
    setFormulario({ nombre: '', matricula: '', materia: '', calificacion: '' }); // Limpiar formulario
    obtenerEstudiantes(); 
  };

  const borrarAlumno = async (matricula) => {

    const confirmar = window.confirm(`¿Seguro que deseas eliminar al alumno con matrícula ${matricula}?`);
    if (confirmar) {
      await fetch(`http://localhost:3001/api/estudiantes/${matricula}`, {
        method: 'DELETE'
      });
      obtenerEstudiantes(); 
    }
  };


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Registro de Estudiantes</h1>
      
      {/* Menú Interactivo - Opción 1: Registrar */}
      <form onSubmit={registrarEstudiante} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>1. Registrar Estudiante</h3>
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} required />
        <input type="number" name="matricula" placeholder="Matrícula" value={formulario.matricula} onChange={manejarCambio} required />
        <input type="text" name="materia" placeholder="Materia" value={formulario.materia} onChange={manejarCambio} required />
        <input type="number" step="0.1" name="calificacion" placeholder="Calificación" value={formulario.calificacion} onChange={manejarCambio} required />
        <button type="submit" style={{ marginLeft: '10px' }}>Registrar</button>
      </form>

      {/* Menú Interactivo - Opción 2: Ver Lista */}
      <h3>2. Lista de estudiantes registrados</h3>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matrícula</th>
            <th>Materia</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.length === 0 ? (
            <tr><td colSpan="5">La lista está vacía</td></tr>
          ) : (
            estudiantes.map((est) => (
              <tr key={est.matricula}>
                <td>{est.nombre}</td>
                <td>{est.matricula}</td>
                <td>{est.materia}</td>
                <td>{est.calificacion}</td>
                <td>
                  {/* Menú Interactivo - Opción 3: Borrar */}
                  <button onClick={() => borrarAlumno(est.matricula)} style={{ color: 'red' }}>
                     Borrar Alumno
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;