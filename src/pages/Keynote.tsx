import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import speakersData from '../data/speakers.json';

interface Speaker {
  id: string;
  name: string;
  title?: string;
  institution: string;
  topic: string;
  website?: string;
  abstract?: string;
  biosketch?: string | {
    education?: string[];
    positions?: string[];
    research_focus?: string[];
    memberships?: string[];
    awards?: string[];
    publications?: string[];
    research_areas?: string[];
    academic_positions?: string[];
    academic_activities?: string[];
    editorial_boards?: string[];
  };
  language?: string;
  imageUrl: string;
}

const Keynote: React.FC = () => {
  const speakers: Speaker[] = speakersData;
  const [expandedBiosketches, setExpandedBiosketches] = useState<Record<string, boolean>>({});

  // 时间映射数组，对应每个keynote的时间信息
  const keynoteTimeSlots = [
    "10:30 - 11:30 October 13, 2025", // Keynote 1
    "12:00 - 13:00 October 13, 2025", // Keynote 2
    "10:30 - 11:30 October 14, 2025", // Keynote 3
    "12:00 - 13:00 October 14, 2025"  // Keynote 4
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Keynote Talks
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Auditorio del Departamento de Ingeniería Eléctrica, Cinvestav, CDMX
          </p>
        </div>

        <div className="space-y-12">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              id={`keynote${index + 1}`}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                index === 0 ? 'border-2 border-blue-200' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-1">
                  <div className="aspect-[4/5] max-w-60 mx-auto overflow-hidden rounded-lg mb-4">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {speaker.language && (
                    <p className="text-xs text-gray-500 italic text-center">
                      (Talk in {speaker.language})
                    </p>
                  )}
                </div>
                <div className="lg:col-span-2">
                  {/* Keynote标识 */}
                  <div className="mb-4">
                    <div className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-3">
                      {keynoteTimeSlots[index]}
                    </div>
                  </div>
                  
                  {/* 演讲标题 */}
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg mb-4 shadow-md">
                      <h4 className="text-xl md:text-2xl font-bold text-center">
                        {speaker.topic}
                      </h4>
                    </div>
                  </div>
                  
                  {/* 演讲者姓名和职位机构 */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-blue-900 mb-1">
                      {speaker.name}
                    </h3>
                    {speaker.title && (
                      <p className="text-lg text-gray-700 font-medium mb-2">
                        {speaker.title}
                      </p>
                    )}
                    <p className="text-orange-600 font-medium mb-3">
                      {speaker.institution}
                    </p>
                    {speaker.website && (
                      <div className="mb-3">
                        <a
                          href={speaker.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg border border-blue-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Personal Website
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    {speaker.abstract && (
                      <div className="mb-4">
                        <h5 className="text-md font-medium text-gray-800 mb-2">Abstract:</h5>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {speaker.abstract}
                        </p>
                      </div>
                    )}
                    {speaker.biosketch && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-md font-medium text-gray-800">Biosketch:</h5>
                          <button
                            onClick={() => {
                              setExpandedBiosketches(prev => ({
                                ...prev,
                                [speaker.id]: !prev[speaker.id]
                              }));
                            }}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                          >
                            {expandedBiosketches[speaker.id] ? (
                              <>
                                <span>Show Less</span>
                                <ChevronUp size={16} />
                              </>
                            ) : (
                              <>
                                <span>Show More</span>
                                <ChevronDown size={16} />
                              </>
                            )}
                          </button>
                        </div>
                        {typeof speaker.biosketch === 'string' ? (
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedBiosketches[speaker.id] ? 'max-h-none' : 'max-h-20'
                          }`}>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {speaker.biosketch}
                            </p>
                            {!expandedBiosketches[speaker.id] && (
                              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                            )}
                          </div>
                        ) : (
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedBiosketches[speaker.id] ? 'max-h-none' : 'max-h-32'
                          }`}>
                            <div className="space-y-3 relative">
                              {speaker.biosketch.education && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Education:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.education.map((edu, idx) => (
                                      <li key={idx}>{edu}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.positions && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Positions:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.positions.map((position, idx) => (
                                      <li key={idx}>{position}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.research_focus && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Research Focus:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.research_focus.map((focus, idx) => (
                                      <li key={idx}>{focus}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.memberships && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Memberships:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.memberships.map((membership, idx) => (
                                      <li key={idx}>{membership}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.awards && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Awards:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.awards.map((award, idx) => (
                                      <li key={idx}>{award}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.publications && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Publications:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.publications.map((publication, idx) => (
                                      <li key={idx}>{publication}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.research_areas && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Research Areas:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.research_areas.map((area, idx) => (
                                      <li key={idx}>{area}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.academic_positions && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Academic Positions:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.academic_positions.map((position, idx) => (
                                      <li key={idx}>{position}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {speaker.biosketch.academic_activities && (
                                <div>
                                  <h6 className="text-sm font-semibold text-blue-700 mb-1">Academic Activities:</h6>
                                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    {speaker.biosketch.academic_activities.map((activity, idx) => (
                                      <li key={idx}>{activity}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {!expandedBiosketches[speaker.id] && (
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {!speaker.abstract && !speaker.biosketch && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {speaker.topic}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keynote;