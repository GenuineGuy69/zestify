import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';


import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AIChef from './pages/AIChef';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <PageTransitionWrapper />
    </Router>
  );
}

function PageTransitionWrapper() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<Home />} />
          <Route path="/add" element={<AIChef />} />
          <Route path="/favorites" element={<Home />} />
          <Route path="/profile" element={<Home />} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}

export default App;
