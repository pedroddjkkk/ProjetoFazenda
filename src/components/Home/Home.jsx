import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

export default function Home(){
    const user = useSelector((state) => state.user);
    const pages = JSON.parse(localStorage.getItem("pages"));

    useEffect(() => {
        console.log(pages);
    }, [user]);

    return (
        <div>
            <Navbar content={pages}/>
            <h1>asiusbfiusabdiubsaiudbsaiud</h1>
        </div>
    );
}