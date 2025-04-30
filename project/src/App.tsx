import React from 'react';
import Header from './components/Header';
import SimulationContainer from './components/SimulationContainer';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-navy-950 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <SimulationContainer />
        </main>
        <section className="container mx-auto px-4 py-12 border-t border-navy-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 text-purple-500">About Us</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We are a group of enthusiastic students passionate about learning and building creative projects together.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400">Team Members:</p>
              <p className="text-gray-300">
                Vivek Patil, Gaurav Waghulde, Om Shinde, Anup Tharkude, and Nikhil Kemkar
              </p>
            </div>
          </div>
        </section>
        <footer className="py-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Memory Fragmentation Simulation</p>
        </footer>
      </div>
    </ToastProvider>
  );
}

export default App;