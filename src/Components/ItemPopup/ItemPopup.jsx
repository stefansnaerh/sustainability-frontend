
import './ItemPopup.scss'

import stockphoto from '../../images/restaurantStockphoto.jpg'
import taskTree from '../../images/taskTree.svg'
import pointsLeaf from '../../images/pointsLeaf.svg'
import { useEffect, useState } from 'react'
import CategoryItemsService from '../../Services/categoryitems.service'

import PostPopup from '../PostPopup/PostPopup'

const ItemPopup = (props) => {

  const [categoryItem, setCategoryItem] = useState([]);
  const [showPostPopup, setShowPostPopup] = useState(false)
  let { id } = props;
  const urlImage = 'https://sustainability-backend2.onrender.com/public/images/'

  const getCatItem = () => {
    CategoryItemsService.get(id).then((response) => {
      setCategoryItem(response.data);
      
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(() => {
    getCatItem();
  }, []);

  return (
    <>
      {!!categoryItem ?
        <section className='popup-container'>
          <p className='bee-good'>Be Good at..</p>
          <h1>{categoryItem.name}</h1>
          <img className='item-photo' alt='attraction' src={urlImage + categoryItem.image} />

          <img
            alt='BY DOING THIS TASK YOU ARE HELPING THE WORLD BY SUPPORTING THESE UN WOLRD GOALS >'
            className='task-tree'
            src={taskTree}
          />

          <div className='points-leaf-container'>
            <p>{categoryItem.points}p</p>
          </div>
          <div className='location-info-button-container'>
            <p>{categoryItem.type}</p>
            {categoryItem.tags ? categoryItem.tags.split('.').map((tag, index) => (
              <p key={index}>{tag.trim()}</p>
            )) : <p>{categoryItem.tags}</p>}
          </div>
          <div className='container-buttons'>
            {sessionStorage.getItem('userId') ? <button onClick={() => setShowPostPopup(true)}>Post your efforts</button> : null}
            <a href="https://www.globalgoals.org/goals/">
              <button>See the Global Goals</button>
            </a>
          </div>

        </section>
        : null}
      {showPostPopup ? (
        <PostPopup
          setShowPostPopup={setShowPostPopup} />
      ) : null}
    </>
  )
}

export default ItemPopup