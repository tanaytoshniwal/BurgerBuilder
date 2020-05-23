import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        UNSAFE_componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request
            })

            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error })
            })
        }
        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal display={this.state.error} close={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler