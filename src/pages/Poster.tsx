import React from 'react';
import { Download, FileText, User, Calendar } from 'lucide-react';

interface PosterData {
  id: string;
  title: string;
  author: string;
  institution?: string;
  fileName: string;
  description?: string;
  category?: string;
}

const Poster: React.FC = () => {
  // Poster数据，基于public/poster文件夹中的文件
  const posters: PosterData[] = [
    {
      id: 'few-poster-assess',
      title: 'Data-Driven Multiple ARIMA through Neural Fusion for Enhanced Wind Power Prediction with Missing Data',
      author: 'Dr. Xiaoou Li',
      institution: 'Cinvestav',
      fileName: 'FewPoster_Asscess.pdf',
      description: 'Assessment methodology for few-shot learning approaches',
      category: 'Research'
    },
    {
      id: 'few-poster-case25a',
      title: 'Robust Electricity Forecasting in Smart Buildings with Missing Data: A Concept Echo State Network Approach',
      author: 'Yingqin Zhu',
      institution: 'Cinvestav',
      fileName: 'FewPoster_case25a.pdf',
      description: 'Case study analysis for few-shot learning implementation',
      category: 'Research'
    },
    {
      id: 'bella-lsm-med',
      title: 'Dispositivo interprete de la Lengua de Señas Mexicana para el área médica',
      author: 'Rodrigo Aragón Hernández',
      institution: 'UPIITA-IPN',
      fileName: 'Poster_Bella LSM_Med.pdf',
      description: 'Medical applications of LSM technology',
      category: 'Research'
    },
    {
      id: 'bella-wsn',
      title: 'Water Pollution Monitoring System Based on a Wireless Sensor Network and Computer Vision',
      author: 'Oscar Alfredo Dompablo-Celaya',
      institution: 'UPIITA-IPN',
      fileName: 'Poster_Bella WSN.pdf',
      description: 'Advances in wireless sensor network technologies',
      category: 'Research'
    },
    {
      id: 'yahel-sensor',
      title: 'Virtual Environment for Rehabilitation of Upper Distal Limb Using a Haptic Device with Adaptive Impedance Control and Neural Compensation: A Preliminary Proposal',
      author: 'Yahel Cortés-García',
      institution: 'Cinvestav',
      fileName: 'Poster_Yahel_Sensor.pdf',
      description: 'Innovative sensor technology developments',
      category: 'Sensors'
    },
    {
      id: 'robots',
      title: 'EL JUEGO DE LA VIDA EN CUBELETS',
      author: 'Andrade Granados Daniela',
      institution: 'Laboratorio de vida artificial y robótica en la Escuela Superior de Cómputo',
      fileName: 'robots.pdf',
      description: 'Latest developments in robotics and automation',
      category: 'Robotics'
    },
    {
      id: 'cazones-river-monitoring',
      title: 'Integrated Management of the Cazones River Basin through Ecological Development',
      author: 'América A. Padilla-Viveros',
      institution: 'Multidisciplinary Research Department',
      fileName: 'Cazones River monitoring.pdf',
      description: 'Environmental monitoring system for river water quality assessment',
      category: 'Research'
    },
    {
      id: 'few-poster-assess-oecs',
      title: 'Autonomous Navigation of a Surface Vehicle in Waterways Using Artificial Vision ',
      author: 'Oscar Eduardo Correa-Salazar',
      institution: 'Cinvestav',
      fileName: 'FewPoster_Asscess_OECS.pdf',
      description: 'OECS-based assessment methodology for few-shot learning approaches',
      category: 'Research'
    },
    {
      id: 'poster-daniel',
      title: 'Ciencia de Datos Espaciales para el Análisis de las Emergencias Sanitarias',
      author: 'Daniel Jim ́enez Alcantar',
      institution: 'Cinvestav',
      fileName: 'Poster_Daniel.pdf',
      description: 'Comprehensive study on machine learning applications',
      category: 'Research'
    },
    {
      id: 'poster-lisbeth',
      title: 'Desarrollo de un sistema de evaluación adaptativa computarizada basada en reglas de asociación secuenciales',
      author: 'Arturo Uriel Reyes-García',
      institution: 'Instituto Tecnológico de Orizaba',
      fileName: 'POSTER_Lisbeth.pdf',
      description: 'IoT-based water quality monitoring system development',
      category: 'Research'
    },
    {
      id: 'poster-hipertension',
      title: 'Hipertensión Arterial: Análisis y Predicción mediante Técnicas de Inteligencia Artificial',
      author: 'Investigador en Salud Digital',
      institution: 'Centro de Investigación Médica',
      fileName: 'PosterHIPERTENSION.pdf',
      description: 'AI-based analysis and prediction of arterial hypertension',
      category: 'Medical AI'
    },
    {
      id: 'atractors-small',
      title: 'Análisis de Atractores en Sistemas Dinámicos Complejos',
      author: 'Dr. Genaro J. Martínez',
      institution: 'Laboratorio de Sistemas Complejos',
      fileName: 'atractorsSmall.pdf',
      description: 'Study of attractors in complex dynamical systems',
      category: 'Research'
    },
    {
      id: 'life-rules-small',
      title: 'Reglas de Vida en Autómatas Celulares: Un Enfoque Computacional',
      author: 'Dr. Genaro J. Martínez',
      institution: 'Laboratorio de Vida Artificial',
      fileName: 'liferulesSmall.pdf',
      description: 'Computational approach to life rules in cellular automata',
      category: 'Research'
    },
    {
      id: 'poster-andres',
      title: 'Aplicaciones de Inteligencia Artificial en Sistemas de Control Industrial',
      author: 'Dr. Andrés José Rodríguez Torres',
      institution: 'Departamento de Ingeniería',
      fileName: 'posterAndres.pdf',
      description: 'AI applications in industrial control systems',
      category: 'Research'
    }
  ];

  const handleDownload = (fileName: string, title: string) => {
    const link = document.createElement('a');
    link.href = `/poster/${fileName}`;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryColor = (category?: string) => {
    const colors: { [key: string]: string } = {
      'Research': 'bg-blue-100 text-blue-800',
      'Case Study': 'bg-green-100 text-green-800',
      'Medical AI': 'bg-red-100 text-red-800',
      'IoT & Sensors': 'bg-purple-100 text-purple-800',
      'Sensors': 'bg-yellow-100 text-yellow-800',
      'Robotics': 'bg-indigo-100 text-indigo-800',
      'Environmental': 'bg-emerald-100 text-emerald-800',
      'Machine Learning': 'bg-orange-100 text-orange-800'
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Conference Posters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest research posters presented at FEW-AI 2025. 
            Click on any poster to download the full PDF version.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{posters.length}</div>
            <div className="text-gray-600">Total Posters</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {new Set(posters.map(p => p.author)).size}
            </div>
            <div className="text-gray-600">Authors</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {new Set(posters.map(p => p.category)).size}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>

        {/* Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[520px]"
            >
              {/* Poster Preview */}
              <div className="h-64 bg-gray-100 relative overflow-hidden flex-shrink-0">
                <iframe
                  src={`/poster/${poster.fileName}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-0 pointer-events-none"
                  title={`Preview of ${poster.title}`}
                  style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
                />
                
                {/* Overlay for click protection and category badge */}
                <div className="absolute inset-0 bg-transparent">
                  {poster.category && (
                    <span className={`absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(poster.category)} shadow-lg`}>
                      {poster.category}
                    </span>
                  )}
                  
                  {/* Download Button Overlay */}
                  <button
                    onClick={() => handleDownload(poster.fileName, poster.title)}
                    className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Poster Info */}
              <div className="p-6 flex-1 flex flex-col relative">
                {/* Title with fixed height and overflow handling */}
                <div className="mb-3 relative">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-3 cursor-pointer group">
                    {poster.title}
                    {/* Tooltip for full title on hover */}
                    <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-20 left-0 top-full mt-2 w-80 max-w-screen-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {poster.title}
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </div>
                  </h3>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm truncate">{poster.author}</span>
                </div>
                
                {poster.institution && (
                  <div className="text-sm text-gray-500 mb-4 truncate">
                    {poster.institution}
                  </div>
                )}

                {/* Spacer to push download button to bottom */}
                <div className="flex-1"></div>

                {/* Download Button - Always at bottom */}
                <button
                  onClick={() => handleDownload(poster.fileName, poster.title)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 mt-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All posters are available in PDF format. Click the download button to access the full version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poster;