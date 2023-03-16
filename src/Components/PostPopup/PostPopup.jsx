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
      console.log("holaaaaaaaaaaa", reader.result)
      setImgSrc(reader.result);
    };

    console.log(url) // Would see a path?

    setPost({ ...post, image: file });
  }

  const onSubmit = (event) => {

    event.preventDefault();

    const params = {
      image: event.target.image.files[0],
      location: event.target.location?.value,
      categoryId: event.target.categoryId?.value,
      categoryitemId: event.target.categoryitemId?.value,
      userId: sessionStorage.getItem('userId'),
    }
    // let hasError = false
    // let strongPassword = new RegExp('^[a-zA-Z0-9_]{6,}$')
    // console.log(strongPassword)
    // if(!strongPassword.test(params.password)){
    //   setWrongPassword(true)
    //   console.log("hello world")
    //   hasError = true
    // }

    // if(!params.image){
    //   setNoImage(true)
    //   hasError = true
    // }

    // let testUsername = new RegExp('^[a-zA-Z0-9_]{6,}$')
    // if(!testUsername.test(params.username)){
    //   setWrongUsername(true)
    //   hasError = true
    // }
    // let checkEmail = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}')
    // if(!checkEmail.test(params.email)){
    //   setWrongEmail(true)
    //   hasError = true
    // }
    // if(!params.birthdate){
    //   setNoBirthday(true)
    //   hasError = true
    // }
    // if (hasError){
    //   return
    // }

    PostService.create(params).then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(response.data.access_token);
    }).catch(e => {
      console.log(e);
    });
    setShowPostPopup(false)
  }

  const getCategories = () => {
    CategoryService.getAll().then((response) => {
      console.log(response.data);
      setCategories(response.data);
    }).catch((e) => {
      console.log(e);
    })
  }

  const getCategoryitems = (categoryId) => {
    CategoryItemsService.getByCategory(categoryId)
      .then((response) => {
        console.log(response.data);
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