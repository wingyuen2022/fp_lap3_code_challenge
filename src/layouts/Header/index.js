import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className="sticky-top">
                <div className="sticky-top">
                    <Link to="/"><button type="button" class="btn btn-light">Home</button></Link>
                    <Link to="/search"><button type="button" class="btn btn-light">Search</button></Link>
                </div>
            </nav>
            <br />
        </>
    );
}

// <Link className="custom-button" to="/history">History</Link>

export default Header;
