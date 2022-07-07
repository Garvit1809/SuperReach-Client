import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';


function App() {
  return (
    <Routes>
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
