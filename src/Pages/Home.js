import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import RightBar from "../Components/RightBar";
import Feed from "../Components/Feed";
import Sidebar from "../Components/Sidebar";

const Section = styled.div`
display: flex;
width: 100%;
min-height: 200vh;
`;

const Home = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Sidebar />
        <Feed />
        <RightBar />
      </Section>
    </>
  );
};

export default Home;
