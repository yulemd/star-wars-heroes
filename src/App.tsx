import { PeopleList } from './components/PeopleList';
import { StarField } from './components/StarField';

function App() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden perspective-1000">
      <StarField />

      {/* Depth gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />

      {/* Comet */}
      <div
        className="absolute w-1 h-1 bg-white rounded-full animate-comet"
        style={{ top: '20%', left: '-5%', animationDelay: '3s' }}
      />

      {/* CSS-scanner */}
      <div className="fixed top-0 left-0 right-0 h-1 pointer-events-none z-50">
        <div className="scanner" />
      </div>

      {/* Content */}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 drop-shadow-lg animate-fade-in pt-24">
          Star Wars Heroes
        </h1>
        <div className="text-xl text-gray-300 w-full max-w-[95vw]">
          <PeopleList />
        </div>
      </section>
    </main>
  );
}

export default App;
