import logo from './logo.svg';
import './App.css'
import UserSignUpPage from './Pages/UserSingUpPage';
import * as apiCalls from "./API/apiCalls"
import  LoginPage  from './Pages/LoginPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import MainHeader from './Components/MainHeader';
import OtherPage from './Pages/OtherPage';
import HomePage from './Pages/HomePage';


function App() {


  const actions = {
    postLogin :apiCalls.login,
    postSingUp : apiCalls.signUp,
  }
  
  return (
    
   <BrowserRouter>
      <MainHeader/>
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/other" element= {<OtherPage/>} />
        <Route path="/login" element= {<LoginPage actions={actions}/>} />
        <Route path="/signup" element= {<UserSignUpPage actions={actions}/>} />
      </Routes>
   </BrowserRouter>
    
  );
}

export default App;
