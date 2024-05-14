import { TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';
import Nav from '../Components/Nav';
import 'src/Styling/Pages/Basket.css';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { useEffect, useState } from 'react';
import Footer  from 'src/Components/Footer';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Basket() {
    const [currentOrder, setCurrentOrder] = useState([]);

    useEffect(() => {
        const order = sessionStorage.getItem("order");
        if(order){
            setCurrentOrder(JSON.parse(order));
        }
    },[]);

    function removeFromBasket(e,removeItem){
        e.preventDefault();
        // Get Current Order from storage
        const currentOrder = JSON.parse(sessionStorage.getItem("order"));
        // Filter array based on remove Item clicked
        const newOrder = currentOrder.filter(products => products.id !== removeItem.id );
        sessionStorage.setItem("order", JSON.stringify(newOrder));
        window.location.reload();
    }
    return(
        <div className='d-flex flex-column parentContainer'>
            <Nav />
            <div className='basketHeaderTitleContainer p-4 d-flex justify-content-around flex-column'>
                <Typography variant="h3" className='p-2 my-4 my-2 text-center basketTitleHeader'>Basket</Typography>
                <Typography variant="h4" className='my-3 p-3 basketTitleSubHeader text-center'>Below Are items added to your basket:</Typography>
            </div>
            <div className='p-3 basketParentContainer'>
            <TableContainer className="basketContainer p-2">
                <Table className='basketTable'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='text-center basketTableHeader'>Product Name: </TableCell>
                            <TableCell className='text-center basketTableHeader'>Product Description: </TableCell>
                            <TableCell className='text-center basketTableHeader'>Price: </TableCell>
                            <TableCell className='text-center basketTableHeader'>Remove Item: </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentOrder.length > 0 ? ( 
                            currentOrder.map((item,index) => (
                            <TableRow key={index}>
                                <TableCell className='basketTableContent'>{item.Name}</TableCell>
                                <TableCell className='basketTableContent'>{item.Description}</TableCell>
                                <TableCell className='basketTableContent'>£{item.Price}</TableCell>
                                <TableCell className='basketTableContent'>
                                    <Button onClick={(e) => removeFromBasket(e,item)}>
                                        {<DeleteIcon />}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))) :
                                <TableRow>
                                    <TableCell className='noitemrow'>
                                        No Items are in basket
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>              
            </TableContainer>
            </div>
            <Footer />
        </div>
    )
}