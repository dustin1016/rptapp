import React, {useEffect} from "react";
import { BsArrowLeft } from "react-icons/bs";


const Home = () =>{
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="p-4 border-2 border-blue-600 rounded-full text-2xl mt-8  animate-pulse">
                <BsArrowLeft />
            </div>
        </div>
    );
}

export default Home;