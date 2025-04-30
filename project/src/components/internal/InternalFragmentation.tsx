import React from 'react';
import ProcessForm from '../common/ProcessForm';
import StatisticsPanel from '../common/StatisticsPanel';
import MemoryBlock from '../common/MemoryBlock';
import { useMemory } from '../../hooks/useMemory';
import { useToast } from '../../context/ToastContext';

const InternalFragmentation: React.FC = () => {
  const { showToast } = useToast();
  const TOTAL_MEMORY_SIZE = 100;
  const BLOCK_SIZE = 20; // Fixed block size
  
  const { 
    processes, 
    allocatedMemory,
    internalFragmentation,
    allocateProcess,
    deallocateProcess,
    resetMemory
  } = useMemory('internal', TOTAL_MEMORY_SIZE, BLOCK_SIZE);

  const handleAllocate = (size: number) => {
    try {
      allocateProcess(size);
      showToast('Process allocated successfully!', 'success');
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  const handleDeallocate = (processId: string) => {
    deallocateProcess(processId);
    showToast('Process deallocated successfully!', 'success');
  };

  const freeMemory = TOTAL_MEMORY_SIZE - allocatedMemory;
  const allocatedPercentage = (allocatedMemory / TOTAL_MEMORY_SIZE) * 100;
  const freePercentage = (freeMemory / TOTAL_MEMORY_SIZE) * 100;
  const internalFragmentationPercentage = (internalFragmentation / TOTAL_MEMORY_SIZE) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-3">Internal Fragmentation Simulation</h2>
        <p className="text-gray-300 mb-6">
          Internal fragmentation occurs when memory is allocated in fixed-size blocks. 
          When a process doesn't use all of its allocated block, the unused portion 
          becomes internal fragmentation.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-navy-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Memory Visualization</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: TOTAL_MEMORY_SIZE / BLOCK_SIZE }).map((_, index) => {
                  const blockIndex = index;
                  const process = processes.find(p => 
                    p.blockIndex <= blockIndex && 
                    blockIndex < p.blockIndex + Math.ceil(p.size / BLOCK_SIZE)
                  );
                  
                  return (
                    <MemoryBlock
                      key={blockIndex}
                      blockSize={BLOCK_SIZE}
                      process={process}
                      blockIndex={blockIndex}
                      type="internal"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="md:w-80 flex flex-col gap-6">
            <ProcessForm 
              onAllocate={handleAllocate} 
              blockSize={BLOCK_SIZE}
            />
            
            <div className="bg-navy-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Active Processes</h3>
              {processes.length === 0 ? (
                <p className="text-gray-400">No active processes</p>
              ) : (
                <ul className="space-y-2">
                  {processes.map(process => (
                    <li 
                      key={process.id} 
                      className="flex justify-between items-center p-2 bg-navy-700 rounded"
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: process.color }}
                        ></div>
                        <span>{process.name} ({process.size} units)</span>
                      </div>
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => handleDeallocate(process.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="mt-4 w-full px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                onClick={() => {
                  resetMemory();
                  showToast('Memory reset successful!', 'success');
                }}
              >
                Reset Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <StatisticsPanel
        stats={[
          { label: 'Total Memory', value: `${TOTAL_MEMORY_SIZE} units` },
          { label: 'Allocated Memory', value: `${allocatedMemory} units (${allocatedPercentage.toFixed(1)}%)` },
          { label: 'Free Memory', value: `${freeMemory} units (${freePercentage.toFixed(1)}%)` },
          { label: 'Internal Fragmentation', value: `${internalFragmentation} units (${internalFragmentationPercentage.toFixed(1)}%)` }
        ]}
      />
    </div>
  );
};

export default InternalFragmentation;