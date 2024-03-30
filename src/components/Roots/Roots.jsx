import { Outlet } from "react-router-dom";
import Header from "../Header/Header";


const Roots = () => {
    return (
        <div className="lg:w-[1200px] w-full mx-auto">
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Roots;