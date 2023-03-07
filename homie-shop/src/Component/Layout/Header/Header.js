import React , {useState} from 'react'
import './Header.css'
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, logoutUser } from '../../../Actions/userAction';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Dialog, DialogActions   , Button } from '@material-ui/core'


const Header = () => {
  const [profileBox, setProfileBox] = useState("AccountBoxNone")
  const [keyword , setKeyword ] = useState('')
  const history = useHistory();
  const dispatch = useDispatch()

  const {isAuthenticated , user , error } = useSelector(state => state.user);


  const searchSubmit =(e) => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(`/products/${keyword}`)
    }
    else {
      history.push('/products')
    }
  }

      let navBar = ['navbar-fixed'];
     
      
    
const [sideNav, setSideNav] = useState('nav-ul')
const toggleNav = () => {
   sideNav === 'nav-ul' ? setSideNav('nav-ul nav_active') || setProfileBox("AccountBoxNone") : setSideNav('nav-ul')
}


// Profile box all Funtions 

  const handleShow = () => {
    if(profileBox === "AccountBoxNone") {
      setProfileBox("AccountBox")
    }
    else {
      setProfileBox("AccountBoxNone")
    }
  }
  const dashboard = () => {
    history.push('/admin/dashboard')
  }
  const moveToCart = () => {
    history.push('/cart')
  }
  const account = () => {
    history.push('/account')
  }
  //lOGOUT

  
  const [open, setOpen] = useState(false)

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const  logOut = () => {
      dispatch(logoutUser())

      toast.success("Logout Successfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      setOpen(false)
      history.push('/')

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
  }

  return (
    <>
    <ToastContainer/>
        <div className={navBar}>
    <nav className='navbar'>
        <div className="logo">
          <Link className='logo-h1' to={'/'}>Books Wallah</Link>
        </div>
            <ul className={sideNav}>
                <li><Link to={'/products'}>All Books </Link></li>
                <li><Link to="/seller">Sell Books</Link></li>
                <li><Link to={'/condition'}>Do/Don't</Link></li>
            </ul>
        <form className="search-bar" onSubmit={searchSubmit}>
            <input type="search" name="searchbar"  placeholder='Search Product' onChange={(e) => setKeyword(e.target.value)}/>
          <button type='submit' value='search'> <i className="fas fa-search"></i> </button> 
        </form>

        {/* SideIcons  */}


        <div className="sideIcon">
            <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
           {  isAuthenticated && isAuthenticated ? 
         
         ( <div className="profile-box" onClickCapture={handleShow}>
         <img src={user.avatar.url} alt='avatar' />
         </div>) :
          (<Link to="/login"><i className='fas fa-user'></i></Link>)  
          }
           <i className={sideNav === 'nav-ul' ? 'fas fa-bars' : 'fas fa-chevron-right text-light'} id='toggleIcon' onClick={toggleNav}></i>
        </div>

    </nav>

    <form className='search-below' onSubmit={searchSubmit}>
    <input type="search" name="searchbar" onChange={(e) => setKeyword(e.target.value)} placeholder='Search Product'/>
          <button type='submit' value='search'> <i className="fas fa-search"></i> </button> 
    </form>
         <div className="below_ul"> <Link to={'/products'}>All Books </Link>
                <Link to="/seller">Sell Books</Link>
                <Link to={'/category/Special_Books'}>Special Books</Link>
                <Link to={'/category/2nd_Hand'}>Old Books</Link>
                <Link to={'/category/Competetive'}>Competetive Books</Link></div>
    </div>

     {/* Profile Box to show  */}


   { isAuthenticated ? <div className={profileBox}>
           {
             user.role ===  "admin" ? <div onClick={dashboard}><h3 className='headCart'><i className="fas fa-rocket"></i> Dashboard</h3></div> 
              : <div onClick={moveToCart}><h3>  <i className="fas fa-shopping-cart"></i>  Your Cart</h3></div>
          }

          <div  onClick={account}> <h3> <i className="fas fa-user"></i>  Your Profile</h3> </div>
          <div> <h3 onClick={submitReviewToggle} > <i className="fas fa-sign-out-alt"></i> Logout</h3></div>
        </div> : ""
}
     {/* Dialog box for logout  */}

     <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle} 
        >
         <h3 style={{color:'orange' , padding : "15px 25px" , fontWeight : '300'}}>Lock kiya jayee??</h3> 
         
          <DialogActions>
            <Button onClick={submitReviewToggle} color='secondary' >No</Button>
            <Button onClick={logOut} className="reviewAddBtn"  color='primary' >Log Out</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default Header