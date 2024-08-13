import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-content max-w-[1230px] mx-auto px-[20px]">
                    <div className="footer-cols">
                        {/* Follow Us */}
                        <div className="footer-col">
                            <h4>Follow Us</h4>
                            <div className="social-icons">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>

                        {/* Guest's Services */}
                        <div className="footer-col">
                            <h4>Guest's Services</h4>
                            <div className="footer-sub-cols">
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    <a href="#">Terms & Conditions</a>
                                </div>
                                <div>
                                    <a href="#">Contact Us</a>
                                    <a href="#">About Us</a>
                                </div>
                            </div>
                        </div>

                        {/* Shop With NahdiOnline */}
                        <div className="footer-col">
                            <h4>Shop With NahdiOnline</h4>
                            <a href="#">Delivery Information</a>
                            <a href="#">Exchange and Return</a>
                            <a href="#">Store Locator</a>
                        </div>

                        {/* Nahdi Medical Company */}
                        <div className="footer-col">
                            <h4>Nahdi Medical Company</h4>
                            <a href="#">About Us</a>
                            <a href="#">Corporate Website</a>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="footer-copyright">
                <div className="max-w-[1230px] mx-auto px-[20px]">
                    <p>©2022 Nahdi. All rights reserved.</p>
                </div>
            </div>
        </>
    );
};

export default Footer;
