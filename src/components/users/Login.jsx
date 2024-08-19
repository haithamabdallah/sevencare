import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';

const Login = () => {
    const { t, i18n } = useTranslation();
    const [loginMethod, setLoginMethod] = useState('mobile');
    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [countryCode, setCountryCode] = useState('us');
    const [errorMessage, setErrorMessage] = useState('');

    // Automatically detect user's country based on IP
    useEffect(() => {
        axios.get('https://ipapi.co/json/')
            .then(response => {
                const countryCode = response.data.country_code.toLowerCase();
                setCountryCode(countryCode);
            })
            .catch(error => {
                console.error("Could not fetch user's country", error);
            });
    }, []);

    const handleLoginMethodChange = () => {
        setLoginMethod(loginMethod === 'mobile' ? 'email' : 'mobile');
        setShowPassword(false);
        setMobileOrEmail('');
        setErrorMessage('');
    };

    const handlePhoneNumberChange = (value) => {
        setMobileOrEmail(value);
        setErrorMessage('');
    };

    const handleLogin = () => {
        // Logic to validate the mobile number or email
        if (validateMobileNumber(mobileOrEmail)) {
            setShowPassword(true);
        } else {
            setErrorMessage('Invalid mobile number. Please try again.');
        }
    };

    const validateMobileNumber = (number) => {
        // Add your validation logic here. For simplicity, assuming any number is valid
        return number.length >= 10;
    };

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <>
            <div className="max-w-[960px] mx-auto language-only my-[20px] border-01">
                {i18n.language === 'en' ? (
                    <button className="border-solid border border-gray-300 rounded py-[5px] px-[10px] flex justify-center items-center" onClick={() => handleChangeLanguage('ar')}>العربية</button>
                ) : (
                    <button className="border-solid border border-gray-300 rounded py-[5px] px-[10px] flex justify-center items-center" onClick={() => handleChangeLanguage('en')}>English</button>
                )}
            </div>

            <div className="max-w-[960px] bg-white rounded mx-auto p-[20px]">
                <div className="flex justify-center items-center flex-col">
                    <div className="max-w-[200px] max-h-[90px] mx-auto">
                        <a href="/" className="flex justify-center items-center">
                            <img src="/images/logo/logo.png" alt="Logo" className="logo" />
                        </a>
                    </div>
                    <h2>{loginMethod === 'mobile' ? 'Login with your mobile number' : 'Login with your email'}</h2>

                    {loginMethod === 'mobile' ? (
                        <div className="py-[30px]">
                            <label htmlFor="mobileOrEmail">Mobile Number</label>
                            <PhoneInput
                                country={countryCode}
                                value={mobileOrEmail}
                                onChange={handlePhoneNumberChange}
                                inputProps={{
                                    name: 'mobileOrEmail',
                                    required: true,
                                    autoFocus: true,
                                }}
                            />
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="mobileOrEmail">Email</label>
                            <input
                                type="email"
                                id="mobileOrEmail"
                                value={mobileOrEmail}
                                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                                placeholder="Enter your email"
                            />
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>
                    )}

                    {showPassword && (
                        <div className="password-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" />
                        </div>
                    )}

                    <button className="login-button" onClick={handleLogin}>Login</button>



                    <div className="remember-me">
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">{t('headers.remember-me')}</label>
                    </div>

                    <div className="links">
                        <a href="/forgot-password">Forget password?</a>
                        <a href="/register" className="create-account-link">Create account</a>
                        <button className="login-method-link" onClick={handleLoginMethodChange}>
                            {loginMethod === 'mobile' ? 'Login via email' : 'Login via mobile number'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
