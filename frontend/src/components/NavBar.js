import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogOutButton from './LogoutButton';
import { Navbar,NavbarBrand,Collapse,Nav,NavLink } from 'reactstrap';

const NavBar = () => {
  const{user, isAuthenticated} = useAuth0();
  
    return (
        <Navbar color="light" expand="md" light>
            <NavbarBrand href="/">
                {isAuthenticated && user.name}
                {!isAuthenticated && 'Principal'}
            </NavbarBrand>
            <Collapse navbar>
                <Nav className="me-auto" navbar>
                    {isAuthenticated && user.nickname === 'administrador' && 
                        <Nav className="me-auto" navbar>
                            <NavLink href="/CargaMasiva">Carga Masiva </NavLink> 
                        </Nav>
                    }
                </Nav>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogOutButton />}
            </Collapse>
        </Navbar>
    );
}
export default NavBar;