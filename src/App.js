import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CoursePage from './components/CoursePage';

function App() {
  return (
    <div className='App'>  
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/SignUpPage' element={<SignUpPage />} />
        <Route path='/CoursePage' element={<CoursePage />} />
      </Routes>
    </div>
  );
}

export default App;
