import React, { useContext } from "react";
import * as Components from '../login/LoginComponents';
import { LoginContext, UserContext } from '../../App';

import { useNavigate } from 'react-router-dom';
import supabaseClient from "../../data/supabaseClient";

const client = supabaseClient;

const handleCreateAccount = async () => {
    const username = document.querySelector('input[placeholder="register-username"]').value;
    const email = document.querySelector('input[placeholder="register-email"]').value;
    const password = document.querySelector('input[placeholder="register-password"]').value;

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

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { loggedInUsername, setLoggedInUsername } = useContext(UserContext);

    console.log('Is logged in(Login): ', isLoggedIn);
    console.log('Logged in username(Login): ', loggedInUsername);

    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const _username = document.querySelector('input[placeholder="username"]').value;
        const _password = document.querySelector('input[placeholder="password"]').value;
    
        if (_username === '' || _password === '') {
          alert("Both username and password are required");
          return;
        }
    
        async function fetchUsers() {
            let { data: users } = await client.from('users').select('*');
            
            return users;
        }

        fetchUsers().then(res => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].username === _username && res[i].password === _password) {
                setIsLoggedIn(true);
                setLoggedInUsername(_username);
                navigate('/informations');
                return;
            }
        }
        
        alert("Incorrect username or password");
        return;
        });
    };

      return(
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='register-username' />
                    <Components.Input type='email' placeholder='register-email' />
                    <Components.Input type='password' placeholder='register-password' />
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
