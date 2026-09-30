import React from 'react';
import { Calendar, Clock, MapPin, Users, Video, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import programData from '../data/program.json';

const Program = () => {
  const navigate = useNavigate();

  // Function to handle panel navigation with proper scrolling
  const handlePanelNavigation = (panelId: string) => {
    navigate('/panel');
    // Use setTimeout to ensure the page has loaded before scrolling
    setTimeout(() => {
      const element = document.getElementById(panelId);
      if (element) {
        // Scroll with offset to position better
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 100; // Scroll up 100px more
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Function to handle keynote navigation with proper scrolling
  const handleKeynoteNavigation = (keynoteId: string) => {
    navigate('/keynote');
    // Use setTimeout to ensure the page has loaded before scrolling
    setTimeout(() => {
      const element = document.getElementById(keynoteId);
      if (element) {
        // Scroll with offset to position better
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 100; // Scroll up 100px more
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Function to determine if an activity should be a link and where it should navigate
  const getActivityLink = (activity: string) => {
    const activityLower = activity.toLowerCase();
    
    // Check for specific keynote topics
    if (activityLower.includes('keynote 1') || activityLower.includes('data science for wind energy')) {
      return 'keynote1';
    } else if (activityLower.includes('keynote 2') || activityLower.includes('ia, metaverso y educación')) {
      return 'keynote2';
    } else if (activityLower.includes('keynote 3') || activityLower.includes('brave new world')) {
      return 'keynote3';
    } else if (activityLower.includes('keynote 4') || activityLower.includes('navigating the data gaps')) {
      return 'keynote4';
    } else if (activityLower.includes('keynote')) {
      return 'keynote1'; // Default to first keynote if no specific match
    } else if (activityLower.includes('panel 1')) {
      return 'panel1';
    } else if (activityLower.includes('panel 2')) {
      return 'panel2';
    } else if (activityLower.includes('poster session')) {
      return 'poster';
    }
    return null;
  };

  // Function to render activity with or without link
  const renderActivity = (activity: string) => {
    const link = getActivityLink(activity);
    
    if (link) {
      if (link.startsWith('keynote')) {
        return (
          <button
            onClick={() => handleKeynoteNavigation(link)}
            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer text-left"
          >
            {activity}
          </button>
        );
      } else if (link === 'panel1' || link === 'panel2') {
        return (
          <button
            onClick={() => handlePanelNavigation(link)}
            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer text-left"
          >
            {activity}
          </button>
        );
      } else if (link === 'poster') {
        return (
          <Link
            to="/poster"
            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
          >
            {activity}
          </Link>
        );
      }
    }
    
    return <div className="font-semibold text-gray-800">{activity}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Program</h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Program Download and Live Stream Buttons */}
        <div className="mb-6 flex justify-center gap-4 flex-wrap">
          <a 
            href="/Booklet.pdf" 
            download
            className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Program Download
          </a>
          <a
            href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjFkNDA3YmEtMjJjMy00NTQ0LTllNmEtZjg2ZmFlYjA3MTVl%40thread.v2/0?context=%7b%22Tid%22%3a%226497bc6d-7e82-48c2-b571-9e9489ce1a4c%22%2c%22Oid%22%3a%2273dfedc2-440c-4f6c-ac6c-bda56fe4f868%22%7d"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            <Video className="h-4 w-4 mr-2" />
            Join Live Stream (Microsoft Teams)
          </a>
        </div>
        {/* Combined Schedule for Both Days */}
        <div className="space-y-8">
          {programData.days.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-lg shadow-lg">
              {/* Day Header */}
              <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                <h3 className="text-2xl font-bold">
                  {day.date}
                </h3>
                <p className="text-blue-100 mt-2">{day.activities}</p>
                <div className="mt-3 flex items-center text-blue-100">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">Auditorio del Departamento de Ingeniería Eléctrica</span>
                </div>
              </div>
              
              {/* Schedule Table */}
              <div className="p-8">
                {day.schedule.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border-r border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                            Time
                          </th>
                          <th className="border-b border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                            Activity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.schedule.map((item, index) => {
                          const isLastRow = index === day.schedule.length - 1;
                          return (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className={`border-r px-4 py-4 font-medium text-gray-700 ${!isLastRow ? 'border-b' : ''} border-gray-300`}>
                                {item.time}
                              </td>
                              <td className={`px-4 py-4 ${!isLastRow ? 'border-b' : ''} border-gray-300`}>
                                <div className="space-y-1">
                                  {renderActivity(item.activity)}
                                  {item.presenter && (
                                    <div className="text-sm text-gray-600">{item.presenter}</div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Detailed program coming soon</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Panel Descriptions Section */}
        <div className="mt-12 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Panel Discussions</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Panel 1: Opportunities for AI Application in Mexico */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Opportunities for AI Application in Mexico</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover the tangible future of Artificial Intelligence in Mexico with a panel of six distinguished 
              researchers who are actively translating cutting-edge AI concepts into real-world applications 
              across industry, health, and agriculture.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">1. AI in Industrial Automation and Advanced Control</h4>
                <p className="text-gray-700 leading-relaxed">
                  Drawing on vast expertise in control systems and industrial environments, the panel will detail 
                  how AI and Machine Learning are revolutionizing Mexican industry. Dr. Mario César Maya 
                  Rodríguez, a specialist in Artificial Neural Networks and Transfer Learning for industrial 
                  processes, will discuss using AI to optimize production, predict equipment failure, and implement 
                  advanced control systems. Contributions from Dr. Hipolito Aguilar Sierra and Dr. Andrés José 
                  Rodríguez Torres, with their extensive backgrounds in Mechatronics, Automatic Control, and 
                  Industrial Automation, will highlight the development and implementation of intelligent robotics 
                  and automation solutions for greater efficiency and precision.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">2. Social Impact and AI for Public Good</h4>
                <p className="text-gray-700 leading-relaxed">
                  The discussion will spotlight AI applications focused on improving quality of life and addressing 
                  societal needs in Mexico, moving beyond abstract theory to practical solutions. Dra. Bella Citlali 
                  Martinez Seis, a leading researcher in Data Mining and Social Network Analysis, will present 
                  projects focused on technological developments for health systems and communities with 
                  disabilities, emphasizing human-centered design. Dr. Aguilar Sierra will share insights from his 
                  work in Robotics & AI Solutions iLab on medical robotics, including the development of exoskeletons and rehabilitation systems. Additionally, Dr. Luis Arturo Soriano Avendaño, with 
                  expertise in Renewable Energy and Agricultural Robotics, will explore how AI-driven modeling 
                  and control systems are optimizing resource use in the crucial agricultural sector.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">3. Applied Research, Innovation, and Ecosystem Development</h4>
                <p className="text-gray-700 leading-relaxed">
                  This segment will focus on the development pipeline from research publication to technological 
                  commercialization. Dr. Giner Alor Hernández, a prolific author and editor in the field of Computer 
                  Science and AI, will discuss the role of high-impact scientific publication in fostering 
                  technological transfer and strengthening national research capacity. The panelists, with their 
                  established records of industry experience, CONAHCyT projects, and international research stays 
                  (France, Spain, USA), will discuss strategies for strengthening academic-industry linkages and 
                  ensuring that Mexican AI talent is prepared to lead innovation at a global level.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2: Education in the AI Era */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Education in the AI Era</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join six of Mexico's leading researchers in Artificial Intelligence and Computer Science for an in-depth and critical exploration of Education in the AI Era. This high-level panel will move beyond 
              generalities to address the technical, ethical, and practical challenges of integrating AI into the 
              academic landscape.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">1. Ethics, Equity, and Governance of AI in Education</h4>
                <p className="text-gray-700 leading-relaxed">
                  This segment will delve into the critical ethical and regulatory dimensions of AI integration. Dra. 
                  Lourdes Martínez Villaseñor, a recognized expert and award-winner in Responsible AI Ethics 
                  (RAI), will lead a discussion on: AI Bias and Equity; Privacy and Transparency; The Educator's 
                  Responsibility.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">2. Redefining Curriculum, Learning, and Assessment</h4>
                <p className="text-gray-700 leading-relaxed">
                  With the rise of Generative AI, traditional methods of teaching and assessment are fundamentally 
                  disrupted. The panel will explore how curricula must evolve to maintain rigor in a world of instant 
                  answers. Dr. Juan Humberto Sossa Azuela and Dr. Xiaoou Li, experts in Machine Learning, 
                  Pattern Recognition, and Learning in Technology-Rich Environments, will discuss which skills—such as creativity, critical thinking, and complex problem-solving—must now be prioritized over 
                  rote memorization. The shift from grading final, potentially AI-generated products (like essays) 
                  to evaluating the process of learning, including project-based learning and the application of 
                  complex algorithms, a topic Dr. Joselito Medina Marín's expertise in Optimization of Systems and 
                  Autómata Theory is crucial for.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">3. Technical Integration: Databases, Optimization, and Emerging AI Paradigms</h4>
                <p className="text-gray-700 leading-relaxed">
                  This section will tackle the technical foundation required to support a modern, AI-enabled 
                  educational system, drawing on the panelists' deep research backgrounds. Dr. Lisbeth Rodríguez-Mazahua, a specialist in Autonomic Database Systems and Big Data, will address the challenges 
                  of managing, storing, and utilizing vast amounts of student data effectively and securely for 
                  personalized learning systems. Dr. Genaro J. Martínez, known for his work in Cellular Automata 
                  and Complex Systems. Dr. Sossa Azuela and Dr. Li will discuss the technical feasibility and impact 
                  of deploying Intelligent Tutoring Systems (ITS) and adaptive learning platforms that tailor content 
                  to the individual student's pace and needs using cutting-edge AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;