export interface Client {
    id: number;
    nombre: string;
    email: string;
}

export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    nombre: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    clients?: Client[];
}
