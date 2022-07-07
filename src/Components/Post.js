import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import moment from "moment";
import { updatePostRoute } from '../api/APIRoutes';

import { MoreVert } from "@material-ui/icons";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const Section = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  div.postDetails {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 10px;
    /* border: 1px solid black; */
  }

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }

  .postUsername {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
    font-weight: 600;
  }

  .postDate {
    font-size: 0.8rem;
  }
`;

const Center = styled.div`
margin: 20px 0;

img{
    margin-top: 20px;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
}

`;

const Bottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

div.likes{
    gap: 0.5rem;
}

div{
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

div.dislike{
    margin-right: 1rem;
}

svg{
    cursor: pointer;
}

`;

const Post = ({ post, currentUser }) => {
  const likes = (post.likes).length
  const [like,setLike] = useState(likes)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler = async () => {

    // likes,dislikes backend stuff🥴

    // const postId = post._id;
    // const currentUsername = currentUser.username;
    // const newArr = likes.push(currentUsername)
    // console.log("The new Array is :-" + newArr);
    // if (!(post.likes).includes(currentUsername)) {
    //   const { data } = await axios.post(`${updatePostRoute}/${postId}`, {
    //     id: postId,
    //     likesArr: newArr 
    //   });
    //   console.log({data});
    // }

    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  // fetch the posts id ^^
  // for updating --> get current users name,id ^^
  // after grabbing post, update the like array
  // add the user to like array
  // console.log(typeof([post.likes]));

  return (
    <Section>
      <Top>
        <div>
          <img src={post.profilePicture} alt="user1" />
          <div className="postDetails">
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <MoreVert />
      </Top>
      <Center>
      <span>{post.desc}</span>
      <img src={post.img} alt="postImg" />
      </Center>
      <Bottom>
      <div className="likes">
      <div>
      <ThumbUpIcon className="like" clicked={isLiked} onClick={likeHandler} />
      <span>{like} likes</span>
      </div>
      <div>
      <ChatBubbleOutlineOutlinedIcon/>
      <span>0 comments</span>
      </div>
      </div>
      <div className="dislike">
      <ThumbDownIcon/>
      </div>
      </Bottom>
    </Section>
  );
};

export default Post;

