import React from "react";
import { Mail, Book, Briefcase, Calendar, Edit } from "lucide-react";

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="px-6 py-4 relative">
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
              <img
                src=""
                alt="Profile Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="ml-40">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Vaibhav Yerkar
                </h1>
                <p className="text-gray-600">Computer Science, Year 3</p>
              </div>
              <button className="flex items-center px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
            <div className="mt-4 flex space-x-4 text-gray-600">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>alex.thompson@university.edu</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Joined Sept 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {["Web Development", "AI/ML", "Mobile Apps", "UI/UX Design"].map(
              (interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="space-y-2">
            {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
              <div key={skill} className="flex items-center justify-between">
                <span className="text-gray-700">{skill}</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Book className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-gray-700">Joined Web3 Hackathon Team</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-gray-700">Created AI Study Group</p>
                <p className="text-sm text-gray-500">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
