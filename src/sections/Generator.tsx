'use client';

import { useState } from 'react';

export default function Generator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const [count, setCount] = useState(2);
  const [style, setStyle] = useState('Ghibli');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);

  const styleMap: Record<string, string> = {
    Ghibli: 'Studio Ghibli anime style',
    'Van Gogh': 'in the style of Van Gogh',
    Realistic: 'ultra-realistic 8K photograph',
    Cyberpunk: 'futuristic cyberpunk cityscape',
    Surrealism: 'surreal dreamlike art with melting clocks',
    Steampunk: 'vintage steampunk machine illustration',
    Minimalist: 'flat minimalist vector design',
    Fantasy: 'epic fantasy realm with dragons and castles',
    Noir: 'black and white noir film aesthetic',
    Watercolor: 'soft watercolor painting',
    PopArt: 'vibrant pop art style',
    Pixel: 'retro pixel art video game style',
    Gothic: 'dark gothic cathedral scenery',
    Vaporwave: 'neon vaporwave synth aesthetic',
    UkiyoE: 'traditional Japanese ukiyo-e style',
  };

  const generateImages = () => {
    if (!prompt || count < 1 || count > 4) return;

    const width = 640;
    const height = 640;
    const safe = true;
    const nologo = true;

    const basePrompt = prompt.trim();
    const stylePrompt = styleMap[style];
    const qualityEnhancers = 'high quality, 8k, trending on ArtStation, masterpiece, best quality, detailed';
    const negative = negativePrompt
      ? `--no ${negativePrompt}`
      : '--no blurry, lowres, watermark, text, deformed, disfigured';

    const variationTokens = [
      'fantasy', 'cyber', 'pastel', 'noir', 'sci-fi', 'steampunk',
      'macro', 'bird-eye view', '3D render', 'dreamlike', 'cinematic lighting',
    ];

    const urls = Array.from({ length: count }, (_, i) => {
      const token = variationTokens[Math.floor(Math.random() * variationTokens.length)];
      const uniqueToken = `#${Math.random().toString(36).substring(2, 8)}`;
      const fullPrompt = encodeURIComponent(
        `${basePrompt}, ${token}, ${stylePrompt}, ${qualityEnhancers} ${negative} ${uniqueToken}`
      );
      const ref = `ref-${Date.now()}-${i}-${Math.random()}`;
      return `https://image.pollinations.ai/prompt/${fullPrompt}?width=${width}&height=${height}&safe=${safe}&nologo=${nologo}&referrer=${ref}`;
    });

    setImageUrls(urls);
    setLoadingStates(Array(count).fill(true));
  };

  const downloadImage = async (format: 'png' | 'jpeg') => {
    if (!modalImage) return;
    
    setDownloadingImage(true);
    try {
      // Fetch the image as blob
      const response = await fetch(modalImage);
      const blob = await response.blob();
      
      // Create object URL
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.${format}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
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

  const handleImageLoad = (index: number) => {
    const updated = [...loadingStates];
    updated[index] = false;
    setLoadingStates(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            AI Image Generator
          </h1>
          <p className="text-slate-300 text-lg">Create stunning images with artificial intelligence</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700/50 mb-8">
          <div className="space-y-6">
            {/* Prompt Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Main Prompt
                </label>
                <input
                  type="text"
                  placeholder="Describe what you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Negative Prompt (Optional)
                </label>
                <input
                  type="text"
                  placeholder="What to avoid (e.g., blurry, watermark, low quality)"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Art Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {Object.keys(styleMap).map((styleKey) => (
                    <option key={styleKey} value={styleKey} className="bg-slate-700">
                      {styleKey}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Number of Images: {count}
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(count - 1) * 33.33}%, #475569 ${(count - 1) * 33.33}%, #475569 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
              </div>

              <button
                onClick={generateImages}
                disabled={!prompt.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                Generate Images
              </button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 min-h-[400px]">
          {imageUrls.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
              <div className="w-24 h-24 border-4 border-dashed border-slate-600 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Your generated images will appear here</p>
              <p className="text-sm">Enter a prompt and click &quot;Generate Images&quot; to start</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              count === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              count === 2 ? 'grid-cols-1 md:grid-cols-2' :
              count === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  {loadingStates[index] && (
                    <div className="aspect-square bg-slate-700/50 rounded-xl flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
                        <p className="text-slate-300 text-sm">Generating...</p>
                      </div>
                    </div>
                  )}
                  <img
                    src={url}
                    onLoad={() => handleImageLoad(index)}
                    alt={`Generated ${index + 1}`}
                    onClick={() => setModalImage(url)}
                    className={`w-full aspect-square object-cover rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group-hover:ring-2 group-hover:ring-purple-500/50 ${
                      loadingStates[index] ? 'hidden' : 'block'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
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
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
}