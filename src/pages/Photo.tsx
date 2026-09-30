import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Clock, Calendar, Grid, List, ExternalLink } from 'lucide-react';

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
  time: string;
  description: string;
}

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  photos: PhotoItem[];
}

const Photo: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [viewMode, setViewMode] = useState<'timeline' | 'gallery'>('timeline');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 静态图片数据
  const buildStaticPhotoData = () => {
    const photoData: PhotoItem[] = [];
    let id = 1;

    // Define timeline events and corresponding photos
    const timelineData = [
      // Day 1 - October 13, 2025
      {
        time: "09:30",
        title: "Venue Setup",
        description: "Staff conducting final venue setup and equipment testing",
        category: "setup",
        files: ['setup1.jpg', 'setup2.jpg', 'setup3.jpg', 'setup4.JPG']
      },
      {
        time: "10:00",
        title: "Opening Session",
        description: "Conference officially begins, attendees arriving at the venue",
        category: "venue",
        files: ['Open.jpg', 'Open3.jpg', 'open1.jpg', 'open4.jpg', 'open5.jpg']
      },
      {
        time: "10:30",
        title: "Keynote1",
        description: "Data Science for Wind Energy - Dr. Yu Ding (Online, English)",
        category: "speakers",
        files: ['keynote1_1.jpg', 'keynote1_2.jpg', 'keynote1_3.jpg', 'keynote1_4.jpg', 'keynote1_5.jpg']
      },
      {
        time: "11:30",
        title: "Coffee Break",
        description: "Attendees networking and enjoying refreshments",
        category: "venue",
        files: ['Coffeebreak.jpg', 'Coffeebreak2.jpg', 'Coffeebreak3.jpg', 'Coffeebreak4.jpg']
      },
      {
        time: "12:00",
        title: "Keynote3",
        description: "Brave new world, use of AI in agricultural research - Dr. Kai Sonder",
        category: "speakers",
        files: ['keynote3_1.jpg', 'keynote3_2.jpg', 'keynote3_3.jpg', 'keynote3_4.jpg', 'keynote3_5.jpg', 'keynote3_6.jpg']
      },
      // Day 2 - October 14, 2025
      {
        time: "10:30-day2",
        title: "Keynote2",
        description: "AI, Metaverse and Education - Dr. Juan Humberto Sossa Azuela",
        category: "speakers",
        files: ['keynote2_1.jpg', 'keynote2_2.jpg', 'keynote2_3.jpg', 'keynote2_4.jpg', 'keynote2_5.jpg']
      },
      {
        time: "11:30-day2",
        title: "Panel1",
        description: "Education in the AI Era - Expert panel discussion",
        category: "speakers",
        files: ['Panel1_1.jpg', 'Panel1_2.jpg', 'Panel1_3.jpg', 'Panel1_4.jpg', 'Panel1_5.jpg', 'Panel1_6.jpg', 'Panel1_7.jpg', 'Panel1_8.jpg', 'Panel1_9.jpg', 'Panel1_10.jpg', 'Panel1_11.jpg', 'Panel1_12.jpg', 'Panel1_13.jpg', 'Panel1_14.jpg']
      },
      {
        time: "12:00-day2",
        title: "Keynote4",
        description: "Navigating the Data Gaps: Time Series Forecasting with Incomplete Information - Dr. Xiaoou Li",
        category: "speakers",
        files: ['keynote4_1.jpg', 'keynote4_2.jpg', 'keynote4_3.jpg']
      },
      {
        time: "15:00-day2",
        title: "Panel2",
        description: "Opportunities for AI application in Mexico - Expert panel discussion",
        category: "speakers",
        files: ['Panel2_1.jpg', 'Panel2_2.jpg', 'Panel2_3.jpg', 'Panel2_4.jpg', 'Panel2_5.jpg', 'Panel2_6.jpg', 'Panel2_7.jpg', 'Panel2_8.jpg', 'Panel2_9.jpg', 'Panel2_10.jpg', 'Panel2_11.jpg']
      },
      {
        time: "15:30-day2",
        title: "Poster Session",
        description: "Research poster presentations and academic discussions",
        category: "Poster",
        files: ['Poster1.JPG', 'Poster2.JPG', 'Poster3.JPG', 'Poster4.JPG', 'Poster5.JPG', 'Poster6.JPG', 'Poster7.JPG', 'Poster8.JPG', 'Poster9.JPG', 'Poster10.jpg']
      },
      // Additional venue photos
      {
        time: "16:00",
        title: "Venue Atmosphere",
        description: "Conference venue environment and atmosphere during the event",
        category: "venue",
        files: ['venue1.jpg', 'venue2.jpg', 'venue3.jpg']
      }
    ];

    // 为每个时间线事件生成照片数据
    timelineData.forEach((event) => {
      event.files.forEach((filename) => {
        const title = filename
          .replace(/\.[^/.]+$/, '')
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        photoData.push({
          id: id++,
          src: `/photos/${event.category}/${filename}`,
          title: title,
          category: event.category,
          date: "2024-12-20",
          time: event.time,
          description: event.description
        });
      });
    });

    return photoData;
  };

  // 构建时间线事件数据
  const buildTimelineEvents = (photos: PhotoItem[]): TimelineEvent[] => {
    const eventsMap = new Map<string, TimelineEvent>();
    
    photos.forEach(photo => {
      const key = photo.time;
      if (!eventsMap.has(key)) {
        eventsMap.set(key, {
          time: photo.time,
          title: getEventTitle(photo.time),
          description: photo.description,
          photos: []
        });
      }
      eventsMap.get(key)!.photos.push(photo);
    });

    return Array.from(eventsMap.values()).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getEventTitle = (time: string): string => {
    const timeMap: { [key: string]: string } = {
      "09:30": "Venue Setup", 
      "10:00": "Opening Session",
      "10:30": "Keynote1",
      "11:30": "Coffee Break",
      "12:00": "Keynote3",
      "10:30-day2": "Keynote2",
      "11:30-day2": "Panel1",
      "12:00-day2": "Keynote4",
      "15:00-day2": "Panel2",
      "15:30-day2": "Poster Session",
      "16:00": "Venue Atmosphere"
    };
    return timeMap[time] || "Conference Activity";
  };

  useEffect(() => {
    // Use static data directly, no need for async loading
    const staticData = buildStaticPhotoData();
    setPhotos(staticData);
    
    // Build timeline event data
    const events = buildTimelineEvents(staticData);
    setTimelineEvents(events);
    
    // Show loading state briefly then complete
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  // Handle photo click
  const handlePhotoClick = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    const photoIndex = photos.findIndex(p => p.id === photo.id);
    setCurrentSlideIndex(photoIndex);
  };

  // Close photo viewer
  const closePhotoViewer = () => {
    setSelectedPhoto(null);
  };

  // Navigate to previous photo
  const goToPrevious = () => {
    const newIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : photos.length - 1;
    setCurrentSlideIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // Navigate to next photo
  const goToNext = () => {
    const newIndex = currentSlideIndex < photos.length - 1 ? currentSlideIndex + 1 : 0;
    setCurrentSlideIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedPhoto) {
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'Escape') closePhotoViewer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto, currentSlideIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Conference Photos</h1>
              <p className="text-gray-600 mt-1">Memorable moments from 2025 Few-AII</p>
              <p className="text-blue-600 mt-2">
                <a 
                  href="https://drive.google.com/drive/folders/1FB2u019zRL47p72X0PxEzGjIgxTYilee?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-800 underline flex items-center gap-1"
                >
                  <ExternalLink size={16} />
                  All photos
                </a>
              </p>
            </div>
            
            {/* 视图切换按钮 */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                  <List className="w-4 h-4 mr-2" />
                  Timeline View
                </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'gallery'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                  <Grid className="w-4 h-4 mr-2" />
                  Gallery View
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'timeline' ? (
          /* Timeline View */
          <div className="space-y-12">
            {timelineEvents.map((event, eventIndex) => (
              <div key={event.time} className="relative">
                 {/* Timeline connecting line */}
                 {eventIndex < timelineEvents.length - 1 && (
                   <div className="absolute left-6 top-16 w-0.5 h-full bg-blue-200 -z-10"></div>
                 )}
                 
                 {/* Time point */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                   
                   {/* Event content */}
                   <div className="ml-6 flex-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {event.time.includes("-day2") ? "2025 Oct 14" : "2025 Oct 13"} {event.time.replace("-day2", "")}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.photos.length} photos
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{event.description}</p>
                      
                      {/* Photo grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {event.photos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative group cursor-pointer"
                            onClick={() => handlePhotoClick(photo)}
                          >
                            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Gallery View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group cursor-pointer"
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-600">{photo.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo viewer modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closePhotoViewer}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main image */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain"
            />

            {/* Photo info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">{selectedPhoto.title}</h3>
              <p className="text-sm opacity-90">{selectedPhoto.time} - {selectedPhoto.description}</p>
              <p className="text-xs opacity-75 mt-1">
                {currentSlideIndex + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;