import "../App.css";

const Navbar = () => {
    return (
        <div className= 'nav-container'>
            <div className = 'nav-left'>
                <img class="nav-image-container" src="logo.png" />
                <h1>Irvin's Games</h1>
            </div>
                <ul class ="nav-links">
                    <li><a href=''>Library</a></li>
                    <li><a href=''>Leaderboard</a></li>
                    <li><a href=''>Contact Us</a></li>
                </ul>
        </div>
    )
}
export default Navbar;