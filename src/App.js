import './App.css';
import Home from './pages/home/Home';
import AboutUs from './pages/AboutUs/about';
import Contact from './pages/ContactUs/contact';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './pages/Footer/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login/Login';
import { useAuth } from './Context/Auth';
import ViewProduct from './pages/Product/viewProduct';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>

      {user && <Navbar />}

      <Routes>

        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/about" 
          element={user ? <AboutUs /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/contact" 
          element={user ? <Contact /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />

        <Route
          path='/product/:id'
          element={!user ? <Login /> : <ViewProduct />}
        />



      </Routes>

      {user && <Footer />}

    </BrowserRouter>
  );
}

export default App;
