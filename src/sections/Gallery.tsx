'use client';

import { useState, useEffect } from 'react';

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);

  useEffect(() => {
    // Load 16 static PNG images from /public/gallery/
    const imageList = Array.from({ length: 16 }, (_, i) => `/gallery/${i + 1}.png`);
    setImages(imageList);
  }, []);

  const downloadImage = async (format: 'png' | 'jpeg') => {
    if (!modalImage) return;
    setDownloadingImage(true);
    try {
      const response = await fetch(modalImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gallery-image-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setShowDownloadOptions(false);
      setModalImage(null);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Image Gallery
          </h1>
          <p className="text-slate-300 text-lg">Explore uploaded artwork</p>
        </div>

        {/* Gallery Grid */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {images.map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-slate-700/30 aspect-square">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    onClick={() => setModalImage(image)}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400">Total Images: {images.length}</p>
        </div>

        {/* Modal */}
        {modalImage && (
          <div
            onClick={() => { setModalImage(null); setShowDownloadOptions(false); }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div onClick={(e) => e.stopPropagation()} className="relative max-w-4xl max-h-[90vh]">
              <img
                src={modalImage}
                alt="Full size preview"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Download Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                  disabled={downloadingImage}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50"
                >
                  {downloadingImage ? 'Downloading...' : 'Download'}
                </button>

                {showDownloadOptions && !downloadingImage && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl overflow-hidden min-w-[140px] border">
                    <button
                      onClick={() => downloadImage('png')}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors font-medium"
                    >
                      Download PNG
                    </button>
                    <button
                      onClick={() => downloadImage('jpeg')}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors font-medium border-t"
                    >
                      Download JPEG
                    </button>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => { setModalImage(null); setShowDownloadOptions(false); }}
                className="absolute top-4 left-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
