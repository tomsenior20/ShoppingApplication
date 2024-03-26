import '../Styling/Pages/App.css';
import '../Styling/Default/index.css';
import Nav from '../Components/Nav.jsx';
import Footer from '../Components/Footer.jsx'
import { Card, CardHeader,CardContent,Typography, Button} from '@mui/material';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  const chunkSize = 3;
  const [whatsnewList, setwhatsnew] = useState([]);
  useEffect(() =>{
    fetchWhatsNewData();
  },[]);

  function fetchWhatsNewData(){
    fetch('http://localhost:3010/whatsnew')
    .then((response) => {
      if(!response.ok){
        console.log("Network is not okay");
      }
      return response.json();
    })
    .then((data) => { 
      const newData = data.map((item) => {  
        return{
          ...item,
          DateEnd: new Date(item.DateEnd).toDateString()
        }
      })
      setwhatsnew(newData)})
    .catch((error) => { console.log("Error with Whatsnew data: ", error)});
  }

  function renderRowsOfItems(){
    const rows = [];
    const filterList = whatsnewList.filter(item  => {
      const endDate = new Date(item.DateEnd);
      const currentDate = new Date();
      return endDate > currentDate;
    });

    for (let i = 0; i < filterList.length; i += chunkSize) {
      rows.push(
        <div className='products row w-100' key={i}> 
          {filterList.slice(i, i + chunkSize).map((item,key) => (
          <Card className='productComingUpContainer col-12 col-lg-3' key={key}>
            <div className='d-flex flex-column h-100'>
              <CardHeader className='productNameSubHeader' title={item.whatsNewTitle}></CardHeader>
              <CardContent className='productNameText my-2'>
              <Typography paragraph>
                {item.whatsNewDescription}
              </Typography>
              </CardContent>
            <div className='mt-auto'> {/* This div ensures "Expires" is positioned at the bottom */}
              <CardContent className='productNameTextExpired'>
                <Typography variant="body1">
                  Expires: {item.DateEnd}
                </Typography>
              </CardContent>
            </div>
            </div>
          </Card>
          ))}      
        </div>
      )
    }
    return rows;
  }

  return (
    <div className="App">
      <Nav />
      <div className='headerContainer'>
        <div className='headerTitleContainer'>
          <Typography variant='h2' className='headerTitleContainerText'>Welcome To Senior Shop</Typography>
        </div>
        <div className='subHeaderContainer'>
          <div className='subHeaderInformation'>
            <Typography variant="h6" className='headerInformationText'>Below You will be able to navigate to the shopping page</Typography>
            <Typography variant='h6' className='headerInformationText'>These items are avaliable for a certain time only.</Typography>
          </div>
        </div>
      </div>
      {/* Whats new container */}
      <div className='happeningContainer'>
        <div className='happeningThisWeekContainer'>
          <Typography variant='h4' className='thisWeekText my-3'>Whats happening this week?</Typography>
        </div>
      </div>
      {/* Product Container */}
      <div className='productsContainer'>
        {renderRowsOfItems()}
      </div>
      <div className='shoppingcartNavContainer py-4 px-2 mx-2 my-4 d-flex flex-row justify-content-center align-items-center'>
        <div className='buttonTextContainer d-flex flex-column justify-content-center align-items-center m-3 p-4'>
          <Typography variant="h5" className='my-1 p-3'>
            Click to shop
          </Typography>
          <ImportExportIcon className='mx-2'/>
          <Button variant="outlined" className='shoppingButton btn btn-dark p-3 m-4' component={Link} to="/shop" endIcon={<ShoppingBasketIcon/>}>
            Shopping
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
