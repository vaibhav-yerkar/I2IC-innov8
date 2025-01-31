import axios from "axios";
import { format, isValid } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import React, { useState } from "react";
import { useUser } from '@clerk/clerk-react';

function EventCard({
    eventId,
    title,
    date,
    location,
    description,
    attendees,
  }: {
    eventId: string;
    title: string;
    date: Date;
    location: string;
    description: string;
    attendees: number;
  }) {
    const { user } = useUser();  // Get user data using Clerk's useUser hook
    const role = user?.publicMetadata?.role;
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      department: "",
      academicYear: "",
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Data:", { eventId, ...formData }); // Debugging
        try {
          const response = await axios.post("/register", {
            eventId,  // Make sure eventId is defined and passed as a prop
            ...formData,
          });

          console.log(response.data);
          
      
          if (response.status === 200) {

            console.log("Registration successful");
            setShowForm(false);
          } else {
            console.error("Registration failed");
          }
        } catch (error) {
          console.error("Error submitting form data:", error);
        }
      };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{isValid(date) ? format(date, "PPP p") : "Invalid date"}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>{attendees} attending</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        {role === 'admin' ? (
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => navigate(`/events/${eventId}/analytics`)}
        >
          View Analytics
        </button>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setShowForm(true)}
        >
          Register
        </button>
      )}
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="academicYear"
              placeholder="Academic Year"
              value={formData.academicYear}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
  
  export default EventCard;
  