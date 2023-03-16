import React, { useEffect, useState } from 'react'

import './Leaderboard.scss'

import firstPlace from '../../images/1stplace.svg'
import secondPlace from '../../images/2ndplace.svg'
import thirdPlace from '../../images/3rdplace.svg'
import userImageTest from '../../images/userImageTest.jpg'
import UserService from '../../Services/user.service.jsx'
import { NavLink } from 'react-router-dom'

function Leaderboard() {

  const urlImage = 'http://localhost:8080/public/images/'
  const [topTen, setTopTen] = useState([]);

  useEffect(() => {
    getTop();
  }, []);

  const getTop = () => {
    UserService.getTopTen().then((response) => {
      setTopTen(response.data);
      console.log(response.data)
    }).catch((e) => {
      console.log(e);
    })
  }



  return (

    <>
      {topTen.length >= 3 ?
        <section className='leaderboard-container'>
          {console.log(topTen)}
          <h1>Leaderboard</h1>
          <div className='first-place-container'>
            <img className='first-place-medal' src={firstPlace} />
            <img className='first-place-image' src={urlImage + topTen[0].image} />
            <div className='points-container'>
              <p className='username'>@{topTen[0].username}</p>
              <p className='points'>{topTen[0].points} pts</p>
            </div>
          </div>
          <div className='second-third-place-container'>
            <div className='second-place-container'>
              <img className='second-place-medal' src={secondPlace} />
              <img className='second-place-image' src={urlImage + topTen[1].image} />
              <div className='points-container'>
                <p className='username'>@{topTen[1].username}</p>
                <p className='points'>{topTen[1].points} pts</p>
              </div>
            </div>
            <div className='second-place-container'>
              <img className='second-place-medal' src={thirdPlace} />
              <img className='second-place-image' src={urlImage + topTen[2].image} />
              <div className='points-container'>
                <p className='username'>@{topTen[2].username}</p>
                <p className='points'>{topTen[2].points} pts</p>
              </div>
            </div>
          </div>



          {topTen.map((user, index) => {
            if (index > 2) {
              return (
                <div className='remaining-container'>
                  <div>
                    <p>{index + 1}th</p>
                    <img src={urlImage + user.image} />
                    <p>@{user.username}</p>
                    <p>{user.points} pts</p>
                  </div>
                </div>
              );
            }
          })
          }
        </section >
        : <section className='leaderboard-container-error'>
          <h1>Leaderboard</h1>
          <h2>Nothing to see here</h2>
          <h2>Maybe because there are not enough users</h2>
          <NavLink to={'/'}>
            <button className='sign-out-btn'>Go Back</button>
          </NavLink>
        </section>}


    </>


  )
}

export default Leaderboard