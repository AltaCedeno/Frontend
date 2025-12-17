// src/components/Login.jsx

// import React, { useState } from 'react';
// import { loginUserWithFetch } from '../service/auth.service';

// const Login = ({ onLoginSuccess }) => {
//     // Estado para almacenar email y password
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [message, setMessage] = useState('');
//     // ... (El resto de la lógica handleChange y handleSubmit)

// const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null); // Ya no tipamos, solo null

//     // 2. MANEJO DE CAMBIOS 
//     // El tipo de evento (e) ya no se define explícitamente
//    const handleChange = (e) => {
//       const { email, value } = e.target; 
        
//       setFormData(prevFormData => ({
//          ...prevFormData,
//           [email]: value,
//        }));
//     };

//     // 3. MANEJO DEL SUBMIT
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         setResult(null);

//         try {
//             // La función ahora retorna una Promesa cuyo tipo no se verifica
//             const response = await loginUserWithFetch(formData); 
            
//             setResult(response); 
            
//             if (response.success) {
//                 console.log('login exitoso:', response.user);
//             }
            
//         } catch (error) {
//             // Manejamos el error asegurando la estructura de la respuesta
//             setResult({ success: false, message: 'Fallo la petición o error de red.', user: undefined });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 4. RENDERIZADO
//     return (
//         <form onSubmit={handleSubmit}>
//             <h4>Login de Usuario</h4>
                                     
            
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input 
//                     type="email" id="email" name="email" 
//                     value={formData.email} 
//                     onChange={handleChange} 
//                     required 
//                 />
//             </div>
            
//             <div>
//                 <label htmlFor="password">Contraseña:</label>
//                 <input 
//                     type="password" id="password" name="password" 
//                     value={formData.password} 
//                     onChange={handleChange} 
//                     required 
//                 />
//             </div>

//             <button type="submit" disabled={loading}>
//                 {loading ? 'logiend...' : 'Login'}
//             </button>
            
//             {/* Mensaje de Resultado */}
//             {result && (
//                 <p style={{ color: result.success ? 'green' : 'red', fontWeight: 'bold' }}>
//                     {result.message}
//                 </p>
//             )}
//         </form>
//     );
// };

// //export default Login;












//     // ....................................................................................

//     const handleChange = (e) => { /* ... */ };
//     const handleSubmit = async (e) => { /* ... */ };


//     return (
//         // ... (El JSX para el formulario de Login)
//         <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
//             <h2>Iniciar Sesión</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Inputs y botón */}
//                 <button type="submit" style={{ marginTop: '15px', padding: '10px' }}>Iniciar Sesión</button>
//             </form>
//             {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
//         </div>
//     );
// };

// export default Login;

// src/components/Login.jsx
//-----------------------------------
import React, { useState } from 'react';
// Importamos el servicio de Login
import { loginUserWithFetch } from '../service/auth.service'; 

const Login = ({ onLoginSuccess }) => {
    
    // 1. ESTADOS UNIFICADOS
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    // Usaremos 'result' para mostrar el mensaje de éxito/error al usuario
    const [result, setResult] = useState(null); 

    // 2. CORRECCIÓN #1: Función handleChange reincorporada y correcta
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
        setResult(null); // Limpiamos el resultado anterior

        try {
            const response = await loginUserWithFetch(formData); 
            
            setResult(response); 
            
            if (response.success) {
                console.log('Login exitoso:', response.user);
                
                // Si el login fue exitoso, llamas a la prop onLoginSuccess
                if (onLoginSuccess) {
                    onLoginSuccess(response.user, response.token); 
                }
            }
            
        } catch (error) {
            // Error de red o error lanzado por el servicio
            setResult({ success: false, message: 'Fallo la petición o error de red.', user: undefined });
        } finally {
            setLoading(false);
        }
    };

    // 4. CORRECCIÓN #2 & #3: RENDERIZADO UNIFICADO
    return (
        // Usamos una estructura limpia para el formulario de login
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
            <h4>Login de Usuario</h4>
            
            {/* Campo Email */}
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" id="email" name="email" 
                    value={formData.email} 
                    onChange={handleChange} // Vinculación
                    required 
                />
            </div>
            
            {/* Campo Contraseña */}
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input 
                    type="password" id="password" name="password" 
                    value={formData.password} 
                    onChange={handleChange} // Vinculación
                    required 
                />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '15px', padding: '10px' }}>
                {loading ? 'Logueando...' : 'Login'}
            </button>
            
            {/* Mensaje de Resultado (Usando el estado 'result') */}
            {result && (
                <p style={{ color: result.success ? 'green' : 'red', fontWeight: 'bold', marginTop: '10px' }}>
                    {result.message}
                </p>
            )}
        </form>
    );
};

export default Login;