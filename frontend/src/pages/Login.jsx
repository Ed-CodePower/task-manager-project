import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Auth.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    function handleChange(event){
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card" aria-labelledby="login-heading">
                <h1 id="login-heading">Login</h1>
                <p>Sign in to access your task manager.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="login-email">Email</label>
                    <input 
                        id="login-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="login-password">Password</label>
                    <input 
                        id="login-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Login</button>
                </form>

                <p className="auth-link-text">
                    Need an account? <Link to="/register">Register here</Link>
                </p>
            </section>
        </main>
    );
}

export default Login;