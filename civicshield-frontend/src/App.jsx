import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import PortalSelection from "./pages/PortalSelection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";


function Home() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "CITIZEN") {
        return <Navigate to="/citizen" replace />;
    }

    if (token && role === "AUTHORITY") {
        return <Navigate to="/authority" replace />;
    }

    return <Navigate to="/portal" replace />;
}


/* ================================
   PROTECTED CITIZEN ROUTE
================================ */

function CitizenRoute() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login?role=citizen" replace />;
    }

    if (role !== "CITIZEN") {

        if (role === "AUTHORITY") {
            return <Navigate to="/authority" replace />;
        }

        return <Navigate to="/portal" replace />;
    }

    return <CitizenDashboard />;
}


/* ================================
   PROTECTED AUTHORITY ROUTE
================================ */

function AuthorityRoute() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login?role=authority" replace />;
    }

    if (role !== "AUTHORITY") {

        if (role === "CITIZEN") {
            return <Navigate to="/citizen" replace />;
        }

        return <Navigate to="/portal" replace />;
    }

    return <AuthorityDashboard />;
}


/* ================================
   APP
================================ */

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* ROOT */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* PORTAL SELECTION */}

                <Route
                    path="/portal"
                    element={<PortalSelection />}
                />


                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* REGISTER */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* CITIZEN */}

                <Route
                    path="/citizen"
                    element={<CitizenRoute />}
                />


                {/* AUTHORITY */}

                <Route
                    path="/authority"
                    element={<AuthorityRoute />}
                />


                {/* ADMIN NOT USED */}

                <Route
                    path="/admin"
                    element={<Navigate to="/portal" replace />}
                />


                {/* UNKNOWN ROUTE */}

                <Route
                    path="*"
                    element={<Navigate to="/portal" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;