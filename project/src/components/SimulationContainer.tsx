import React, { useState } from 'react';
import InternalFragmentation from './internal/InternalFragmentation';
import ExternalFragmentation from './external/ExternalFragmentation';

const SimulationContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');

  return (
    <div className="space-y-8">
      <div className="bg-navy-900 rounded-lg p-4 shadow-lg">
        <div className="flex mb-6 border-b border-navy-700">
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'internal'
                ? 'text-purple-500 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('internal')}
          >
            Internal Fragmentation
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'external'
                ? 'text-purple-500 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('external')}
          >
            External Fragmentation
          </button>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'internal' ? (
            <InternalFragmentation />
          ) : (
            <ExternalFragmentation />
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationContainer;