import React, { useContext } from "react";
import * as Components from '../login/LoginComponents';
import { LoginContext, ManagerContext, RankColor, RankContext, UserContext } from '../../App';

import { useNavigate } from 'react-router-dom';
import supabaseClient from "../../data/supabaseClient";

const client = supabaseClient;

function clearRegisterInputFields() {
    document.querySelector('input[placeholder="register-username"]').value = '';
    document.querySelector('input[placeholder="register-email"]').value = '';
    document.querySelector('input[placeholder="register-password"]').value = '';
    document.querySelector('input[placeholder="register-rank"]').value = '';
}

function determineRankName(rank) {
    let _rankName = '';
    switch (rank) {
        case '6':
            _rankName = 'Psycho';
            break;
        case '5':
            _rankName = 'Dangerous';
            break;
        case '4':
            _rankName = 'Scareless';
            break;
        case '3':
            _rankName = 'Kamikaze';
            break;
        case '2':
            _rankName = 'Reckless';
            break;
        case '1':
            _rankName = 'Crazy';
            break;
        default:
            break;
    }

    return _rankName;
}

const handleCreateAccount = async (event) => {
    event.preventDefault();
    const username = document.querySelector('input[placeholder="register-username"]').value;
    const email = document.querySelector('input[placeholder="register-email"]').value;
    const password = document.querySelector('input[placeholder="register-password"]').value;
    const rank = document.querySelector('input[placeholder="register-rank"]').value;
    let existingUser = false;

    const isNumeric = /^\d+$/.test(rank);

    if (username === '' || email === '' || password === '' || rank === '') {
        alert("ERROR: All fields are required.");
        return;
    } else if(rank === '7') {
        alert("ERROR: There's only one Rank 7: JohnLennon.");
        return;
    } else if(rank < 1 || rank > 6 || !isNumeric) {
        alert("ERROR: Ranks can range from [1-6]");
        return;
    } else if (!email.includes("@")) {
        alert("ERROR: Invalid email.");
        return;
    } else {
        const checkIfUserExists = async () => {
            let { data: listOfUsers } = await client.from('users').select('*');
            return listOfUsers;
        }

        const result = await checkIfUserExists();
        for (let i = 0; i < result.length; i++) {
            if (result[i].username === username) {
                existingUser = true;
            }
        }
    
        if(existingUser) {
            alert('ERROR: Username already exists.');
        } else {
            try {
                await client.from('users').insert({
                    username,
                    email,
                    password,
                    rank,
                    rank_name: determineRankName(rank),
                    manager: false,
                });
            } catch (error) {
                console.error(error);
            }

            clearRegisterInputFields();
            alert('INFO: New account successfully created - you can log in now.');
        }
    }
};

 function Login() {
    const [signIn, toggle] = React.useState(true);

    const { setIsLoggedIn } = useContext(LoginContext);
    const { setLoggedInUsername } = useContext(UserContext);
    let { setRankName } = useContext(RankContext);
    let { setRankColor } = useContext(RankColor);
    let { setIsManager } = useContext(ManagerContext);

    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const _username = document.querySelector('input[placeholder="username"]').value;
        const _password = document.querySelector('input[placeholder="password"]').value;
    
        if (_username === '' || _password === '') {
          alert("ERROR: Both username and password are required");
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
                setRankName(res[i].rank_name);

                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('loggedInUsername', _username);
                localStorage.setItem('rankName', res[i].rank_name);
                
                switch (res[i].rank_name) {
                    case 'Founder':
                        localStorage.setItem('rankColor', '#ee0202');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    case 'Psycho':
                        localStorage.setItem('rankColor', '#fce306');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    case 'Dangerous':
                        localStorage.setItem('rankColor', '#1009d1');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    case 'Scareless':
                        localStorage.setItem('rankColor', '#946f09');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    case 'Kamikaze':
                        localStorage.setItem('rankColor', '#0c9e1a');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    case 'Reckless':
                        localStorage.setItem('rankColor', '#851280');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    case 'Crazy':
                        localStorage.setItem('rankColor', '#43756b');
                        setRankColor(localStorage.getItem('rankColor'));
                        break;
                    default:
                        break;
                }

                switch (res[i].manager) {
                    case false:
                        localStorage.setItem('isManager', false);
                        setIsManager(localStorage.getItem('isManager'));
                        break;
                    case true:
                        localStorage.setItem('isManager', true);
                        setIsManager(localStorage.getItem('isManager'));
                        break;
                    default:
                        break;
                }

                navigate('/informations');
                return;
            }
        }
        
        alert("ERROR: Incorrect username or password.");
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
                    <Components.Input type='text' placeholder='register-rank' />
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
