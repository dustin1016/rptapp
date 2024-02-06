import React, {useEffect} from "react";
import { BsArrowLeft } from "react-icons/bs";


const Home = () =>{
    useEffect(()=>{
        document.title = 'Princtech Accounting Reports';
    },[]);
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="p-4 border-2 border-blue-600 rounded-full text-2xl mt-8  animate-pulse">
                <BsArrowLeft />
            </div>
            <p className="text-xs text-gray-500">hover mouse on <br />left side of screen</p>
        </div>
    );
}

export default Home;