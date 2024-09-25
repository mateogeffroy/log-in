import { useState, useEffect } from 'react';
import api from '../api';

function Home() {
    const [historiasClinicas, setHC] = useState([]);
    const [contenido, setContenido] = useState("");
    const [titulo, setTitulo] = useState("");
    
    useEffect(() => {
        getHCs();
    }, []);

    const getHCs = () => {
        api
            .get('/api/HCs/')
            .then((res) => res.data)
            .then((data) => {
                setHC(data);
            })
            .catch((err) => alert (err));
    };

    const deleteHC = (id) => {
        api
            .delete('/api/HCs/delete/${id}/')
            .then((res) => {
                if (res.status === 204) alert('Historia clinica eliminada.');
                else alert('Error: No se pudo eliminar la historia clinica.');
                getHCs();
        })
        .catch((error) => alert(error));
    };

    const createHC = (e) => {
        e.preventDefault();
        const pacienteId = localStorage.getItem('pacienteId');
        api
            .post("/api/HCs/", { contenido, titulo, paciente: pacienteId })
            .then((res) => {
                if (res.status === 201) {
                    alert('Historia clinica creada.');
                    getHCs();
                } else {
                    alert('Error: No se pudo eliminar la historia clinica.');
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.error('Error en la respuesta:', err.response.data);
                    alert(`Error: ${err.response.data.detail || err.response.data}`);
                } else {
                    console.error('Error en la solicitud:', err.message);
                    alert(`Error en la solicitud: ${err.message}`);
                }
            });               
    };

    return (
        <div>
            <div>
                <h2>Historias clinicas</h2>
            </div>
            <h2>Crear una historia clinica</h2>
            <form onSubmit={createHC}>
                <label htmlFor='titulo'>Titulo:</label>
                <br/>
                <input
                    type='text'
                    id='titulo'
                    name='titulo'
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <label htmlFor='contenido'>Contenido:</label>
                <br />
                <textarea
                    id='contenido'
                    name='contenido'
                    required
                    value={contenido}
                    onChange = {(e) => setContenido(e.target.value)}
                ></textarea>
                <br />
                <input type='submit' value='Submit'></input>
            </form>
        </div>
    );
}

export default Home;