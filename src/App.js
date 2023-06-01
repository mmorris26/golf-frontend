import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <div className='App'>  
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/SignUpPage' element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
