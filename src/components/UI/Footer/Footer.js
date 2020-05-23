import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.footer}>
            Developed with <span className={[classes.heart, classes.animate].join(' ')}></span> by <a href="https://tanaytoshniwal.me" target="_blank" rel="noopener noreferrer">@tanaytoshniwal</a>
        </div>
    )
}

export default Footer
