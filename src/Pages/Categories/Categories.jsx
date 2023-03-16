import "./Categories.scss";
import CategoryService from "../../Services/category.service";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";



const Categories = () => {

    const [categories, setCategories] = useState([])
    const navigator = useNavigate();

    const urlImage = 'http://localhost:8080/public/images/'

    const getCategories = () => {
        CategoryService.getAll().then(response => {
            setCategories(response.data);
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <section className="category-container">
            <h1>Categories</h1>
            {categories.map((category, index) =>{
             return (
                <NavLink to={`/itempage/${category.id}/${category.name}`}>
                    <article >
                        <img src={urlImage + category.image}/>
                        <div className="item-name-container">
                            <h2>{category.name}</h2>
                        </div>  
                    </article>
                </NavLink>

             )
            }
            )}
        </section>
    )
}


export default Categories