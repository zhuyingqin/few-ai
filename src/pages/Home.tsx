import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Award, Mail, ChevronLeft, ChevronRight, Video, Radio, ArrowUpRight } from 'lucide-react';
import conferenceData from '../data/conference.json';

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 定义轮播图片数组
  const heroImages = [
    '/Final.JPEG',
    '/cinvestav-building.jpg',
    '/Computer.png', // 如果有其他图片，可以替换这里
  ];

  // 自动切换图片
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 10000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // 手动切换到上一张
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  // 手动切换到下一张
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[550px] md:h-[450px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`
            }}
          ></div>
        ))}
        
        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={handlePrevious}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg" />
        </button>
        
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
        </button>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Dots Indicator - Moved inside content container */}
          <div className="flex justify-center gap-2 mb-6">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
          {/* Conference Title with Subtle Academic Style */}
          <div className="mb-8">
            <div className="inline-block bg-gray-800 bg-opacity-80 p-1 rounded-xl shadow-lg mb-4">
              <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg px-8 py-6 border border-gray-300 border-opacity-20">
                <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-200 drop-shadow-sm mb-2">
                  2025 International Workshop on
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight">
                  <span className="text-white">
                    Data Science and AI
                  </span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 drop-shadow-sm mt-1 font-medium">
                  for the Sustainable Food-Energy-Water Nexus
                </p>
              </div>
            </div>
          </div>
          
          {/* Date and Location Information */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              {/* Date Information */}
              <div className="flex items-center bg-gray-700 bg-opacity-60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-gray-400 border-opacity-30 shadow-md hover:bg-opacity-70 transition-all duration-300">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200 mr-2 sm:mr-3 drop-shadow-sm flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow-sm whitespace-nowrap">
                  October 13-14, 2025
                </span>
              </div>
              
              {/* Location Information */}
              <div className="flex items-center bg-gray-700 bg-opacity-60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-gray-400 border-opacity-30 shadow-md hover:bg-opacity-70 transition-all duration-300">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200 mr-2 sm:mr-3 drop-shadow-sm flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow-sm whitespace-nowrap">
                  Cinvestav, Mexico City, Mexico
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/Keynote"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors shadow-md text-center text-sm sm:text-base"
            >
              Keynote Speakers
            </Link>
            <Link
              to="/Panel"
              className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors shadow-md text-center text-sm sm:text-base"
            >
              Panel Speakers
            </Link>
          </div>
        </div>
      </section>

      {/* Conference Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              About the Workshop
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              Food, energy, and water (FEW) are essential resources for humanity's survival and are central to the United Nations Sustainable Development Goals 2030. In Mexico and worldwide, advances in artificial intelligence (AI) and data science are opening unprecedented opportunities to address critical FEW nexus challenges such as wind energy forecasting, land irrigation efficiency, water and air quality monitoring, and plant disease detection.
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              As part of the broader research project on Machine Learning and Big Data Analytics for Sustainable FEW Systems, this international workshop will serve as a platform to exchange knowledge, strengthen collaboration, and promote innovation at the intersection of <strong>data-driven methods and sustainability</strong>.
            </p>
          </div>

          {/* Program Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">Program Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-3">Keynote Lectures</h4>
                <p className="text-gray-600 text-sm">
                  Leading national and international researchers working on AI, data science, and their interdisciplinary applications to sustainable FEW systems.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-3">Industry Perspectives</h4>
                <p className="text-gray-600 text-sm">
                  Invited speakers highlighting the current landscape and trends of AI adoption in Mexico.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-3">Education in AI Era</h4>
                <p className="text-gray-600 text-sm">
                  Panel discussion on how academic institutions can prepare the next generation of scientists and professionals.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-3">AI Opportunities in Mexico</h4>
                <p className="text-gray-600 text-sm">
                  Strategic visions for leveraging AI to support sustainable development in Mexico.
                </p>
              </div>
            </div>
          </div>

          {/* Workshop Objectives */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">Workshop Objectives</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">Promote AI Research</h4>
                <p className="text-gray-600">
                  Foster application-oriented AI research for the FEW nexus, connecting theory with practical solutions.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">Build Research Teams</h4>
                <p className="text-gray-600">
                  Facilitate the creation of a multidisciplinary FEW system research team in Mexico.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">Data Repository</h4>
                <p className="text-gray-600">
                  Inspire new collaborations and contribute to building a FEW data repository to accelerate research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="pt-4 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Location
            </h2>
            {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The workshop will be held at Cinvestav, one of Mexico's premier research institutions, 
              located in the heart of Mexico City.
            </p> */}
          </div>

          <div className="bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Location Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Venue Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Auditorio del Departamento de Ingeniería Eléctrica, Cinvestav, Av Instituto Politécnico Nacional 2508, San Pedro Zacatenco, Gustavo A. Madero, 07360 Ciudad de México.
                    </p>
                  </div>
                </div>
                
                {/* <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-3">Getting There</h4>
                  <p className="text-gray-600 text-sm">
                    Cinvestav is easily accessible by public transportation. The nearest metro station is 
                    "Instituto Politécnico Nacional" on Line 5 (Yellow Line). The venue is also accessible 
                    by bus and taxi services from Mexico City International Airport.
                  </p>
                </div> */}
              </div>

              {/* Map Image */}
              <div className="w-full">
                <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/Map_computer.jpg"
                    alt="CINVESTAV Zacatenco Campus Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Campus map showing the location of Auditorio del Departamento de Ingeniería Eléctrica
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers & Supporters Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Organizers & Supporters
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
              {/* Cinvestav */}
              <div className="flex justify-center">
                <img 
                  src="/cinvestav-logo.png" 
                  alt="Cinvestav Logo" 
                  className="h-24 object-contain"
                />
              </div>

              {/* SMIA */}
              <div className="flex justify-center">
                <img 
                  src="/SMIA-logo.png" 
                  alt="SMIA Logo" 
                  className="h-24 object-contain"
                />
              </div>

              {/* SCITI */}
              <div className="flex justify-center">
                <img 
                  src="/sciti-logo.png" 
                  alt="SCITI Logo" 
                  className="h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Contact Information
            </h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Conference Email Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Conference Email</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                For all conference-related inquiries, please contact us at:
              </p>
              
              <a 
                href="mailto:few.ai@cinvestav.mx" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                few.ai@cinvestav.mx
              </a>
            </div>

            {/* Webmaster Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                <p className="text-base text-blue-800 font-medium">
                  <strong>Webmaster:</strong> Yingqin Zhu, Cinvestav-IPN
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;