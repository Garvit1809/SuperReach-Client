import React from 'react'
import styled from 'styled-components'
import post1 from '../assets/post/1.jpg'
import post2 from '../assets/post/2.jpg'
import post3 from '../assets/post/3.jpg'
import post4 from '../assets/post/4.jpg'

const Section = styled.div`
  flex: 2.5;
  height: calc(70vh - 50px);
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;

  hr {
    height: 0.7px;
    width: 80%;
  }

  p{
    padding-left: 2.4rem;
    /* border: 1px solid black; */

    span{
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const Photos = styled.div`
  width: 90%;
  /* display: flex; */
  flex-direction: column;
  /* align-items: center; */
  /* border-radius: 25px; */
  margin-top: 1.25rem;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`

const Heading = styled.h1`
font-weight: 400;
padding-left: 1.5rem;
margin-bottom: 0.7rem;
/* border: 1px solid red; */
`

const Images = styled.div`

display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
cursor: pointer;

img{
  width: 100px;
  height: 100px;
}

.lastPic{
  filter: blur(4px);
  -webkit-filter: blur(4px);
}
`

const RightBar = () => {
  return (
    <Section>
    <Photos>
    <Heading>Photos</Heading>
    <hr />
    <Images>
    <img src={post1} alt="post1" />
    <img src={post2} alt="post2" />
    <img src={post3} alt="post3" />
    <img src={post4} alt="post4" className='lastPic'/>
    </Images>
    <p>See more <span>here</span></p>
    </Photos>
    </Section>
  )
}

export default RightBar