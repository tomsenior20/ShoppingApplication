import { useState, useEffect } from 'react';
import '../Styling/Component/Navigation.css';
import { Link, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Hamburger from 'hamburger-react'

export default function Nav() {
    const location = useLocation();
    const [screenWidth, setScreenWidth] = useState(0);
    const [page, setPage] = useState("");
    const [orderLength, setOrderLength] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        // Sets the page name
        setPage(location.pathname);
        
        const order = sessionStorage.getItem("order");
        if (order && order.length > 0) {
            setOrderLength(JSON.parse(order).length);
        }
        function handleResize() {
            const newScreenWidth = window.innerWidth;
            setScreenWidth(newScreenWidth);
        }
        
        // Sets Screensize state based on Resize event.
        window.addEventListener("resize", handleResize);
        // Calls the Resize Function - Stores State
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav>
            <div className="navigationTitleContainer d-flex align-items-center">
                <Typography variant='h5' className='NavigationBrandTitle'>Tom Senior</Typography>
            </div>
            <div className="navigationLinkContainer">
                {screenWidth > 700 ? (
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
                        <li style={{ display: page === "/basket" ? "flex" : "flex"}}>
                            <Link to="/basket" className='d-flex align-items-center justify-content-center'>
                                <Typography id="basketIcon" variant='body1'>Basket</Typography>
                                <div class="basketIconContainer">
                                    <ShoppingBasketIcon className='mx-2'/>
                                    <div className='m-1 BasketNumberContainer' id="orderLengthNumber">{orderLength}</div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <>
                        <Hamburger className="HamburgerMenuIcon" toggled={isOpen} toggle={toggleMenu} />
                        {isOpen && (
                            <div className="mobile-menu">
                                {page !== "/" && (
                                    <Link to="/" className="menu-item" onClick={toggleMenu} >Home</Link>
                                )}
                                {page !== "/about" && (
                                    <Link to="/about" className="menu-item" onClick={toggleMenu}>About</Link>
                                )}
                                {page !== "/shop" && (
                                    <Link to="/shop" className="menu-item" onClick={toggleMenu}>Shop</Link>
                                )}
                                <Link to="/basket" className="menu-item" onClick={toggleMenu}>Basket</Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </nav>
    )
}