import React from 'react';

const Register = () => {
    const handleRegister = () => {
        // Logic to handle registration
    };

    return (
        <div className="register-container">
            <img src="/path/to/logo.png" alt="Logo" className="logo" />
            <h2>Create a New Account</h2>

            <label htmlFor="mobile">Mobile Number</label>
            <div className="input-group">
                <span className="country-flag">🇺🇸 +1</span>
                <input type="tel" id="mobile" placeholder="Enter your mobile number" />
            </div>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" />

            <button className="register-button" onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
