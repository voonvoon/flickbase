import { Navigate, useLocation } from 'react-router-dom';

const PreventSignIn = (props) => {
    let location = useLocation();


    return(
        <>
            { props.users.auth ?  
                <Navigate to="/dashboard" state={{from:location}} replace/> //jz to show the app from where we are redirect the user.
            :
                props.children
            }
        </>
    )
}

export default PreventSignIn;