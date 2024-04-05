import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Regester from './pages/regester/Regester';
import Header from './compentes/Header';
import Transaction from './pages/transaction/Trasaction';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';
import NotFond from './pages/notFond/NotFond';
import LoginRegester from './auth/LoginRegester';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={< Transaction />} />
        <Route path="/profile" element={< Profile />} />

        <Route element={< LoginRegester />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={< Regester />} />
        </Route>


        <Route path="/admin" element={< Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={< NotFond />} />



        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

      {/* <Footer /> */}

    </Router>
  );
}

export default App;
