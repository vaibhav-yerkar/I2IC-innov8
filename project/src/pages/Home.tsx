import React from 'react';
import { ArrowRight, Users, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CampusConnect
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your hub for college collaboration, events, and community building
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <FeatureCard
          to="/groups"
          icon={<Users className="h-8 w-8 text-indigo-600" />}
          title="Join Groups"
          description="Find hackathon teams, flatmates, or connect with others sharing your interests"
        />
        <FeatureCard
          to="/events"
          icon={<Calendar className="h-8 w-8 text-indigo-600" />}
          title="Discover Events"
          description="Stay updated with college events, workshops, and meetups"
        />
        <FeatureCard
          to="/groups"
          icon={<MessageSquare className="h-8 w-8 text-indigo-600" />}
          title="Engage & Connect"
          description="Participate in discussions, share updates, and build your network"
        />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Featured Events
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Event cards will be populated dynamically */}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center text-indigo-600 hover:text-indigo-700">
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}