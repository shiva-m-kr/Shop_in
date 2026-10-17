import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./component/Nav";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import { UserDataContext } from "./context/UserContext";
import Ai from "./component/Ai";

function App() {
    const { userData } = useContext(UserDataContext);
    const location = useLocation();

    return (
        <>
            {userData && <Nav />}
            <Routes>
                <Route path="/login" element={userData ? (<Navigate to={location.state?.from || "/"} replace />) : (<Login />)} />
                <Route path="/signup" element={userData ? (<Navigate to={location.state?.from || "/"} replace />) : (<Registration />)} />
                <Route path="/" element={userData ? (<Home />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/about" element={userData ? (<About />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/collection" element={userData ? (<Collections />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/product" element={userData ? (<Product />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/product/:productId" element={userData ? (<ProductDetails />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/productDetails/:productId" element={userData ? (<ProductDetails />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/contact" element={userData ? (<Contact />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/cart" element={userData ? (<Cart />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/place-order" element={userData ? (<PlaceOrder />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/placeorder" element={userData ? (<PlaceOrder />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/orders" element={userData ? (<MyOrders />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/orders/:orderId" element={userData ? (<OrderDetails />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                <Route path="/profile" element={userData ? (<Profile />) : (<Navigate to="/login" state={{ from: location.pathname }} replace />)} />
                
            </Routes>
            <Ai/>
        </>
        
    );
}

export default App;