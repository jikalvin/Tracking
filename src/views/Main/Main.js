import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../providers/UserProvider';
import { auth } from '../../firebaseInit';
import Form from '../../components/Protected/Form';
import Checkout from '../../components/App/Checkout';
import Form1 from '../../components/App/Form1';

const StyledWrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  font-size: 1.1em;
  text-decoration: underline;
  cursor: pointer;
`;

export default function Main() {
  const { user } = useContext(UserContext);

  const handleSignOut = () => {
    auth.signOut()
  }

  return (
    <StyledWrapper>
      <h1>Hi {user.displayName}!</h1>
      <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
      {/* <Form /> */}
      {/* <Checkout /> */}
      <Form1 />
    </StyledWrapper>
  )
};