const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <div className="d-flex justify-content-center alighn-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{minWidth: '300px'}}>
                <h3 className="text-center mb-4"> Login</h3>
            <form onSubmit={handleLogin}>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="form-control mb-3"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-control mb-2"
                />
                <button type="submit" className="btn btn-success">
                    Login
                </button>
            </form>
            </div>
        </div>
    );
};

export default LoginForm;