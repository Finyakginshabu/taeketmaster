import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

export default function NavBar({whiteLogoUrl, homeUrl, cartUrl, userUrl, mapUrl, calendarUrl, searchUrl, onSearch, onDate, onProvince}){
    
    return(
        <div className="nav-bar">
            <img className="logo-user" src={whiteLogoUrl}/>
        
            <div className="nav-bar-content">
                <div className="back-to-home">
                    <img className="nav-bar-icon" src={homeUrl}/>
                    <h3>Home</h3>
                </div>

                <div className="search-bar">
                    <SearchBar mapUrl={mapUrl} calendarUrl={calendarUrl} 
                            searchUrl={searchUrl} onSearch={onSearch}
                            onDate={onDate} onProvince={onProvince}/>
                </div>
                <div className="cart-login">
                    <Link to="/cart">
                    <img className="nav-bar-icon" src={cartUrl}/>
                    </Link>
        
                    <div className="user-log-in">
                        <img className="nav-bar-icon" src={userUrl}/>
                        <Link to="/signin" className="sign-in">Sign in</Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}