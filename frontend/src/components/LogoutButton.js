import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'reactstrap';

const LogOutButton = () => {
    const {logout} = useAuth0();
    return <Button outline onClick={()=> logout({returnTo: window.location.origin})}> Logout </Button>
}
export default LogOutButton;