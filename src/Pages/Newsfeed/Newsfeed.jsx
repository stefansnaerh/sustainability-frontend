import React, { useEffect, useState } from 'react'
import CategoryItemsService from '../../Services/categoryitems.service';
import PostService from '../../Services/post.service';
import "./Newsfeed.scss"
import heartRed from '../../images/heartRed.svg'
import cameraIcon from '../../images/cameraIcon.svg'
import heartWhite from '../../images/whiteHeart.svg'

import PostPopup from '../../Components/PostPopup/PostPopup';

function Newsfeed() {

  const urlImage = 'http://localhost:8080/public/images/'

  const [showPostPopup, setShowPostPopup] = useState(false)


  let postData;
  const [items, setItems] = useState({
    posts: "",
    userData: ""
    
  });
    const getEverything = () => {
        PostService.getAll().then((response) => {
            
          setItems({...items, posts: response.data, userData: 0})
            console.log(items);

        }).catch((e) => {
            console.log(e)
        });
         
    }

    useEffect(() => {
      
        getEverything();
       

    }, []);
    console.log(items);
  return (
    <section className='newsfeed-container'>
       <h1>Newsfeed</h1>
       {sessionStorage.getItem("userId") ?
        <button className='post-button' onClick={() => {setShowPostPopup(true)}}>
          <p>Post your help to <br/> the planet now!</p>
          <img src={cameraIcon}/>
        </button>: null}
       {items.posts ? (<>
                
                {items.posts.map((post, index) => {
                  console.log(post)
                  return (
                <article key={index}>
                  <div className='user-container'>
                    <img src={urlImage + post.user.image} alt="profile" />
                    <p>@{post.user.username}</p>
                    </div>
                  <img className='post-image' src={urlImage + post.image}  alt="post image" />
                  <div className='likes-location-container'>
                    <div className='like-container'>
                      <img src={heartWhite}/>
                      <p>{!post.likes ? 0 : post.likes} Likes</p>
                    </div>
                    <p>📍 @{!post.location ? "Unknown" : post.location}</p> 
                  </div>
                  <div className='points-container'>
                    <h2> {post.userId == sessionStorage.getItem('userId') ? "You " : post.user.username} just got {post.categoryitem.points} points for {post.categoryitem.action}</h2> 
                  </div>
            </article>
                )}
                 ) }
            </>) : <h2>No posts yet??? </h2>}
            {showPostPopup ? (
              <PostPopup
              setShowPostPopup={setShowPostPopup}/>
            ): null}

    </section>
  )
}

export default Newsfeed