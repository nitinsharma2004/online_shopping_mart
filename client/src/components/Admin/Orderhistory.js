import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Adminnavbar from './Dashbord/Adminnavbar';
import FormatPrice from '../../Helpers/FormatPrice';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://localhost:8009/admin/order_detail";
const Orderhistory = () => {
  const [orders, setorders] = useState([]);
  const getData = async (url) => {
    try {
      const res = await axios.get(url);
      setorders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API);
  }, []);
  const handleDeleteClick = async (orderId) => {
    try {
      const res = await axios.delete(`http://localhost:8009/admin/order_detail/${orderId}`);
      if(res.status===401){
        toast.warning("Error Occuring Try Again 😃!", {
          position: "top-center"
        });
      }else{
        toast.success("done 😃!", {
          position: "top-center",
          autoClose: 2000,
      });
      }
      getData(API);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Maindiv>
    <Adminnavbar />
    <MainContent>
      <Wrapper className="section">
        <div className="container grid grid-two-column">
          {orders.map((curElem) => (
            <div className="card" key={curElem._id} style={{width:'600px'}}>
              {curElem.product.items.map((item) => (
                <div key={item.id} style={{display:'flex',width:'600px'}}>
                    <Firstcontent>
                    <figure>
                    <img src={"../" + item.image} alt={item.name} />
                     </figure>
                    </Firstcontent>
                   <Secondcontent>
                   <div >
                    <h3  style={{margin:'15px'}}><span style={{color:'blue'}}>Product Name:</span>{item.name}</h3>
                    <h3  style={{margin:'15px'}}><span style={{color:'blue'}}>Amount:</span> {item.amount}</h3>
                    <h3 style={{color:'blue'}}>Color:</h3>
                    <button
                    type="button"
                    value={item.color}
                    name="color"
                    style={{ backgroundColor: item.color,width:'15px',height:'15px'}}>
                  </button>
                  </div>
                   </Secondcontent>     
                </div>
              ))}
              {curElem.product.type ==="offline"?(
                <div className="card-data">
                <div className="card-data-flex">
                <Firstcontent>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Payment Method:</span>{curElem.product.usertype}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Address:</span>{curElem.product.address}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>City   :</span>{curElem.product.city}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Location:</span>{curElem.product.location}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Pin :</span>{curElem.product.pin}</h3>
                  <h3>Number  :{curElem.product.mnumber}</h3>
                  </Firstcontent>
                  <Secondcontent>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Order Date   :</span>{curElem.product.odate}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Shipping Date:</span>{curElem.sdate}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Delivery Date:</span>{curElem.ddate}</h3>
                  <div>
                  <p style={{paddingBottom:'12px'}}> <span style={{color:'blue'}}>Total Amount:</span></p>
                  <p>
                    <FormatPrice price={curElem.product.total} />
                  </p>
                </div>
                  </Secondcontent>
                </div>
              </div>
              ):(
                <div className="card-data">
                <div className="card-data-flex">
                <Firstcontent>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Payment Method:</span>{curElem.product.usertype}</h3>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>paid Amount   :</span> {curElem.product.bamount}</h3>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Address:</span> {curElem.product.baddress}</h3>
               <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Name:</span> {curElem.product.uname}</h3>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Email:</span> {curElem.product.uemail}</h3>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Expiry Date:</span> {curElem.product.expiryDate}</h3>
                <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>CVC:</span> {curElem.product.cvv}</h3>
                  </Firstcontent>
                  <Secondcontent>
             <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Pin:</span> {curElem.product.pin}</h3>
              <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Mob.No.:</span> {curElem.product.mnumber}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Order Date:</span>{curElem.product.odate}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>Shipping Date:</span>{curElem.sdate}</h3>
                  <h3 style={{paddingBottom:'12px'}}><span style={{color:'blue'}}>delivery Date:</span>{curElem.ddate}</h3>
                  <div>
                  <p style={{paddingBottom:'12px'}}> <span style={{color:'blue'}}>Total Amount:</span></p>
                  <p>
                    <FormatPrice price={curElem.product.total} />
                  </p>
                </div>
                  </Secondcontent>
                </div>
              </div>
              )};
              
              <div className="btn" onClick={() => handleDeleteClick(curElem._id)}>
          Delete
        </div>
            </div>
            
          ))}
         
        </div>
      </Wrapper>
    </MainContent>
  </Maindiv>
);
}
const Firstcontent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;
width:600px;
@media (min-width: 768px) {
  width: 50%;
}
`;
const Secondcontent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;
width:600px;
@media (min-width: 768px) {
  width: 50%;
}
`;
const Maindiv = styled.div`
  display :flex;
  height : 100vh;
  
`;
const MainContent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;
`;
const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    width: 100%;

    @media (min-width: 768px) {
      width: 600px;
    }

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      flex-direction: column;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .btn {
      height:40px;
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;
export default Orderhistory;