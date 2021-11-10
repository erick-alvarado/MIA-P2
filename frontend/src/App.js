import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import React from 'react';
import {BrowserRouter as Router, Route,Redirect,Switch} from 'react-router-dom';
import CargaMasiva from './pages/administrator/CargaMasiva';
import Usuarios from './pages/administrator/Usuario';
import Principal from './pages/guest/Principal';
import Expediente from './pages/reclutador/Expediente';
import Planilla from './pages/coordinador/Planilla';
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
          {isAuthenticated && user.nickname === 'administrador' &&
            <>
              <Route path="/CargaMasiva">
                <CargaMasiva />
              </Route>
              <Route path="/Usuarios">
                <Usuarios />
              </Route>

            </>
          }
          {isAuthenticated && user.nickname === 'coordinador' &&
            <>
              <Route path="/Planilla">
                <Planilla user = {user.name} />
              </Route>

            </>
          }
          {isAuthenticated && user.nickname === 'reclutador' &&
            <>
              <Route path="/Expediente">
                <Expediente user = {user.name} />
              </Route>

            </>
          }
          {!isAuthenticated &&
            <>
              <Route path="/Principal">
                <Principal />
              </Route>

            </>
          }
          <Redirect to="/" />

        </Switch>
      </main>
    </Router>
  );
}
export default App;