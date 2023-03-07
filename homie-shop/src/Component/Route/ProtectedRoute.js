import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin , componenet : Component , ...rest}) => {
    const {user , isAuthenticated , loading} = useSelector(state => state.user);
    const history = useHistory()
    return (
     <>   
            {
                loading === false && (
                    <Route {...rest}
                    render={(props) => {
                        if(isAuthenticated === false) {
                            return <Redirect to='/login'/>
                        }
                        if(isAdmin === true && user.role !== "admin"){
                            return <Redirect to='/login'/>
                        }
                            return <Component {...props}/>
                    }}/>
                    )
            }
            </>)
}

export default ProtectedRoute