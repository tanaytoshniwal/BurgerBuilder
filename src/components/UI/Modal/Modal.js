import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.display} backDropClick={props.close} />
            <div 
                className={classes.modal}
                style={{
                    transform: props.display ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.display ? '1' : '0'
                }}>
                <div className={classes.close} onClick={props.close}>X</div>
                {props.children}
            </div>
        </Aux>
    )
}

export default Modal
