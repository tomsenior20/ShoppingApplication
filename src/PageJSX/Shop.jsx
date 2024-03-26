import React from 'react';
import Nav from 'src/Components/Nav';
import { Typography } from '@mui/material';


export default function Shop() {
    return(
        <div>
            <Nav/>
            <div className='p-2'>
                <Typography variety="h2">Shop</Typography>
            </div>
        </div>
    )
}