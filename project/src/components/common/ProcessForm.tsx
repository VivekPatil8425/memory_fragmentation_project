import React, { useState } from 'react';

interface ProcessFormProps {
  onAllocate: (size: number) => void;
  blockSize?: number;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ onAllocate, blockSize }) => {
  const [size, setSize] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sizeNum = parseInt(size, 10);
    if (isNaN(sizeNum) || sizeNum <= 0) {
      setError('Size must be a positive number');
      return;
    }
    
    if (blockSize && sizeNum > blockSize * 5) {
      setError(`Size cannot exceed ${blockSize * 5} units`);
      return;
    }
    
    onAllocate(sizeNum);
    setSize('');
    setError(null);
  };

  return (
    <div className="bg-navy-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Allocate Process</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="process-size" className="block text-sm font-medium text-gray-300 mb-1">
            Size (memory units)
          </label>
          <input
            id="process-size"
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-2 bg-navy-700 rounded border border-navy-600 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
            placeholder="Enter size"
            min="1"
            max={blockSize ? blockSize * 5 : 100}
          />
          {blockSize && (
            <p className="text-xs text-gray-400 mt-1">
              Size will be rounded to block size ({blockSize} units) if needed
            </p>
          )}
        </div>
        
        {error && (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
        >
          Allocate
        </button>
      </form>
    </div>
  );
};

export default ProcessForm;