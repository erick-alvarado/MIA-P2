import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { Button } from 'reactstrap';

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
    return <Button outline onClick={()=> loginWithRedirect()}>  Login </Button>
}
export default LoginButton;