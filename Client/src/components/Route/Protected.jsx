import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Spinner from "../Spinner";


const ProtectedRoute = ({children}) => {
    const { userAuthenticated, loading } = useSelector((state) => state.user) 

    if(!userAuthenticated){
        toast.error("Please login to access this resource") 
        return <Navigate to='/login'/>
    }
    else{
        return children
    } 
}  

export default ProtectedRoute