import { useEffect, useState } from 'react';

import './App.css';

import { PeopleList } from './components/PeopleList';

function App() {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      size: number;
      duration: number;
      delay: number;
      top: number;
      left: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 300 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.8 + 0.2,
      }));
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden perspective-1000">
      {/* Stars sky */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Additional gradient for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />
      <div
        className="absolute w-1 h-1 bg-white rounded-full animate-comet"
        style={{ top: '20%', left: '-5%', animationDelay: '3s' }}
      />

      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 drop-shadow-lg animate-fade-in pt-24">
          Star Wars Heroes
        </h1>
        <div className="text-xl text-gray-300">
          <PeopleList />
        </div>
      </section>
    </main>
  );
}

// Animated styles
const styles = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-twinkle { animation: twinkle var(--duration) infinite; }
  .animate-fade-in { animation: fade-in 1s ease-out forwards; }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default App;
