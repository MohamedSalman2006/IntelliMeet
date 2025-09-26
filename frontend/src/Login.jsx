import './Auth.css'

function Login({ onNavigate }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">IntelliMeet</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-form">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>

            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary full-width"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('dashboard');
                }}
              >
                Sign In
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="btn-google">
              <span className="google-icon"></span>
              Continue with Google
            </button>

            <div className="auth-footer">
              <p>
                Don't have an account? 
                <button 
                  onClick={() => onNavigate('register')} 
                  className="link-btn"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('home')} 
          className="back-btn"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default Login