import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

const Section = styled.div`
  flex: 2.5;
  height: calc(100vh - 50px);
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;

  hr {
    height: 0.7px;
    width: 80%;
    /* background-color: black; */
  }
`;

const Details = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  margin-top: 1.25rem;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  /* border: 1px solid red; */

  img {
    width: 15rem;
    height: 17rem;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Credentials = styled.div`
  width: 80%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.4rem;
  /* border: 1px solid black; */

  h4 {
    font-weight: 300;
    font-size: 1.05rem;
  }

  h5 {
    font-weight: 200;
    text-decoration: underline;
  }
`;

const Info = styled.div`
  width: 80%;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* border: 1px solid black; */
  /* justify-content: center; */
`;

const InfoItem = styled.div`
  height: 2rem;
  
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* border: 1px solid red; */

  svg {
    padding-right: 0.5rem;
  }

  p{
    font-weight: 150;
  }
`;

export default function Sidebar() {
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

  return (
    isLoading && <Section>
      <Details>
        <img src={currentUser.profilePicture} alt="user" />
        <Credentials>
          <h4>Credential and Highlights</h4>
          <h5>More</h5>
        </Credentials>
        <hr />
        <Info>
          <InfoItem>
            <PersonIcon />
            <p>{currentUser.username}</p>
          </InfoItem>
          <InfoItem>
            <WorkIcon />
            <p>{currentUser.work}</p>
          </InfoItem>
          <InfoItem>
            <SchoolIcon />
            <p>{currentUser.school}</p>
          </InfoItem>
          <InfoItem>
            <SchoolIcon />
            <p>{currentUser.college}</p>
          </InfoItem>
        </Info>
      </Details>
    </Section>
  );
}
