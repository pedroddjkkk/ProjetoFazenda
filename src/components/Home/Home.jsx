import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

export default function Home(){
    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, [user]);
    
    return (
        <>
            <Navbar />
            <h1>asiusbfiusabdiubsaiudbsaiud</h1>
        </>
    );
}