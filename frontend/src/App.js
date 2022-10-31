import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto text-center drop-shadow-lg text-gray-800">
        <h1 className="text-3xl py-8 mb-10 bg-white-800 text-white head-title">Daily Expense Tracker</h1>

        {/* GRID  */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* CHART  */}
          <Graph></Graph>
          {/* FORM  */}
          <Form></Form>
        </div>

      </div>
    </div>
  );
}

export default App;
