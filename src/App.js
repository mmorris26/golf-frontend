import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CoursePage from './components/CoursePage';
import RoundPage from './components/RoundPage';
import RoundSummaryPage from './components/RoundSummaryPage';
import SummaryPage from './components/SummaryPage';

function App() {
  return (
    <div className='App'>  
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/SignUpPage' element={<SignUpPage />} />
        <Route path='/CoursePage' element={<CoursePage />} />
        <Route path='/RoundPage' element={<RoundPage />} />
        <Route path='/RoundSummaryPage' element={<RoundSummaryPage />} />
        <Route path='/SummaryPage' element={<SummaryPage />} />
      </Routes>
    </div>
  );
}

export default App;
