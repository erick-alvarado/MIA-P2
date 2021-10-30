import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogOutButton from './LogoutButton';
import { Navbar,NavbarBrand,Collapse,Nav,NavItem,NavLink } from 'reactstrap';

const NavBar = () => {
  const{user, isAuthenticated} = useAuth0();
  let buttons;
  if(isAuthenticated){
    switch(user.nickname){
        case 'administrador':
            buttons = <Nav className="me-auto" navbar>
                            <NavLink href="/CargaMasiva">Carga Masiva </NavLink> 
                      </Nav>
            break;
        case 'coordinador':
            buttons = <Nav className="me-auto" navbar>
            <NavItem> 
                <NavLink href="/components/">Administracion de planilla </NavLink> 
            </NavItem>
            </Nav>
            break;
        case 'revisor':
            buttons = <Nav className="me-auto" navbar>
                        <NavItem> 
                            <NavLink href="/components/">Aplicantes </NavLink> 
                        </NavItem>
                        <NavItem> 
                            <NavLink href="/components/"> Revisor expedientes </NavLink>
                        </NavItem>
                </Nav>
            break;
        default:
            break;
      }
  }
  
  return (
      <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">
              {isAuthenticated && user.name}
              {!isAuthenticated && 'Principal'}
          </NavbarBrand>
          <Collapse navbar>
              <Nav className="me-auto" navbar>
                      {buttons}
              </Nav>
              {!isAuthenticated && <LoginButton/>}
              {isAuthenticated && <LogOutButton/>}
          </Collapse>
      </Navbar>
  );
}
export default NavBar;