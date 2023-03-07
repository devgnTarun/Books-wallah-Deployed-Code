import React from 'react'
import {TreeView , TreeItem} from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Slider = () => {
    const [slideBar , setSlideBar] = useState('slideBar')
    const toggle = () => {
        if(slideBar === 'slideBar') {
            setSlideBar("slider_sixWindow")
        }
        else {
            setSlideBar('slideBar')
        }
    }
   


  return (
    <>
    <div className={slideBar}>
        <div onClick={toggle} className="sideBar_btn">
        <i className="fas fa-angle-left"></i>
        </div>
        <div className="dashContent_box">
        <Link to='/admin/dashboard' > <i className="fas fa-warehouse"></i>  <p>   Dashboard </p></Link>  
        <Link style={{marginLeft : '15px'}}>
            <TreeView
            defaultCollapseIcon={<i className="fas fa-angle-up"></i>}
            defaultExpandIcon={<i className="fas fa-chevron-down"></i>}
            >
                <TreeItem nodeId='1' label='Products'>
                    <Link to={'/admin/products'}>
                        <TreeItem nodeId='2' label='All ' icon={<i className="fab fa-product-hunt"></i>}/>
                    </Link>
                    <Link to={'/admin/product'}>
                        <TreeItem nodeId='3' label='Create ' icon={<i className="fas fa-plus-circle"></i>}/>
                    </Link>
                </TreeItem>

            </TreeView>
        </Link>

        <Link className='slider_grid_option' to={'/admin/users'}>
        <i className="fas fa-users"></i><p> Users</p> 
        </Link>
      
        <Link className='slider_grid_option' to={'/admin/orders'}>
        <i className="fas fa-store"></i> <p>Orders</p>
        </Link>

        <Link className='slider_grid_option' to={'/admin/reviews'}>
        <i className="fas fa-thumbs-up"></i><p>  Reviews</p>
        </Link>

        </div>
    </div>
    </>
  )
}

export default Slider