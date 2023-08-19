import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { UserContext } from "../../providers/UserProvider";
// import { navigate } from '@reach/router';
import { auth, googleProvider } from '../../firebaseInit';
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid } from '@material-ui/core';

const StyledButton = styled.button`
  margin: 20px;
  border: 3px solid black;
  background: none;
  position: relative;
  padding: 13px;
  font-weight: bold;
  font-size: 1em;
  transition: color .3s ease-out;

  &::after {
    content: '';
    top: 0;
    left: 0;
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color:darkorchid;
    transform: scaleX(0);
    transition: transform .3s ease-out;
  }

  &:hover {
    color: white;
    cursor: pointer;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export default function Login() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('signIn');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTypeSignIn = () => {
    setType("signUp")
  };
  const handleTypeSignUp = () => {
    setType("signIn")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    if(type === 'signIn'){
      try {
        await auth.signInWithEmailAndPassword(username, password);
        setLoading(false)
        navigate("/create")
      } catch (error) {
        console.log(error);
        alert(error)
        setLoading(false)
      }
    }else{
      try {
        await auth.createUserWithEmailAndPassword(username, password)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
        alert(error)
      }
    }
  };

  useEffect(() => {
    if (user) navigate('/create', { replace: true });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{height: "100vh"}}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            type="password"
          />
          <Button disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
            {type === 'signIn' ? 'Log In ' : 'Sign Up '}
            {loading && 'Loading ...'}
          </Button>
          <Typography>
            {type === 'signIn' ? <Typography>
              Don't yet have an account? <a onClick={handleTypeSignIn} style={{cursor: "pointer", color:"green"}}>Sign Up</a>
            </Typography> : <Typography>
              Already have an account? <a onClick={handleTypeSignUp} style={{cursor: "pointer", color:"green"}}>Sign In</a>
              </Typography>}
          </Typography>
        </Grid>
      </Grid>
    </form>
  )
}