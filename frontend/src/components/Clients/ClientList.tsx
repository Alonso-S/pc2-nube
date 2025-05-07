import { useEffect, useState } from "react";
import { getClients } from "../../services/api";
import type { Client } from "../../types";
import styles from "./ClientList.module.css";

const ClientList = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Error al cargar clientes",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Cargando clientes...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (clients.length === 0) {
        return <div className={styles.empty}>No hay clientes registrados.</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Clientes</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.nombre}</td>
                            <td>{client.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
