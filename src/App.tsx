import './App.css';

import { PeopleList } from './components/PeopleList';

function App() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-6xl text-red-300">Star Wars Heroes</h1>
      <PeopleList />
    </section>
  );
}

export default App;
