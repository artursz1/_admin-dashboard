import React, { useContext } from "react";
import * as Components from '../login/LoginComponents';
import { LoginContext } from '../../App';

import { useNavigate } from 'react-router-dom';
import supabaseClient from "../../data/supabaseClient";

const client = supabaseClient;

const handleCreateAccount = async () => {
    const username = document.querySelector('input[placeholder="username"]').value;
    const email = document.querySelector('input[placeholder="email"]').value;
    const password = document.querySelector('input[placeholder="password"]').value;

    if (username === '' || email === '' || !email.includes("@") || password === '') {
        alert("All fields are required");
        return;
    }

    try {
    await client.from('users').insert({
        username,
        email,
        password,
        rank: 1
    });
    } catch (error) {
    console.error(error);
    }
};

 function Login() {
    const [signIn, toggle] = React.useState(true);
    const navigate = useNavigate();

    let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    function handleSignIn() {
        console.log(isLoggedIn);

        navigate('/informations');
        setIsLoggedIn(true);
    }

      return(
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='username' />
                    <Components.Input type='email' placeholder='email' />
                    <Components.Input type='password' placeholder='password' />
                    <Components.Button onClick={handleCreateAccount}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input type='username' placeholder='username' />
                    <Components.Input type='password' placeholder='password' />
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Hi</Components.Title>
                    <Components.Paragraph>
                        To sign in please use your username and password
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                        Sign In
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                    <Components.Title>Hi</Components.Title>
                    <Components.Paragraph>
                        To register, enter your username, email and password.
                    </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton> 
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
      )
 }

 export default Login;
