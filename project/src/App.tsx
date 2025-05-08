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
 <section className="container mx-auto px-6 py-12 border-t border-navy-800">
          <div className="max-w-4xl mx-auto text-gray-300">
            <h2 className="text-3xl font-bold text-purple-500 mb-10 text-center">About Us</h2>

            <div className="space-y-6 text-lg leading-relaxed">
              <div>
                <h3 className="font-semibold text-purple-400">🏫 College</h3>
                <p className="pl-6">Modern College of Engineering, Pune</p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400">👩‍🏫 Guide</h3>
                <p className="pl-6">Mrs. Ashwini Garkhedkar</p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400">📚 Class & Division</h3>
                <p className="pl-6">MCA FY – Division B</p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400">👥 Team Members</h3>
                <ul className="pl-10 list-disc list-inside">
                  <li>51166 – Gaurav Waghulde</li>
                  <li>51150 – Vivek Patil</li>
                  <li>51159 – Om Shinde</li>
                  <li>51163 – Anup Tharkude</li>
                  <li>51132 – Nikhil Kemkar</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400">🖥️ Project Title</h3>
                <p className="pl-6">Memory Fragmentation Simulator</p>
              </div>

              <div className="pt-2">
                <p className="pl-1">
                  This project visualizes internal and external fragmentation in memory allocation to enhance understanding of Operating System concepts.
                </p>
              </div>
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
