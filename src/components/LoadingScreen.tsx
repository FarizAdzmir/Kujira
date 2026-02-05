import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const frameCount = 150; // Match the actual number of frames available
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        
        img.onload = () => {
          loadedCount++;
          const currentProgress = Math.round((loadedCount / frameCount) * 100);
          setProgress(currentProgress);
          
          if (loadedCount === frameCount) {
            setTimeout(() => {
              setIsHidden(true);
              setTimeout(onLoadComplete, 800);
            }, 500);
          }
        };
        
        img.onerror = () => {
          loadedCount++;
          const currentProgress = Math.round((loadedCount / frameCount) * 100);
          setProgress(currentProgress);
          
          if (loadedCount === frameCount) {
            setTimeout(() => {
              setIsHidden(true);
              setTimeout(onLoadComplete, 800);
            }, 500);
          }
        };
        
        img.src = `/images/frames/frame_${frameNum}.jpg`;
        images.push(img);
      }
    };

    preloadImages();
  }, [onLoadComplete]);

  return (
    <div className={`loader ${isHidden ? 'hidden' : ''}`}>
      <div className="loader__logo">鯨</div>
      <div className="loader__text">Loading Experience</div>
      <div className="loader__progress">
        <div 
          className="loader__progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loader__count">{progress}%</div>
    </div>
  );
}
