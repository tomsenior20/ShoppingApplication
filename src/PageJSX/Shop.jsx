import React, { useEffect, useState } from 'react';
import Nav from 'src/Components/Nav';
import Footer from 'src/Components/Footer';
import { Card, CardContent, CardHeader, Typography , Button} from '@mui/material';
import 'src/Styling/Pages/Shop.css'
import AddIcon from '@mui/icons-material/Add';

export default function Shop() {
    class Product{
        constructor(id,Name,Price,Description){
            this.id = id;
            this.Name = Name;
            this.Price = Price;
            this.Description = Description;
        }
    }

    const [products,setProducts] = useState([]);
    const [id, setId] = useState(0);

    useEffect(()=> {
        fetchProducts();
    },[])

    function fetchProducts(){
        // Gets Either the IP and LocalHost
        const hostName = window.location.hostname;
        // server is running on port 3010
        const serverPort = 3010; 
        const url = `http://${hostName}:${serverPort}/getProducts`;
        fetch(url)
        .then((response) => {
            if(!response.ok){
                console.log("Network is not okay");
            }
            return response.json();
        })
        .then((data) => {  setProducts(data)})
        .catch((error) => {console.log("Error fetching Products" + error)});
    }

    function AddProduct(product){
        const updatedId = id + 1;
        setId(updatedId);
        const updatedProduct = new Product(id , product.ProductName, product.ProductPrice, product.ProductDescription);
        var order = sessionStorage.getItem("order") ? JSON.parse(sessionStorage.getItem("order")) : [];
        order.push(updatedProduct);
        if(sessionStorage.getItem("order")){
            var exisitingOrder = JSON.parse(sessionStorage.getItem("order"));
            exisitingOrder.push(order);
        }

        sessionStorage.setItem("order", JSON.stringify(order));
        window.location.reload();
    }
    return(
        <div className='d-flex flex-column parentContainer'>
            <Nav/>
            <div className='welcomeShopContainer d-flex flex-column justify-content-around px-3 py-2'>
                <Typography variant="h3" className='welcomeHeader p-4 my-4 text-center'>Welcome To The Shop</Typography>
                <Typography paragraph className='welcomeSubHeader my-3 text-center py-4 px-4'>
                    Add Items to basket below, which can be viewed by the basket page. Each item will be able to add it to a basket, for checking out purposes. 
                    So Why not start shopping?
                </Typography>
            </div>
            <div className='productMainContainer'>
                <div className='ProductHeaderContainer p-5 my-3'>
                    <Typography variant='h4' className='ProductCardHeader my-4 text-center p-3'>Below Are the Avaliable Products</Typography>
                </div>
                <div className='productContainer my-3 p-3 d-flex flex-row justify-content-center align-items-center'>

                    {products.length > 0 ? (
                        products.filter((canShow) => canShow.showProduct === 1).map((item,key) => (
                        <Card key={key} className='ProductCard m-5 p-2 d-flex flex-column justify-content-between'>
                            <CardHeader className='p-1 productNames' title={item.ProductName} />
                            <CardContent className='p-1 flex-grow-1 d-flex justify-content-between flex-column'>
                                <Typography variant='body1 productDesc' className="my-3">Description: {item.ProductDescription}</Typography>
                                <Typography variant='body1'  className="my-2 productPrice" value={item.ProductPrice}>Price: £{item.ProductPrice}</Typography>
                            </CardContent>
                        <div className='p-2 d-flex justify-content-start'>
                            <Button variant="contained" className='AddButton btn' color="success" onClick={() => AddProduct(item)} endIcon={<AddIcon/>}>
                                Add
                            </Button>
                            </div>
                        </Card> ))
                    ) : (
                        <div>
                            <h4 variant="h4" className='my-0'>No Available Products</h4>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}