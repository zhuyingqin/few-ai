import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Building, User } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  institution: string;
  email: string;
  imageUrl: string;
  biography: string;
  panelId: number;
}

const Profile: React.FC = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const navigate = useNavigate();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await fetch('/data/experts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch expert data');
        }
        const data = await response.json();
        const foundExpert = data.experts.find((exp: Expert) => exp.id === expertId);
        
        if (!foundExpert) {
          setError('Expert not found');
        } else {
          setExpert(foundExpert);
        }
      } catch (err) {
        setError('Failed to load expert information');
        console.error('Error fetching expert:', err);
      } finally {
        setLoading(false);
      }
    };

    if (expertId) {
      fetchExpert();
    }
  }, [expertId]);

  const handleBackToPanel = () => {
    navigate('/panel');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading expert profile...</p>
        </div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-red-500 mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Expert Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The requested expert profile could not be found.'}</p>
            <button
              onClick={handleBackToPanel}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={handleBackToPanel}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Panel Discussions
          </button>
          
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <span>Panel Discussions</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{expert.name}</span>
          </nav>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=3b82f6&color=ffffff&size=128`;
                    }}
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {expert.name}
                </h1>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start text-blue-100">
                    <Building className="w-5 h-5 mr-2" />
                    <span className="text-lg">{expert.institution}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start text-blue-100">
                    <Mail className="w-5 h-5 mr-2" />
                    <a 
                      href={`mailto:${expert.email}`}
                      className="text-lg hover:text-white transition-colors duration-200"
                    >
                      {expert.email}
                    </a>
                  </div>
                </div>

                {/* Panel Badge */}
                <div className="mt-4">
                  <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Panel {expert.panelId} Participant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Biography
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {expert.biography}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleBackToPanel}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Panel Discussions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;