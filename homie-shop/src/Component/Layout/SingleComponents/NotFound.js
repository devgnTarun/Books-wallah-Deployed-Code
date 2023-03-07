import React from 'react'
import {Link} from 'react-router-dom'
import MetaData from '../MetaData'

const NotFound = () => {
  return (
    <>
    <MetaData title='Not Found'/>
    <div className='noProducts '>
        <i class="fas fa-exclamation-circle"></i>
        <h3> 404 Page not found!!</h3>
        <Link className='back_btn' to='/'> Go Back</Link> 
    </div>
        </>  )
}

export default NotFound