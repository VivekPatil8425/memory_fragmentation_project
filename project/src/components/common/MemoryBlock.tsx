import React from 'react';
import { Process } from '../../types';

interface MemoryBlockProps {
  blockSize: number;
  process?: Process;
  blockIndex: number;
  type: 'internal' | 'external';
}

const MemoryBlock: React.FC<MemoryBlockProps> = ({ 
  blockSize, 
  process, 
  blockIndex,
  type
}) => {
  if (!process) {
    // Empty block
    return (
      <div 
        className="h-16 rounded bg-navy-700 flex items-center justify-center transition-all duration-300 hover:bg-navy-600 hover:shadow-lg hover:scale-[1.02]"
        title={`Empty block ${blockIndex} (${blockSize} units available)`}
      >
        <span className="text-sm text-gray-400">
          Free ({blockSize} units)
        </span>
      </div>
    );
  }

  // For internal fragmentation, calculate if this block has internal fragmentation
  const isLastBlock = type === 'internal' && 
    blockIndex === process.blockIndex + Math.ceil(process.size / blockSize) - 1;
  
  const lastBlockSize = type === 'internal' && isLastBlock
    ? process.size % blockSize || blockSize
    : blockSize;
  
  const internalFragmentation = type === 'internal' && isLastBlock
    ? blockSize - lastBlockSize
    : 0;

  const hasInternalFragmentation = internalFragmentation > 0;
  
  const tooltipText = hasInternalFragmentation
    ? `${process.name} - ${lastBlockSize} units used, ${internalFragmentation} units free`
    : `${process.name} - ${blockSize} units used`;

  return (
    <div 
      className="h-16 rounded overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      title={tooltipText}
    >
      {/* Process block */}
      <div 
        className="h-full w-full flex items-center justify-center"
        style={{ backgroundColor: process.color }}
      >
        <span className="text-sm font-medium text-white z-10">
          {process.name} ({lastBlockSize} units)
        </span>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      
      {/* Internal fragmentation visualization */}
      {hasInternalFragmentation && (
        <div 
          className="absolute bottom-0 right-0 bg-black bg-opacity-30 flex items-center justify-center"
          style={{ 
            height: '100%',
            width: `${(internalFragmentation / blockSize) * 100}%` 
          }}
        >
          <span className="text-xs text-white opacity-90 px-1 text-center">
            Free<br/>({internalFragmentation} units)
          </span>
        </div>
      )}
    </div>
  );
};

export default MemoryBlock;