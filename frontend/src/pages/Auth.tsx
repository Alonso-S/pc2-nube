import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import styles from "../components/Auth/Auth.module.css";

interface AuthProps {
    onLogin: () => void;
}

const Auth = ({ onLogin }: AuthProps) => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    const handleTabChange = (tab: "login" | "register") => {
        setActiveTab(tab);
    };

    const handleRegisterSuccess = () => {
        setActiveTab("login");
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${
                        activeTab === "login" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabChange("login")}
                >
                    Iniciar Sesión
                </button>
                <button
                    className={`${styles.tab} ${
                        activeTab === "register" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabChange("register")}
                >
                    Registrarse
                </button>
            </div>

            {activeTab === "login"
                ? <LoginForm onLogin={onLogin} />
                : <RegisterForm onSuccess={handleRegisterSuccess} />}
        </div>
    );
};

export default Auth;
