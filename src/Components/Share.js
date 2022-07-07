import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FileBase64 from "react-file-base64";
import ImageIcon from "@mui/icons-material/Image";
import axios from 'axios';
import { createPostRoute } from '../api/APIRoutes'

const Section = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  
  div{
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    align-items: flex-start;
    justify-content: center;
  }
  
  h2{
    /* border: 1px solid red; */
    margin-top: 0.6rem;
    margin-bottom: 0rem;
  }
  
  p{
    /* border: 1px solid red; */
    margin: 0;
    margin-bottom: 0.4rem;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

  textarea {
    width: 90%;
    margin-bottom: 1rem;
    resize: none;
    font-size: 1.2rem;
    &:focus {
      outline: none;
    }
  }

  button {
    width: 3rem;
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: green;
    font-weight: 500;
    margin-right: 20px;
    cursor: pointer;
    color: white;
  }

  button.upload {
    width: 7rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Upload = styled.div`
    display: flex;
    align-items: center;
    svg {
      padding-right: 0.1em;
    }
`;

const Share = () => {
  const [pomst, setPomst] = useState({
    desc: "",
    img: "",
  });

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
  }, []);


  const handleChange = (e) => {
    setPomst({ ...pomst, [e.target.name]: e.target.value })
  } 
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(pomst);
    const userData = await JSON.parse(localStorage.getItem("super-reach-user"));
    const { data } = await axios.post(createPostRoute, {
      username: userData.username,
      profilePicture: userData.profilePicture,
      desc: pomst.desc,
      img: pomst.img,
    });
    console.log({data});
  };

  return (
    isLoading && <Section>
      <Top>
        <img src={currentUser.profilePicture} alt="user" />
        <div>
        <h2>{currentUser.username}</h2>
        <p>{currentUser.desc}</p>
        </div>
      </Top>
      <hr className="shareHr" />
      <Bottom>
        <form onSubmit={handleSubmit}>
          <textarea
            cols="30"
            rows="4"
            placeholder="Whats in your mind"
            name='desc'
            value={pomst.desc}
            onChange={(e) => handleChange(e)}
          />
          <Buttons>
            <Upload>
                <ImageIcon />
                <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setPomst({ ...pomst, img: base64 })} />
            </Upload>
            <button type="submit">Post</button>
          </Buttons>
        </form>
      </Bottom>
    </Section>
  );
};

export default Share;
