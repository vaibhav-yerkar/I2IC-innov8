import React from 'react';
import { Users, Plus, Search } from 'lucide-react';

export function Groups() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Groups</h1>
          <p className="text-gray-600 mt-2">Find your perfect team or community</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Create Group
        </button>
      </header>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="all">All Types</option>
          <option value="hackathon">Hackathon</option>
          <option value="flatmate">Flatmate</option>
          <option value="interest">Interest</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Group Cards */}
        <GroupCard
          name="Web3 Hackathon Team"
          type="hackathon"
          members={4}
          description="Looking for developers interested in building decentralized applications"
        />
        <GroupCard
          name="CS Major Flatmates"
          type="flatmate"
          members={2}
          description="Seeking flatmates for a 3-bedroom apartment near campus"
        />
        <GroupCard
          name="AI/ML Study Group"
          type="interest"
          members={12}
          description="Weekly meetups to discuss AI/ML concepts and projects"
        />
      </div>
    </div>
  );
}

function GroupCard({
  name,
  type,
  members,
  description
}: {
  name: string;
  type: string;
  members: number;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <span className="inline-block px-2 py-1 mt-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            {type}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-1" />
          <span>{members}</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
      <button className="mt-4 w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
        Join Group
      </button>
    </div>
  );
}