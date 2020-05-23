import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {

    shouldComponentUpdate(nextProp, nextState) {
        return nextProp.display !== this.props.display || nextProp.children !== this.props.children
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.display} backDropClick={this.props.close} />
                <div 
                    className={classes.modal}
                    style={{
                        transform: this.props.display ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.display ? '1' : '0'
                    }}>
                    <div className={classes.close} onClick={this.props.close}>X</div>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal
