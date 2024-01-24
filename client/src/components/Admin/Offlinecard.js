import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../styles/Button';
import FormatPrice from '../../Helpers/FormatPrice';

const API = "http://localhost:8009/api/offline-payments";

const Offlinecard = () => {
  const [products, setProducts] = useState([]);
  const history = useNavigate();

  const getData = async (url) => {
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API);
  }, []);

  const handleAssignClick = (productId) => {
    history(`/Admin/assign/${productId}`);
  };

  return (
    <Wrapper className="section">
        {products.map((product) => (
          <div className="card grid-two-column" key={product._id}>
            {product.items.map((item) => (
              <div key={item.id} style={{ display: 'flex' }}>
                <Firstcontent>
                  <figure>
                    <img src={"../" + item.image} alt={item.name} />
                  </figure>
                </Firstcontent>
                <Secondcontent>
                  <div className="card-data">
                    <h3><span style={{color:'blue'}}>Product Name:</span> {item.name}</h3>
                    <h3><span style={{color:'blue'}}>Amount:</span> {item.amount}</h3>
                    <h3 style={{color:'blue'}}>Color:</h3><span>
                    <button
                    type="button"
                    value={item.color}
                    name="color"
                    style={{ backgroundColor: item.color,width:'15px',height:'15px'}}>
                  </button>
                  </span>
                  </div>
                </Secondcontent>
              </div>
            ))}
            <div style={{ display: 'flex' }}>
              <Firstcontent>
              <h3><span style={{color:'blue'}}>Name:</span> {product.uname}</h3>
                <h3><span style={{color:'blue'}}>Address:</span> {product.address}</h3>
                <h3><span style={{color:'blue'}}>City:</span> {product.city}</h3>
                <h3><span style={{color:'blue'}}>Location:</span> {product.location}</h3>
              </Firstcontent>
              <Secondcontent>
                <h3><span style={{color:'blue'}}>Pin:</span> {product.pin}</h3>
                <h3><span style={{color:'blue'}}>Mobile Number:</span> {product.mnumber}</h3>
                <p>
                  <FormatPrice price={product.total} />
                </p>
                <h3><span style={{color:'blue'}}>Payment Method:</span> {product.usertype}</h3>
              </Secondcontent>
            </div>
            <NavLink
              to={`/Admin/assign/${product._id}`} 
              className="btn-main"
            >
              <Button className="btn" onClick={() => handleAssignClick(product._id)}>
                Assign
              </Button>
            </NavLink>
          </div>
        ))}
    
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
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
    border: 0.1rem solid rgb(170 170 170 / 40%);
    overflow: hidden;

    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem 0;
      width: 100%;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(98 84 243);

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

    .btn-main .btn:hover {
      color: #fff;
    }
  }
`;

const Firstcontent = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Secondcontent = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export default Offlinecard;
