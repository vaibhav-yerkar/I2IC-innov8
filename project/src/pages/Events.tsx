import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useUser } from "@clerk/clerk-react";

export function Events() {
  const { user } = useUser();  // Get user data using Clerk's useUser hook
  const role = user?.publicMetadata?.role; 
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const response = axios.get("/events");
    response.then((res) => setData(res.data));
  }, []);

  console.log(data.map((event: any) => event));
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-2">Discover and join campus events</p>
        </div>
        {role === 'admin' && (
          <button
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => navigate("/create-events")}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </button>
        )}
      </header>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((event: any) => (
          <EventCard 
            key={event._id}
            eventId={event._id}
            title={event.title}
            date={new Date(event.startDate)}
            location={event.location}
            description={event.description}
            attendees={event.attending}
          />
        ))}
      </div>
    </div>
  );
}


