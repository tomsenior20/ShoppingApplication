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
    }, [])
    function fetchProducts(){
        fetch("http://localhost:3010/getProducts")
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
            sessionStorage.setItem("order", JSON.stringify(order));
        } else{ 
            sessionStorage.setItem("order", JSON.stringify(order));
        }
    }
    return(
        <div>
            <Nav/>
            <div className='welcomeShopContainer d-flex flex-column justify-content-around px-3 py-2'>
                <Typography variant="h3" className='welcomeHeader p-4 my-4 text-center'>Welcome To The Shop</Typography>
                <Typography paragraph className='welcomeSubHeader my-3 mx-5 py-4 px-4'>
                    Add Items to basket below, which can be viewed by the basket page. Each item will be able to add it to a basket, for checking out purposes. 
                    So Why not start shopping?
                </Typography>
            </div>
            <div className='p-4 productMainContainer'>
                <div className='ProductHeaderContainer p-4 my-3'>
                    <Typography variant='h4' className='ProductCardHeader my-4 text-center p-3'>Below Are the Avaliable Products</Typography>
                </div>
                <div className='productContainer my-2 p-3 d-flex flex-row justify-content-center' style={{ position: 'relative' }}>
                    {products.filter((canShow) => canShow.showProduct === 1).map((item,key) => (
                    <Card key={key} className='ProductCard my-3 p-3 m-4'>
                        <CardHeader className='p-1' title={item.ProductName} />
                        <CardContent className='p-1'>
                            <Typography variant='body1' className="my-3">Description: {item.ProductDescription}</Typography>
                            <Typography variant='body1' className="my-2" value={item.ProductPrice}>Price: £{item.ProductPrice}</Typography>
                        </CardContent>
                        <CardContent className='AddButtonContainer p-2'>
                            <Button variant="contained"
                            className='AddButton' 
                            onClick={() => AddProduct(item)} 
                            endIcon={<AddIcon />}>
                                Add
                            </Button>
                        </CardContent>
                    </Card>
            ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}