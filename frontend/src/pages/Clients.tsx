import { Link } from "react-router-dom";
import ClientList from "../components/Clients/ClientList";

const Clients = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1>Panel de Clientes</h1>
                <Link to="/products">
                    <button>Ver Productos</button>
                </Link>
            </div>
            <ClientList />
        </div>
    );
};

export default Clients;
