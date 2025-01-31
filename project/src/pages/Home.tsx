import React from 'react';
import { ArrowRight, Users, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export function Home() {
  const { user } = useUser();  // Get user data using Clerk's useUser hook
  const role = user?.publicMetadata?.role;  // Access user role from metadata

  return (
    <div className="space-y-8">
      <header className="text-center relative">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to VishwaConnect
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your hub for college collaboration, events, and community building
        </p>

        {/* Sign-in button positioned in the top-right corner */}
        <div className="absolute top-4 right-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>

        {/* Display user button if the user is signed in */}
        <div className="absolute top-4 right-4">
        <SignedIn>
          <div className="mt-4">
            <UserButton />
            {/* Show admin link if the user is an admin */}
            {role === "admin" && (
              <Link to="/admin" className="text-indigo-600 hover:text-indigo-700 mt-4 block">
                Go to Admin Panel
              </Link>
            )}
          </div>
        </SignedIn>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
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
