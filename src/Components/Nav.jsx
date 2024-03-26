import { useState, useEffect } from 'react';
import '../Styling/Component/Navigation.css';
import { Link, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';

export default function Nav() {
    const location = useLocation();
    const [screenWidth, setScreenWidth] = useState(0);
    const [page, setPage] = useState("");

    useEffect(() => {
        setPage(location.pathname);

        function handleResize() {
            const newScreenWidth = window.innerWidth;
            setScreenWidth(newScreenWidth);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [location.pathname]);

    return (
        <nav>
            <div className="navigationTitleContainer">
                <Typography variant='h5'>Tom Senior</Typography>
            </div>
            <div className="navigationLinkContainer">
                {screenWidth > 400 ? (
                    <ul className='m-0'>
                        <li style={{ display: page === "/" ? "none" : "block"}}>
                            <Link to="/">Home</Link>
                        </li>
                        <li style={{ display: page === "/shop" ? "none" : "block"}}>
                            <Link to="/shop">Shop</Link>
                        </li>
                        <li style={{ display: page === "/about" ? "none" : "block"}}>
                            <Link to="/about">About</Link>
                        </li>
                        <li style={{ display: page === "/offices" ? "none" : "block"}}>
                            <Link to="/offices">Offices</Link>
                        </li>
                    </ul>
                ) : (
                    <p>Test</p>
                )}
            </div>
        </nav>
    )
}