import React from 'react'
import './Footer.css'
import playstore from '../../Images/google-play.png'
// import appstore from '../../Images/app-store.png'

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Download Our App</h4>
            <p>Downlaod Our App From Android Playstore and IOS Store.</p>
            <div className="image">
            <img className='footerImage' src={playstore} alt="" />
            {/* <img className='footerImage' src={appstore} id='appstore' alt="" /> */}
            </div>
        </div>

        <div className="rightFooter">
            <h4>Stay Tuned With Us </h4>
            <a rel="noreferrer" target={'_blank'} href="https://www.instagram.com/tarun_devgnn/"><i class="fa-brands fa-instagram"></i> </a>
            <a rel="noreferrer" target={'_blank'} href="https://www.youtube.com/channel/UCIHoRXRtf5xdJWTIVR9M24Q"><i class="fa-brands fa-youtube"></i> </a>
            <a rel="noreferrer" target={'_blank'} href="https://www.linkedin.com/in/tarun-devgan-0b8013235/"><i class="fa-brands fa-linkedin"></i></a>
        </div>
        
        <div className="midFooter">
            <h1>Books Wallah</h1>
            <p>Your Trust is our quality</p>

            <p>Copyrighted 2023 &copy;BooksWallah</p>
        </div>
    </footer>
  )
}

export default Footer