import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RegisterForm = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    academicYear: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/register/${eventId}`, formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
      <input type="text" name="academicYear" placeholder="Academic Year" value={formData.academicYear} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;