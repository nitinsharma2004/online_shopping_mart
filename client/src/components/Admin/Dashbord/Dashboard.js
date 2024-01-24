import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Adminnavbar from './Adminnavbar';
const ProductForm = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    company: '',
    price: 0,
    colors: [],
    image: null, // Change to null to properly handle file input
    description: '',
    category: '',
    featured: false,
    star:0,
    reviews:0,
    stocks:0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'colors') {
      setProduct({ ...product, [name]: value.split(',').map((color) => color.trim()) });
    } else if (name === 'image') {
      setProduct({ ...product, [name]: e.target.files[0] }); // Use e.target.files to get the file object
    } else if (type === 'checkbox') {
      setProduct({ ...product, [name]: e.target.checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      await axios.post('http://localhost:8009/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully!');
      setProduct({
        id: '',
        name: '',
        company: '',
        price: 0,
        colors: [],
        image: null,
        description: '',
        category: '',
        featured: false,
        star:0,
        reviews:0,
        stocks:0
      });
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

return (
  <DashboardContainer>
    <Adminnavbar/>
    <MainContent>
    <h2 style={{display:'flex',textAlign:'center',justifyContent:'center'}}> Product Upload Section</h2>
      <FormContainer onSubmit={handleSubmit}>
      
      <GridTwoColumn>
          <div>
          <Label>ID:</Label>
      <Input type="text" name="id" value={product.id} onChange={handleChange} required />
       
      <Label htmlFor="name">Name:</Label>
      <Input type="text" name="name" value={product.name} onChange={handleChange} required />

      <Label>Company:</Label>
      <Input type="text" name="company" value={product.company} onChange={handleChange} required />

      <Label>Price:</Label>
      <Input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <Label>Colors:</Label>
      <Input
        type="text"
        name="colors"
        value={product.colors.join(', ')}
        onChange={handleChange}
        required
      />
      <Label>Image:</Label>
      <Input
      type="file"
      name="image"
      onChange={handleChange}
      accept=".jpg, .jpeg, .png"
      required
      />
          </div>

          <div>
          
      <Label>Description:</Label>
      <textarea name="description" value={product.description} onChange={handleChange} required />
      <br /><br /><br />
      <Label>Category:</Label>
      <Input type="text" name="category" value={product.category} onChange={handleChange} required />

      <Label>Featured:</Label>
      <Input
        type="checkbox"
        name="featured"
        checked={product.featured}
        onChange={() => setProduct({ ...product, featured: !product.featured })}
      />
      <Label>star:</Label>
      <Input
        type="number"
        name="star"
        value={product.star}
        onChange={handleChange}
      />
      <Label>reviews:</Label>
      <Input
        type="number"
        name="reviews"
        value={product.reviews}
        onChange={handleChange}
      />
      <Label>stocks:</Label>
      <Input
        type="number"
        name="stocks"
        value={product.stocks}
        onChange={handleChange}
      />
     
          </div>
          </GridTwoColumn>
          <Button type="submit">Add Product</Button>
    </FormContainer>
    
    </MainContent>
  </DashboardContainer>
);
};

const DashboardContainer = styled.div`
display: flex;
height: 100vh;
`;


const GridTwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Change to single column on smaller screens */
  }
`;
const MainContent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;
`;
const FormContainer = styled.form`
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  padding-bottom:10px;
  font-size: 16px;
  color: #333;
  margin: 10px;
`;

const Input = styled.input`
  padding: 8px;
  width:100%;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #3498db;
  display:flex;
  text-align:center;
  justify-content:center;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width:50%;
  &:hover {
    background-color: #2980b9;
  }
`;
export default ProductForm;