import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageCircle, Clock, MapPin, Calendar, Mail, User } from 'lucide-react';

interface Panelist {
  name: string;
  institution?: string;
  email?: string;
  imageUrl?: string;
}

interface Host {
  name: string;
  institution?: string;
  email?: string;
  imageUrl?: string;
}

interface Panel {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  panelists: Panelist[];
  host: Host;
}

const Panel: React.FC = () => {
  const navigate = useNavigate();

  // 专家ID映射函数
  const getExpertId = (name: string): string => {
    const idMap: { [key: string]: string } = {
      'María de Lourdes Martínez': 'maria-martinez',
      'Juan Humberto Sossa Azuela': 'juan-sossa',
      'Xiaoou Li': 'xiaoou-li',
      'Genaro Juarez Martinez': 'genaro-martinez',
      'Joselito Medina Marín': 'joselito-medina',
      'Lisbeth Rodriguez Mazahua': 'lisbeth-rodriguez',
      'Giner Alor Hernández': 'giner-alor',
      'Bella Martínez Seis': 'bella-martinez',
      'Jorge Alvarado Sánchez (TBD ?)': 'jorge-alvarado',
      'Dr. Mario César Maya Rodríguez': 'mario-maya',
      'Dr. Hipolito Aguilar Sierra': 'hipolito-aguilar',
      'Andrés José Rodríguez Torres': 'andres-rodriguez',
      'Luis Arturo Soriano Avendaño': 'luis-soriano'
    };
    return idMap[name] || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handlePanelistClick = (panelist: Panelist) => {
    const expertId = getExpertId(panelist.name);
    navigate(`/profile/${expertId}`);
  };

  const panels = [
    {
      title: "Education in the AI Era",
      day: "October 13, 2025",
      time: "15:00 - 16:30",
      location: "Auditorio del Departamento de Ingeniería Eléctrica",
      host: {
        name: "Dr. Bella Citlali Martinez Seis",
        institution: "Cinvestav",
      },
      panelists: [
        { name: "María de Lourdes Martínez", institution: "Universidad Panamericana", email: "lmartine@up.edu.mx", imageUrl: "/Maria.png" },
        { name: "Juan Humberto Sossa Azuela", institution: "CIC-IPN", email: "hsossa@cic.ipn.mx", imageUrl: "/Juan Humberto Sossa Azuela.jpg" },
        { name: "Xiaoou Li", institution: "Cinvestav", email: "lixo@cs.cinvestav.mx", imageUrl: "/xiaoou.jpg" },
        { name: "Genaro Juarez Martinez", institution: "ESCOM-IPN", email: "gjuarezm@ipn.mx", imageUrl: "/Genaro.png" },
        { name: "Joselito Medina Marín", institution: "Universidad Autónoma del Estado de Hidalgo", email: "jmedina@uaeh.edu.mx", imageUrl: "/Joselito.png" },
        { name: "Lisbeth Rodriguez Mazahua", institution: "Instituto Tecnológico de Orizaba", email: "lisbethr08@gmail.com", imageUrl: "/Lisbeth.png" }
      ]
    },
    {
      title: "Opportunities for AI Application in Mexico",
      day: "October 14, 2025",
      time: "15:00 - 16:30",
      location: "Auditorio del Departamento de Ingeniería Eléctrica",
      host: {
        name: "Dr. Wen Yu",
        institution: "Cinvestav",
      },
      panelists: [
        { name: "Giner Alor Hernández", institution: "Tecnológico Nacional de México", email: "galor@ito-depi.edu.mx", imageUrl: "/Giner.png" },
        { name: "Bella Martínez Seis", institution: "UPIITA-IPN", email: "bcmartinez@ipn.mx", imageUrl: "/Bella.png" },
        { name: "Luis Arturo Soriano Avendaño", institution: "Universidad Autónoma Chapingo", email: "lsorianoa@chapingo.mx", imageUrl: "/Luis.png" },
        { name: "Dr. Mario César Maya Rodríguez", institution: "ESIME (Zacatenco)-IPN", email: "mmayar@ipn.mx", imageUrl: "/Mario.png" },
        { name: "Dr. Hipolito Aguilar Sierra", institution: "Universidad La Salle México", email: "hipolito.aguilar@lasalle.mx", imageUrl: "/Hipolito.png" },
        { name: "Andrés José Rodríguez Torres", institution: "Instituto Tecnológico Autónomo de México", email: "andres.rodriguez.torres@itam.mx", imageUrl: "/Andres.png" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Panel Discussions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interactive panel discussions bringing together experts to explore key topics in artificial intelligence
          </p>
        </div>

        <div className="space-y-16">
          {panels.map((panel, index) => (
            <div key={index} id={`panel${index + 1}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center mb-3">
                  <MessageCircle className="w-8 h-8 mr-3" />
                  <h2 className="text-2xl font-bold">{panel.title}</h2>
                </div>
                
                {/* Time and Location Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{panel.day}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{panel.time}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">Host: {panel.host.name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="font-medium">{panel.location}</span>
                  </div>
                </div>
              </div>



              {/* Panelists Grid */}
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Panelists</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {panel.panelists.map((panelist, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105"
                      onClick={() => handlePanelistClick(panelist)}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={panelist.imageUrl}
                            alt={panelist.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(panelist.name)}&background=3b82f6&color=ffffff&size=64`;
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors duration-200">
                          {panelist.name}
                        </h5>
                        {panelist.institution && (
                          <p className="text-xs text-blue-600 mt-1">
                            {panelist.institution}
                          </p>
                        )}
                        {panelist.email && (
                          <div className="flex items-center mt-1">
                            <Mail className="w-3 h-3 text-gray-500 mr-1" />
                            <p className="text-xs text-gray-600">
                              {panelist.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Join the Discussion
            </h3>
            <p className="text-blue-700">
              These interactive sessions will provide opportunities for audience participation and Q&A with our expert panelists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;