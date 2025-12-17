// src/components/LoginHandler.jsx

import React, { useState } from 'react';
// Asume que tu servicio está en esta ruta
import { loginUserWithFetch } from '../service/auth.service'; 

const LoginHandler = () => {
    
    // 1. ESTADOS
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 2. MANEJO DE CAMBIOS
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // 3. FUNCIÓN DE CONSUMO DEL SERVICIO
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setStatusMessage(''); 
        setIsLoggedIn(false);

        try {
            // Llama a la función de servicio
            const response = await loginUserWithFetch(formData); 
            
            if (response.success) {
                // ÉXITO: Guarda el token y actualiza el estado
                localStorage.setItem('authToken', response.token); 
                setIsLoggedIn(true);
                setStatusMessage(`¡Bienvenido, ${response.user.nombre || 'Usuario'}!`);
                console.log('Login exitoso. Token guardado.');
                
            } else {
                // FALLO: Muestra el mensaje de error que viene del servicio
                setStatusMessage(`Error: ${response.message}`);
            }
            
        } catch (error) {
            // Error de red o error de la función
            setStatusMessage('Error de red o conexión al servidor.');
        } finally {
            setLoading(false);
        }
    };

    // 4. RENDERIZADO
    
    // Si ya inició sesión, mostramos el mensaje de éxito
    if (isLoggedIn) {
        return (
            <div style={{ padding: '20px', border: '2px solid green', maxWidth: '400px', margin: '20px auto' }}>
                <h2>¡Inicio de Sesión Exitoso!</h2>
                <p style={{ color: 'green', fontWeight: 'bold' }}>{statusMessage}</p>
                <button onClick={() => { localStorage.removeItem('authToken'); setIsLoggedIn(false); setStatusMessage(''); }}>
                    Cerrar Sesión
                </button>
            </div>
        );
    }
    
    // Si no ha iniciado sesión, mostramos el formulario
    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '400px', margin: '20px auto' }}>
            <h4>Iniciar Sesión</h4>
            
            {/* Campo Email */}
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" id="email" name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* Campo Contraseña */}
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input 
                    type="password" id="password" name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '15px', padding: '10px' }}>
                {loading ? 'Logueando...' : 'Login'}
            </button>
            
            {/* Mensaje de Estado */}
            {statusMessage && (
                <p style={{ color: isLoggedIn ? 'green' : 'red', fontWeight: 'bold', marginTop: '10px' }}>
                    {statusMessage}
                </p>
            )}
        </form>
    );
};

export default LoginHandler;
