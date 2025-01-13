import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import NavBar from './components/navbar/NavBar';
import UserTable from './components/user-table/UserTable';

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
    // Verificar el token al cargar el componente
    React.useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Si hay token, cambia el estado a true
    }, []);
  
    return (
      <Router>
        {/* Pasa el estado de autenticación al NavBar */}
        <NavBar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user-table" element={<UserTable />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;