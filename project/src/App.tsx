// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { Groups } from "./pages/Groups";
import { Events } from "./pages/Events";
import axios from "axios";
import { Profile } from "./pages/Profile";
import { CreateEvents } from "./pages/CreateEvents";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.baseURL = `http://localhost:8000/api`;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register/:eventId" element={<RegisterForm />} />

            {/* Restrict /create-events route to "admin" users only */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/create-events" element={<CreateEvents />} />
            </Route>

            {/* Unauthorized page */}
            <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
