import { useState, useEffect } from 'react';
import '../Styling/Component/Navigation.css';
import { Link, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

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
            <div className="navigationTitleContainer d-flex align-items-center">
                <Typography variant='h5'>Tom Senior</Typography>
            </div>
            <div className="navigationLinkContainer">
                {screenWidth > 400 ? (
                    <ul className='m-0'>
                        <li style={{ display: page === "/" ? "none" : "flex"}}>
                            <Link to="/">Home</Link>
                        </li>
                        <li style={{ display: page === "/shop" ? "none" : "flex"}}>
                            <Link to="/shop">
                               <Typography variant='body1'>Shop</Typography>
                            </Link>
                        </li>
                        <li style={{ display: page === "/about" ? "none" : "flex"}}>
                            <Link to="/about">
                                <Typography variant='body1'>About</Typography>
                            </Link>
                        </li>
                        <li style={{ display: page === "/basket" ? "none" : "flex"}}>
                            <Link to="/basket" className='d-flex align-items-center justify-content-center'>
                                <Typography variant='body1'>Basket</Typography>
                                <ShoppingBasketIcon className='mx-2'/>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <p>Test</p>
                )}
            </div>
        </nav>
    )
}