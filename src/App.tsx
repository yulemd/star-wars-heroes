import './App.css';

import { PeopleList } from './components/PeopleList';

function App() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-8 px-4 overflow-x-hidden">
      <h1 className="text-6xl text-red-300 p-8">Star Wars Heroes</h1>
      <PeopleList />
    </section>
  );
}

export default App;
