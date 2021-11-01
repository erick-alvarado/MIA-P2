import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import React from 'react';
import {BrowserRouter as Router, Route,Redirect,Switch} from 'react-router-dom';
import CargaMasiva from './pages/administrator/CargaMasiva';
//npm start

function App(){
  const{isLoading,isAuthenticated,user} = useAuth0();
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <Router>
      <NavBar/>
      <main>
        <Switch>
          {isAuthenticated && user.nickname ==='administrador'
            && <Route path="/CargaMasiva">
              <CargaMasiva/>
            </Route>
          }
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}
export default App;