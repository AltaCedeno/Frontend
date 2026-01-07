// src/services/auth.service.js (Versión JavaScript Pura)

import { tokenToString } from "typescript";

// ¡Eliminamos los imports de tipo!
// import type { UsuararioRequestResgister } from "../Interfaces/registros/user-request";
// import type { UsuarioResponseResgister } from "../Interfaces/registros/usuario-response.interface";

// URL base de tu backend Node.js
const API_BASE_URL = 'http://localhost:3000/api/auth';

/**
 * Función para registrar un nuevo usuario usando la API nativa fetch.
 * @param {object} data - Los datos del formulario de registro (nombre, email, password).
 * @returns {Promise<object>} Una promesa que resuelve con la respuesta de la API.
 */
export async function registerUserWithFetch(data) { // Eliminamos el tipado aquí
    try {
        const response = await fetch(`${API_BASE_URL}/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // 1. Convertir la respuesta del servidor a un objeto JSON
        const responseData = await response.json(); // Eliminamos el tipado aquí

        // 2. Manejo de errores de HTTP
        if (!response.ok) {
            // Si hay un error HTTP (4xx, 5xx), lanzamos el mensaje del backend
            const errorMessage = responseData.message || `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        
        // Devolvemos la data si todo fue exitoso
        return responseData;

    } catch (error) {
        // Capturamos errores de red o los errores que lanzamos nosotros
        const errorMessage = error instanceof Error ? error.message : "Error desconocido al registrar.";
        
        // Devolvemos el objeto de respuesta de error esperado
        return {
            success: false, 
            message: errorMessage, 
            user: undefined,
        };
    }
}


// Las interfaces deben eliminarse de este archivo .js (ver punto 2)so inecesarias
//----------------------------------------------------------------------------


export async function loginUserWithFetch(data) { 
    try {
        const response = await fetch(`${API_BASE_URL}/sign-in`, {//especificarmos su endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // 1. Convertir la respuesta del servidor a un objeto JSON
        const responseData = await response.json(); 

        // 2. Manejo de errores de HTTP
        if (!response.ok) {
            // Si hay un error HTTP (4xx, 5xx), lanzamos el mensaje del backend
            const errorMessage = responseData.message || `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        
        // Devolvemos la data si todo fue exitoso
        return responseData;

    } catch (error) {
        // Capturamos errores de red o los errores que lanzamos nosotros
        const errorMessage = error instanceof Error ? error.message : "Error desconocido al registrar.";
        
        // Devolvemos el objeto json de respuesta de error esperado en login(undefined pues no hay usuario ni token)
        return {
            success: false, 
            message: errorMessage, 
            user: undefined,
            token: undefined,
        };
}



}

