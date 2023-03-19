import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
	//const { state } = useLocation();
    const state = localStorage.getItem("login")

	return state == "true"  ? children : <Navigate to='/login' />;
};