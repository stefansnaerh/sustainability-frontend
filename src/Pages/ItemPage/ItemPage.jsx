import './ItemPage.scss'
import { useEffect, useState } from 'react'
import stockPhoto from '../../images/restaurantStockphoto.jpg'
import ItemPopup from '../../Components/ItemPopup/ItemPopup'
import { useParams } from 'react-router-dom'
import CategoryItemsService from '../../Services/categoryitems.service'

const ItemPage = ({ isHamburgerOpen }) => {
    const urlImage = 'http://localhost:8080/public/images/'
    let { id } = useParams();
    let { name } = useParams();
    const [items, setItems] = useState([]);

    const getCategoryItems = () => {
        CategoryItemsService.getByCategory(id).then((response) => {
            console.log(response.data);
            setItems(response.data)

        }).catch((e) => {
            console.log(e)
        });
    }

    const setStates = (pop) =>{
        setShowItemPopup(pop)
        setBlackOut(pop)
    }

    const [showItemPopup, setShowItemPopup] = useState(false)
    const [blackOut,setBlackOut] = useState(false);

    useEffect(() => {
        getCategoryItems();
    }, []);
    console.log(document.getElementsByClassName('popup-container')[0]);
    return (
        < >
            <section className={showItemPopup? "for-blackout item-page-container": "item-page-container"} onMouseMoveCapture={() => setStates(false)}>
                {!isHamburgerOpen ? (<>
                    <h1>{name}</h1>
                    {items.map((categoryItem, index) =>

                        <div className='text-image-container' onClick={() => setStates(true)}>
                            <img src={urlImage + categoryItem.image} onClick={() => setShowItemPopup(true)} />
                            <div>
                                <span className='item-name-container'>
                                    <h2>{categoryItem.name}</h2>

                                </span>
                            </div>
                        </div>
                    )}
                </>) : null}
            </section>
            {showItemPopup ? (
                    <>
                        {items.map((categoryItem, index) =>
                            <ItemPopup id={categoryItem.id} />
                        )}
                    </>
                ) : null}
        </>

    )
}

export default ItemPage