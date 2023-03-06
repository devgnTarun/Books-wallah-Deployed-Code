import React, { useState , useEffect } from 'react'
import MetaData from '../Layout/MetaData'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {  useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import {clearError , newProductAction} from '../../Actions/productAction.js'
import {NEW_PRODUCT_RESET} from '../../Constants/productContant'
import Slider from './Slider';

const NewProduct = () => {

    // css added in product list.css

    const history = useHistory();
    const dispatch = useDispatch();

    const {loading , error , success} = useSelector(state => state.newProduct)

    useEffect(() => {
        if(error) {
        toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        dispatch(clearError())
    }
        if(success) {
        toast.success("Product Created Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        history.push('/admin/dashboard')
        dispatch({type : NEW_PRODUCT_RESET})
    }



    }, [dispatch , error, success , history])
    

    const [name , setName]= useState('')
    const [price , setPrice]= useState(0)
    const [description , setDescription]= useState('')
    const [category , setCategory]= useState('')
    const [stock , setStock]= useState(0)
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])

    const createProductOnChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([]);
        setImagePreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagePreview((old) => [...old , reader.result]);
                    setImages((old) => [...old , reader.result])
                }
            };
            reader.readAsDataURL(file)
        })
     }
    const submitHandler = (e) => {
        e.preventDefault()
        let myForm = new FormData();

        myForm.set('name' , name);
        myForm.set('price' , price);
        myForm.set('description' , description);
        myForm.set('category' , category);
        myForm.set('stock' , stock);

        images.forEach((image) => {
            myForm.append('images' , image);
        })
    dispatch(newProductAction(myForm))
    }
    
    const categories =[
        'Special_Books',
  'E_Books',
  'NCERT_Books',
  'Competetive',
  '2nd_Hand',
  'School_College'
      ]


  return (
    <>
            <MetaData title={'Create Product'}/>
            <ToastContainer/>
            <div className="dashboard">
                <Slider/>

                <div className="create_product_page">
                    <form action="" className='create_product_form' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h3>Create Product</h3>
                       
                        <div>
                            <label htmlFor="name">
                                    Name :
                            </label>
                            <input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="price">
                                    Price :
                            </label>
                            <input type="number" placeholder='Product Price' required value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>

                        <div>
                            <label htmlFor="description">
                                    Description :
                            </label>
                            <textarea rows='1' cols='10' placeholder='Product Description' required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div>
                            <label htmlFor="category">Category</label>
                            <select required onClick={(e) => setCategory(e.target.value)} >
                                <option value=''>Select Category</option>
                                {
                                    categories.map((i) =>  <option key={i} value={i}>
                                            {i}
                                        </option>)
                                }
                            </select>
                        </div>

                          <div>
                            <label htmlFor="stock">
                                    Stock :
                            </label>
                            <input type="number" placeholder='Product Stock available' required value={stock} onChange={(e) => setStock(e.target.value)}/>
                        </div>

                        <div id="create_product_file">
                        <label htmlFor="stock">
                                    Choose Image :
                            </label>
                            <input required className='image_file' type="file" name='images' accept='image/' multiple onChange={createProductOnChange} />
                        </div>

                        <div id="create_product_image">
                        
                            {imagePreview.map((image , index) => 
                             ( <div className="image_box_create">   <img src={image} key={index} alt="Avatar Preview" /> </div>)
                            )}
                        </div>

                        <button id='create_pruduct_button' type='submit' disabled={loading ? true : false}>Create</button>


                    </form>
                </div>
            </div>
    </>
  )
}

export default NewProduct