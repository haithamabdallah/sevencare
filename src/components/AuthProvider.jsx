import { AuthProvider } from './AuthContext';

root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <CartProvider>
                    <Layout>
                        <Routes>
                            {/* Routes here */}
                        </Routes>
                    </Layout>
                </CartProvider>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
