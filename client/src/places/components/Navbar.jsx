import { Link } from 'react-router-dom';
import "../pages/Navbar.css";
import { motion } from "framer-motion";

const Navbar = () => {

    return (
        <div className= 'nav-container'>
            <div className = 'nav-left'>
                <img className="nav-image-container" src={"./logo.png"} alt="my logo"/>
                <motion.h1 className="web-games-title" 
                animate={{ scale: 1, rotate: [5, 0, -5, 5] }}
                transition={{ repeat: Infinity, duration: 5 }}>Irvin's Games </motion.h1>
            
                <ul className ="nav-links">
                    <li>
                        <Link to="/">🚪 Logout</Link>
                    </li>
                    <li>
                        <Link to="/Home">🏠 Home</Link>
                    </li>
                </ul>
                </div>
        </div>
    )
}
export default Navbar;