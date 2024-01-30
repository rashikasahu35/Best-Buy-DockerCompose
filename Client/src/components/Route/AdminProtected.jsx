import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminProtectedRoute = ({children}) => {
    const { userAuthenticated , user} = useSelector((state) => state.user) 

    if(!userAuthenticated){
        toast.error("Please login to access this resource")
        return <Navigate to='/login' />
    }
    else if(user && user.role != "admin"){
        toast.error(`Role : ${user.role} is not allowed to access this resource`)
        return <Navigate to='/login' />
    }
    else{
        return children
    }
}

export default AdminProtectedRoute