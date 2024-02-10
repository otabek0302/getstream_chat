import React from 'react'
import TeamImage from '../assets/TeamImage.jpeg'

const Error = () => {
    return (
        <div className='error__page-container'>
            <div className="error__page-bg">
                <img src={TeamImage} alt="Team" />
            </div>
            <div className="error__page-wrapper">
                <div className="error__page-modal">
                    <p>Already a member ? Go to <a href="/register">Register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Error