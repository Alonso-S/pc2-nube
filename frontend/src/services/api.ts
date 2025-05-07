import type {
    AuthResponse,
    Client,
    LoginFormData,
    Product,
    RegisterFormData,
} from "../types";

const API_URL = "http://localhost:8000/api";

export const registerClient = async (
    data: RegisterFormData,
): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar");
    }

    return response.json();
};

export const loginClient = async (
    data: LoginFormData,
): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return response.json();
};

export const getClients = async (): Promise<Client[]> => {
    const response = await fetch(`${API_URL}/clientes`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener clientes");
    }

    return response.json();
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/productos`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener productos");
    }

    const data = await response.json();
    console.log(data);
    return data;
};
