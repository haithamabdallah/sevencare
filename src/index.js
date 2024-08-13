import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n'; // Import the i18n setup file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import CategoryPage from "./components/categories/CategoryPage";
// import Page1 from './Page1'; // Example pages
// import Page2 from './Page2';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/category/:categorySlug" element={<CategoryPage />} />
                    {/*<Route path="/page1" element={<Page1 />} />
                    <Route path="/page2" element={<Page2 />} />*/}
                </Routes>
            </Layout>
        </Router>
    </React.StrictMode>
);
