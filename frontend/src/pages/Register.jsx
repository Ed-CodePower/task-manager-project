import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Register(){
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        navigate("/");
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
                        placeholder="Enter your name"
                        required
                    />

                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
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