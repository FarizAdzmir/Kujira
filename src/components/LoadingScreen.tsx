import { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onLoadComplete: (images: HTMLImageElement[]) => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Prevent double-invocation in StrictMode from loading images twice
    if (hasStarted.current) return;
    hasStarted.current = true;

    const frameCount = 151;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i <= 150; i++) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const frameNum = String(i).padStart(3, '0');

      const onComplete = () => {
        loadedCount++;
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);

        if (loadedCount === frameCount) {
          setTimeout(() => {
            setIsHidden(true);
            setTimeout(() => onLoadComplete(images), 800);
          }, 500);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete;
      img.src = `/images/frames/frame_${frameNum}.jpg`;
      images.push(img);
    }
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
