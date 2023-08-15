import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import { UserContext } from "../../providers/UserProvider";
// import { navigate } from '@reach/router';
import { auth, googleProvider } from '../../firebaseInit';
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (user) navigate('/create', { replace: true });
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <StyledButton onClick={() => auth.signInWithPopup(googleProvider)}>Login with Google</StyledButton>
    </Box>
  )
}