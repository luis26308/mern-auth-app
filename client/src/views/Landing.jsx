import { useEffect} from "react";
import authAPI from "../utils/API/authAPI";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import {useNavigate, Outlet, useLocation } from "react-router-dom";

const Landing = () => {
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        let path
        if (location.pathname === "/") {
            path = "login"
        } else {
            path = location.pathname
        }
        navigate(path);
    }, []);

    
    return (
        <div className="landing-container">
            {/* <div className="left"> */}
            <Outlet />
            {/* </div>
            <div className="right"></div> */}
        </div>
    );
};

export default Landing;
