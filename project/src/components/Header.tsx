import React from 'react';
import { MemoryStick as Memory } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-navy-900 py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Memory className="h-8 w-8 text-purple-500" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Memory Fragmentation Simulation
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;