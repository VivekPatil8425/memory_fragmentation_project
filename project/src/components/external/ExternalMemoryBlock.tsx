import React from 'react';
import { Process, FreeBlock } from '../../types';

interface ExternalMemoryBlockProps {
  block: Process | FreeBlock;
  totalMemory: number;
}

const ExternalMemoryBlock: React.FC<ExternalMemoryBlockProps> = ({ block, totalMemory }) => {
  const widthPercentage = (block.size / totalMemory) * 100;
  
  if (block.type === 'process') {
    return (
      <div 
        style={{ 
          width: `${widthPercentage}%`,
          backgroundColor: block.color,
        }}
        className="relative group h-full transition-all duration-200 flex items-center justify-center overflow-hidden"
        title={`${block.name} (${block.size} units)`}
      >
        {widthPercentage > 5 && (
          <span className="text-xs font-medium text-white truncate px-1">
            {block.name}
          </span>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>
    );
  } else {
    // Free block
    const isFragmented = block.size < 5;
    
    return (
      <div 
        style={{ 
          width: `${widthPercentage}%`,
        }}
        className={`h-full transition-all duration-200 relative ${
          isFragmented 
            ? 'bg-red-500/30 hover:bg-red-500/40' 
            : 'bg-green-500/30 hover:bg-green-500/40'
        }`}
        title={`Free space (${block.size} units)`}
      >
        {isFragmented && widthPercentage > 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] text-red-200">Frag</span>
          </div>
        )}
      </div>
    );
  }
};

export default ExternalMemoryBlock;