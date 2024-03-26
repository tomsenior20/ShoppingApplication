import React, { useEffect, useState } from 'react'
import '../Styling/Component/Footer.css'
import { Typography } from '@mui/material';

export default function Footer() {
    const [trademarkDate,setTrademarkDate] = useState("");

    useEffect(() => {
        setTrademarkDate(getDate());
    }, []);

    function getDate(){
        var year = new Date().getFullYear();
        return year;
    }
    return(
        <footer className='d-flex flex-row justify-content-between p-1 align-items-center mt-2'>
            <div className='footerNameContainer p-2 mx-3'>
                <Typography variant='body1' className='my-0 mx-3 fontText'>Powered and Operated by Tom Senior</Typography>
            </div>
            <div className='footerDateStamp p-1 mx-3'>
                <Typography variant="body1" className='my-0 mx-3 fontText'>{trademarkDate}</Typography>
            </div>
        </footer>
    )
}