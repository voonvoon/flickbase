//check is user authenticated?

import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = (props) => {
    const users = useSelector( state => state.users);
    let location = useLocation();

    if(!users.auth){
        return <Navigate to="/auth" state={{from:location}} replace />
    }

    //if user is authenticated
    return props.children  //cuz this AuthGuard will wrap whatever routes we need to guard!

}


export default AuthGuard;