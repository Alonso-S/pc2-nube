import { useState } from "react";
import type { FormEvent } from "react";
import { loginClient } from "../../services/api";
import type { LoginFormData } from "../../types";
import styles from "./Auth.module.css";

interface LoginFormProps {
    onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await loginClient(formData);
            onLogin();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al iniciar sesión",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">
                    Contraseña
                </label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button
                className={styles.submitButton}
                type="submit"
                disabled={loading}
            >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
        </form>
    );
};

export default LoginForm;
