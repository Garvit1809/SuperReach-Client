import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';

import "@fontsource/alex-brush";

const Section = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;

  h1 {
    font-family: "Alex Brush", cursive;
    margin-left: 3rem;
    font-size: 3rem;
    font-weight: 300;
  }
`;

const MenuItems = styled.ul`
  display: flex;
  flex-direction: row;
  margin-right: 4rem;

  h2{
      font-weight: 100;
  }
  `;

const Home = styled.h2`
margin: 1.2rem;
font-weight: 100;
padding-right: 1rem;
border-right: 2px solid black;
`

const UserDetail = styled.div`
width: auto;
display: flex;
align-items: center;
justify-content: space-between;
margin-right: 1rem;
gap: 0.4rem;
/* border: 1px solid red; */

img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
}
`

const Icons = styled.div`
display: flex;
align-items: center;
gap: 1rem;
/* border: 1px solid red; */

svg{
    cursor: pointer;
}
`

const Navbar = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (localStorage.getItem("super-reach-user")) {
        setCurrentUser(await JSON.parse(localStorage.getItem("super-reach-user")));
        setIsLoading(true)
      }
    }
    fetchUserData();
  }, [])
  
  // console.log(currentUser);

  return (
      isLoading && <Section>
      <h1>SuperReach</h1>
      <MenuItems>
      <Home>Home</Home>
      <UserDetail>
      <img src={currentUser.profilePicture} alt="user" />
      <h2>{currentUser.username}</h2>
      </UserDetail>
      <Icons>
      <NotificationsIcon fontSize="large" />
      <MessageIcon fontSize="large" />
      </Icons>
      </MenuItems>
      </Section>
  );
};

export default Navbar;
