import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/Auth.css";

function Register(){
    const navigate = useNavigate();

    const [formData, setFormData ] = useState({
        name: "",
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

        const data = await registerUser(formData);

        if(data.message){
            alert("Registered successfully!")
            navigate("/");
        }
        else{
            alert("Registration failed");
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card" aria-labelledby="register-heading">
                <h1 id="register-heading">Register</h1>
                <p>Create an account to manage your tasks.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="register-name">Name</label>
                    <input
                        id="register-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Register</button>
                </form>

                <p className="auth-link-text">
                    Already have an account? <Link to="/">Back to login</Link>
                </p>
            </section>
        </main>
    );
}

export default Register;