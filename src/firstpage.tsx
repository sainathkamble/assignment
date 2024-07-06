import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const FirstPage: React.FC = () => {
  
//Interface  
  interface UserInfo {
    name: string;
    phone: string;
    email: string;
  }

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({ name: false, phone: false, email: false });

  //Handle change event for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: value.trim() === '',
    }));
  };
 
  //Handle after form in submit
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault(); //prevent default behavoiur of form
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); //store data in local storage

    //If input are empty then throw error
    const newErrors = {
      name: userInfo.name.trim() === '',
      phone: userInfo.phone.trim() === '',
      email: userInfo.email.trim() === '',
    }
    setErrors(newErrors); 

    //check if data is filled?
    if(newErrors.name === false && newErrors.phone === false && newErrors.email === false){
      navigate('/second-page'); 
    }else{
      navigate('/'); //route user to home page
      alert('Please enter details first!'); 
    }
  }

return (

<Box
  component="form"
  style={{ height: 200, width: '50%', margin: '5%' }}
  sx={{
  '& > :not(style)': { m: 5, width: '100ch' },
  }}
  noValidate
  autoComplete="off"
  onSubmit={submitForm}
>

<TextField
  id="name"
  name="name"
  type="text"
  label="Name"
  value={userInfo.name}
  onChange={handleChange}
  required
  error={errors.name}
  helperText={errors.name ? 'Name is required' : ''}
/>

<TextField
  id="phone"
  name="phone"
  type="tel"
  label="Phone no"
  value={userInfo.phone}
  onChange={handleChange}
  required
  error={errors.phone}
  helperText={errors.phone ? 'Phone number is required' : ''}
/>

<TextField
  id="email"
  name="email"
  type="email"
  label="E-mail"
  value={userInfo.email}
  onChange={handleChange}
  required
  error={errors.email}
  helperText={errors.email ? 'Email is required' : ''}
/>

<Button type="submit" variant="contained">Submit</Button>

</Box>
  );
}