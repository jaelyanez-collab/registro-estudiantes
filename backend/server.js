const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let lista_estudiantes = [];

app.post('/api/estudiantes', (req, res) => {
    const nuevoEstudiante = {
        nombre: String(req.body.nombre),
        matricula: parseInt(req.body.matricula),
        materia: String(req.body.materia),
        calificacion: parseFloat(req.body.calificacion)
    };
    
    lista_estudiantes.push(nuevoEstudiante);
    res.status(201).json({ mensaje: 'Estudiante registrado', estudiante: nuevoEstudiante });
});

app.get('/api/estudiantes', (req, res) => {
    res.json(lista_estudiantes);
});

app.delete('/api/estudiantes/:matricula', (req, res) => {
    const matriculaEliminar = parseInt(req.params.matricula);
    lista_estudiantes = lista_estudiantes.filter(est => est.matricula !== matriculaEliminar);
    res.json({ mensaje: 'Alumno eliminado exitosamente' });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});