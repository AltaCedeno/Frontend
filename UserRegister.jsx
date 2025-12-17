// src/components/UserRegister.jsx (Corregido a JavaScript/JSX)

import React, { useState } from 'react';
// La función de servicio debe ser importada (asumimos que ya no usa tipado TS en su exportación)
import { registerUserWithFetch } from '../service/auth.service'; 
// Ya no necesitamos importar los tipos, aunque mantener las interfaces es buena práctica si regresas a TS.
// import type { UsuararioRequestResgister } from '../Interfaces/registros/user-request';
// import type { UsuarioResponseResgister } from '../Interfaces/registros/usuario-response.interface';


const UserRegister = () => {
    
    // 1. ESTADOS (Inicializados con valores JS normales)
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // Ya no tipamos, solo null

    // 2. MANEJO DE CAMBIOS 
    // El tipo de evento (e) ya no se define explícitamente
    const handleChange = (e) => {
        const { name, value } = e.target; 
        
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // 3. MANEJO DEL SUBMIT
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            // La función ahora retorna una Promesa cuyo tipo no se verifica
            const response = await registerUserWithFetch(formData); 
            
            setResult(response); 
            
            if (response.success) {
                console.log('Registro exitoso:', response.user);
            }
            
        } catch (error) {
            // Manejamos el error asegurando la estructura de la respuesta
            setResult({ success: false, message: 'Fallo la petición o error de red.', user: undefined });
        } finally {
            setLoading(false);
        }
    };

    // 4. RENDERIZADO
    return (
        <form onSubmit={handleSubmit}>
            <h4>Registro de Usuario</h4>
            
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input 
                    type="text" id="nombre" name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" id="email" name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input 
                    type="password" id="password" name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
            </button>
            
            {/* Mensaje de Resultado */}
            {result && (
                <p style={{ color: result.success ? 'green' : 'red', fontWeight: 'bold' }}>
                    {result.message}
                </p>
            )}
        </form>
    );
};

export default UserRegister;