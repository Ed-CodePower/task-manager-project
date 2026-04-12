import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"

function Login() {
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();

        navigate("/dashboard");
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
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="login-password">Password</label>
                    <input 
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
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