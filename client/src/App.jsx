import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import VersionsPage from './pages/VersionsPage';
import TemplatesPage from './pages/TemplatesPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/home"
        element={<HomePage />}
      />
      <Route
        path="/templates"
        element={<TemplatesPage />}
      />
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
      <Route
        path="/builder/:id"
        element={<BuilderPage />}
      />
      <Route
        path="/versions/:id"
        element={<VersionsPage />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
