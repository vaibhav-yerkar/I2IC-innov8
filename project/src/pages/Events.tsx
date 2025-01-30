import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Events() {
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
        <button
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => navigate("/events-create")}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Event
        </button>
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
        {/* Example Event Cards */}
        <EventCard
          title="Nirman Hackathon 2024"
          date={new Date("2025-02-15T14:00:00")}
          location="Innovation Hub, Room 201"
          description="Innovate, build, and win exciting prizes"
          attendees={45}
        />
        <EventCard
          title="AI in Healthcare Seminar"
          date={new Date("2025-02-20T15:30:00")}
          location="Medical Sciences Building"
          description="Exploring the impact of AI in modern healthcare"
          attendees={120}
        />
        <EventCard
          title="Campus Hackathon 2024"
          date={new Date("2024-04-01T09:00:00")}
          location="Engineering Building"
          description="24-hour coding challenge with amazing prizes"
          attendees={200}
        />
        {data.map((event: any) => (
          <EventCard
            key={event._id}
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

function EventCard({
  title,
  date,
  location,
  description,
  attendees,
}: {
  title: string;
  date: Date;
  location: string;
  description: string;
  attendees: number;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2" />
          <span>{format(date, "PPP p")}</span>
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
      <button className="mt-4 w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
        RSVP
      </button>
    </div>
  );
}
