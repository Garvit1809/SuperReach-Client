import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Post from './Post'
import Share from './Share'
import axios from 'axios';
import { getAllPostRoute } from '../api/APIRoutes'

const Section = styled.div`
flex:5.5;
padding: 20px;
/* min-height: 100vh; */
`

const AllPosts = styled.div`
margin: 0;
padding: 0;
display: flex;
flex-direction: column-reverse;
`

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("super-reach-user")) {
        setCurrentUser(await JSON.parse(localStorage.getItem("super-reach-user")));
        console.log("here");
        const { data } = await axios.get(getAllPostRoute);
        setPosts(data)
        setIsLoading(true)
      }
    }
    fetchData();
  }, [])
  
  return (
    isLoading && <Section>
    <Share/>
    <AllPosts>
    {
      posts.map((post,index) => (
        <Post key={index} post={post} currentUser={currentUser} />
        ))
      }
    </AllPosts>
    </Section>
  )
}

export default Feed