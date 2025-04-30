import React from 'react';
import ProcessForm from '../common/ProcessForm';
import StatisticsPanel from '../common/StatisticsPanel';
import { useMemory } from '../../hooks/useMemory';
import { useToast } from '../../context/ToastContext';
import ExternalMemoryBlock from './ExternalMemoryBlock';

const ExternalFragmentation: React.FC = () => {
  const { showToast } = useToast();
  const TOTAL_MEMORY_SIZE = 100;
  
  const { 
    processes, 
    allocatedMemory,
    freeBlocks,
    allocateProcess,
    deallocateProcess,
    resetMemory
  } = useMemory('external', TOTAL_MEMORY_SIZE);

  const handleAllocate = (processName: string, size: number) => {
    try {
      allocateProcess(processName, size);
      showToast('Process allocated successfully!', 'success');
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  const handleDeallocate = (processId: string) => {
    deallocateProcess(processId);
    showToast('Process deallocated successfully!', 'success');
  };

  // Calculate external fragmentation
  const totalFreeMemory = freeBlocks.reduce((acc, block) => acc + block.size, 0);
  const externalFragmentation = freeBlocks
    .filter(block => block.size < 5) // Consider blocks smaller than 5 units as fragmented
    .reduce((acc, block) => acc + block.size, 0);
  
  const fragmentedBlocksCount = freeBlocks.filter(block => block.size < 5).length;
  const allocatedPercentage = (allocatedMemory / TOTAL_MEMORY_SIZE) * 100;
  const externalFragmentationPercentage = (externalFragmentation / TOTAL_MEMORY_SIZE) * 100;

  // Prepare memory visualization
  // Combine processes and free blocks to show a complete memory map
  const memoryMap = [...processes, ...freeBlocks].sort((a, b) => a.startAddress - b.startAddress);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-3">External Fragmentation Simulation</h2>
        <p className="text-gray-300 mb-6">
          External fragmentation occurs when free memory is broken into small pieces. 
          Although the total free memory may be sufficient, it becomes unusable because
          it's divided into non-contiguous blocks.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-navy-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Memory Visualization</h3>
              <div className="flex flex-col space-y-3">
                <div className="flex w-full h-8 bg-navy-700 rounded overflow-hidden">
                  {memoryMap.map((block, index) => (
                    <ExternalMemoryBlock
                      key={`${block.type}-${index}`}
                      block={block}
                      totalMemory={TOTAL_MEMORY_SIZE}
                    />
                  ))}
                </div>
                <div className="flex w-full">
                  <div className="w-0 text-xs">0</div>
                  <div className="flex-grow"></div>
                  <div className="text-xs">{TOTAL_MEMORY_SIZE}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Memory Blocks</h4>
                <div className="space-y-2">
                  {memoryMap.map((block, index) => (
                    <div 
                      key={`block-details-${index}`}
                      className={`p-2 rounded flex justify-between items-center
                        ${block.type === 'process' ? 'bg-navy-700' : 
                          (block.size < 5 ? 'bg-red-900/30' : 'bg-green-900/30')}
                      `}
                    >
                      <div className="flex items-center">
                        {block.type === 'process' && (
                          <>
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: block.color }}
                            ></div>
                            <span>{block.name} ({block.size} units)</span>
                          </>
                        )}
                        {block.type === 'free' && (
                          <span className={block.size < 5 ? 'text-red-300' : 'text-green-300'}>
                            Free Space ({block.size} units)
                            {block.size < 5 && ' - Fragmented'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {block.startAddress} - {block.startAddress + block.size}
                      </div>
                      {block.type === 'process' && (
                        <button
                          className="text-red-400 hover:text-red-300 transition-colors"
                          onClick={() => handleDeallocate(block.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-80">
            <ProcessForm onAllocate={handleAllocate} />
            
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
      
      <StatisticsPanel
        stats={[
          { label: 'Total Memory', value: `${TOTAL_MEMORY_SIZE} units` },
          { label: 'Allocated Memory', value: `${allocatedMemory} units (${allocatedPercentage.toFixed(1)}%)` },
          { label: 'Free Memory', value: `${totalFreeMemory} units (${(100 - allocatedPercentage).toFixed(1)}%)` },
          { label: 'External Fragmentation', value: `${externalFragmentation} units (${externalFragmentationPercentage.toFixed(1)}%)` },
          { label: 'Fragmented Blocks', value: `${fragmentedBlocksCount}` }
        ]}
      />
    </div>
  );
};

export default ExternalFragmentation;