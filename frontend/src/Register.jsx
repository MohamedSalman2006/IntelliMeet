import './Auth.css'

function Register({ onNavigate }) {
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
            <h1>Create Account</h1>
            <p>Join IntelliMeet today</p>

            <form className="register-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Choose a username"
                  required 
                />
              </div>

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
                  placeholder="Create a password"
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
                Create Account
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="btn-google">
              <span className="google-icon"></span>
              Sign up with Google
            </button>

            <div className="auth-footer">
              <p>
                Already have an account? 
                <button 
                  onClick={() => onNavigate('login')} 
                  className="link-btn"
                >
                  Login
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

export default Register