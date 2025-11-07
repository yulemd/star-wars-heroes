import { FlowExample } from './components/flow/FlowExample';

import './App.css';

function App() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-8xl text-red-600">Vite + React</h1>
      <FlowExample />
    </section>
  );
}

export default App;
