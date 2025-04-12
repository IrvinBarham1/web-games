import { Link } from 'react-router-dom';
import "../pages/Navbar.css";


const Navbar = () => {

    return (
        <div className= 'nav-container'>
            <div className = 'nav-left'>
                <img class="nav-image-container" src="./logo.png" alt="my logo"/>
                <h1>Irvin's Games</h1>
            </div>
                <ul class ="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/library">Library</Link>
                    </li>
                    <li>
                        <Link to="/leaderboard">Leaderboard</Link>
                    </li>
                    <li>
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                </ul>
        </div>
    )
}
export default Navbar;