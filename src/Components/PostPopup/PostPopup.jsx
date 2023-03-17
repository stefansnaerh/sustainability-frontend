import React, { useEffect, useState } from 'react'
import CategoryService from '../../Services/category.service';
import CategoryItemsService from '../../Services/categoryitems.service';
import PostService from '../../Services/post.service';
import "./PostPopup.scss"

function PostPopup({setShowPostPopup}) {
  const initialPostState = {
    id: null,
    location: "",
    image: "",
    userId: sessionStorage.getItem('userId'),
    categoryId: null,
    categoryitemId: null,
  };

  const [imgSrc, setImgSrc] = useState("https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg");
  const [post, setPost] = useState(initialPostState);
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleInputFileChange = event => {

    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImgSrc(reader.result);
    };



    setPost({ ...post, image: file });
  }

  const onSubmit = (event) => {
    alert("Wait.. We are just publishing your post. It may take a minute")
    event.preventDefault();

    const params = {
      image: event.target.image.files[0],
      location: event.target.location?.value,
      categoryId: event.target.categoryId?.value,
      categoryitemId: event.target.categoryitemId?.value,
      userId: sessionStorage.getItem('userId'),
      
    }
    

    PostService.create(params).then((response) => {
      
      window.location.reload()
      
    }).catch(e => {
      console.log(e);
    });
    setShowPostPopup(false)
    
  }

  const getCategories = () => {
    CategoryService.getAll().then((response) => {
      setCategories(response.data);
    }).catch((e) => {
      console.log(e);
    })
  }

  const getCategoryitems = (categoryId) => {
    CategoryItemsService.getByCategory(categoryId)
      .then((response) => {
        setCategoryItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (post.categoryId) {
      getCategoryitems(post.categoryId);
    }
  }, [post.categoryId]);


  return (


      <div class="modal">
        <h1>Share your contribution to the planet!</h1>
        <form onSubmit={onSubmit} >

          <select className="form-control" name="categoryId" type="text" onChange={handleInputChange} required>
            <option value="2" selected>Pick category</option>
            {categories &&
              categories.map((category, index) => (
                <option value={category.id} key={index}>{category.name}</option>
              ))
            }
          </select>

          <select className="form-control" name="categoryitemId" type="text" onChange={handleInputChange} required>
            <option value="2" selected>Pick activity</option>
            {categoryItems &&
              categoryItems.map((categoryItem, index) => (
                <option value={categoryItem.id} key={index}>{categoryItem.name}</option>
              ))
            }
          </select>
          <div className='image-container'>
            <label htmlFor='image'>Upload your image</label>
          <input className='photoUpload'  type="file" name="image" id="image" onSubmit={handleInputFileChange} />
          </div>
          <input placeholder='type your location' type="text" name="location" id="location" onSubmit={handleInputChange}  ></input>
          <button className='post' type="submit">Contribute</button>
          <button className='cancel' onClick={() => {setShowPostPopup(false)}} >Cancel</button>
        </form>
      </div>
  
  )
}

export default PostPopup