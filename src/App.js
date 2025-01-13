import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
