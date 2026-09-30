import React from 'react';
import { Users, Calendar, MapPin, Mail, User, Download } from 'lucide-react';

const Registration: React.FC = () => {



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workshop Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for the International Workshop on Data Science and AI Applications 
            in Sustainable Food-Energy-Water Systems
          </p>
        </div>

        {/* Workshop Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="mr-3 text-blue-600" size={28} />
            Workshop Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Date</h3>
                  <p className="text-gray-600">October 13-14, 2025</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Cinvestav, Mexico City, Mexico</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Format</h3>
                  <p className="text-gray-600">In-person workshop with international speakers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">Language</h3>
                  <p className="text-gray-600">English and Spanish</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booklet Download Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Download className="mr-3 text-blue-600" size={28} />
            Workshop Materials
          </h2>
          
          <p className="text-gray-600 mb-6">
            Download the workshop booklet for detailed information about the program, speakers, and schedule.
          </p>
          
          <a
            href="/Booklet1.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Download className="mr-2" size={20} />
            Download Booklet (PDF)
          </a>
        </div>



        {/* Google Form Embedded */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="mr-3 text-blue-600" size={28} />
            Registration Form
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please complete the form below to register for the workshop. 
            Registration is free and helps us plan for the appropriate number of participants.
          </p>
          
          <div className="w-full">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf-rI9d4Oqx5L7t9DUpwZcndgqos3UsiLwUqEezMP3nBX0tDw/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-lg border border-gray-200"
              title="Workshop Registration Form"
            >
              Loading form...
            </iframe>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Having trouble with the form?</strong> You can also access it directly at:
              <br />
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSf-rI9d4Oqx5L7t9DUpwZcndgqos3UsiLwUqEezMP3nBX0tDw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Open form in new tab
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;