import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { connect } from "react-redux";
import NavBar from './components/NavBar.jsx';
import PrivateNav from './components/PrivateNav.jsx';
import LoginPage from './views/LoginPage.jsx';
import RegisterPage from './views/RegisterPage.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import PrivatePageOne from './views/PrivatePageOne.jsx';
import PrivatePageTwo from './views/PrivatePageTwo.jsx';
import Landing from './views/Landing.jsx';
import PrivatePageThree from './views/PrivatePageThree.jsx';
import authAPI from './utils/API/authAPI.js';
import './App.css';

const App = (props) => {


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      authAPI.checkAuth()
    }
  }, [])




  return (
    <div className='app'>
      <div className="background"></div>
      <Routes>
        {/* <Route element={<NavBar />}> */}
        <Route path='/' element={<Landing />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        {/* </Route> */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<PrivateNav />}>
            <Route path='/private-one' element={<PrivatePageOne />} />
            <Route path='/private-two' element={<PrivatePageTwo />} />
            <Route path='/private-three' element={<PrivatePageThree />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, null)(App);

