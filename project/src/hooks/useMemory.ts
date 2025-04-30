import { useState, useCallback } from 'react';
import { Process, FreeBlock } from '../types';
import { generateRandomColor } from '../utils/colorUtils';

type MemoryType = 'internal' | 'external';

export const useMemory = (
  type: MemoryType, 
  totalMemory: number, 
  blockSize?: number
) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [pidCounter, setPidCounter] = useState(1);
  const [freeBlocks, setFreeBlocks] = useState<FreeBlock[]>([
    { type: 'free', startAddress: 0, size: totalMemory, id: 'initial-free' }
  ]);

  // Internal fragmentation occurs within allocated blocks
  const calculateInternalFragmentation = useCallback(() => {
    if (type !== 'internal' || !blockSize) return 0;
    
    return processes.reduce((total, process) => {
      const allocatedBlocks = Math.ceil(process.size / blockSize);
      const allocatedSize = allocatedBlocks * blockSize;
      return total + (allocatedSize - process.size);
    }, 0);
  }, [processes, blockSize, type]);

  // Total allocated memory
  const calculateAllocatedMemory = useCallback(() => {
    if (type === 'internal' && blockSize) {
      return processes.reduce((total, process) => {
        const allocatedBlocks = Math.ceil(process.size / blockSize);
        return total + (allocatedBlocks * blockSize);
      }, 0);
    } else {
      return processes.reduce((total, process) => total + process.size, 0);
    }
  }, [processes, blockSize, type]);

  // Allocate a process
  const allocateProcess = useCallback((size: number) => {
    const processName = `P${pidCounter}`;
    
    if (type === 'internal') {
      // For internal fragmentation, allocate in fixed-size blocks
      if (!blockSize) throw new Error('Block size is required for internal fragmentation');
      
      // Calculate how many blocks we need
      const blocksNeeded = Math.ceil(size / blockSize);
      const totalBlocksInMemory = totalMemory / blockSize;
      
      // Find first available block
      const occupiedBlocks = processes.flatMap(p => {
        const blocksForProcess = Math.ceil(p.size / blockSize);
        return Array.from({ length: blocksForProcess }, (_, i) => p.blockIndex + i);
      });
      
      let availableBlockIndex = -1;
      for (let i = 0; i <= totalBlocksInMemory - blocksNeeded; i++) {
        const blocksToCheck = Array.from({ length: blocksNeeded }, (_, j) => i + j);
        if (!blocksToCheck.some(block => occupiedBlocks.includes(block))) {
          availableBlockIndex = i;
          break;
        }
      }
      
      if (availableBlockIndex === -1) {
        throw new Error('Not enough contiguous memory blocks available');
      }
      
      // Allocate the process
      const newProcess: Process = {
        id: `process-${Date.now()}`,
        name: processName,
        size,
        type: 'process',
        color: generateRandomColor(),
        blockIndex: availableBlockIndex,
        startAddress: availableBlockIndex * blockSize
      };
      
      setProcesses(prev => [...prev, newProcess]);
      setPidCounter(prev => prev + 1);
    } else {
      // For external fragmentation, find the first fit in available free blocks
      const sortedFreeBlocks = [...freeBlocks].sort((a, b) => a.size - b.size);
      const suitableBlock = sortedFreeBlocks.find(block => block.size >= size);
      
      if (!suitableBlock) {
        throw new Error('Not enough memory available for this process');
      }
      
      // Allocate the process at the start of the free block
      const newProcess: Process = {
        id: `process-${Date.now()}`,
        name: processName,
        size,
        type: 'process',
        color: generateRandomColor(),
        startAddress: suitableBlock.startAddress
      };
      
      // Update free blocks
      const updatedFreeBlocks = freeBlocks.filter(block => block.id !== suitableBlock.id);
      
      // If there's remaining free space after allocation, create a new free block
      if (suitableBlock.size > size) {
        updatedFreeBlocks.push({
          type: 'free',
          startAddress: suitableBlock.startAddress + size,
          size: suitableBlock.size - size,
          id: `free-${Date.now()}`
        });
      }
      
      setProcesses(prev => [...prev, newProcess]);
      setPidCounter(prev => prev + 1);
      setFreeBlocks(updatedFreeBlocks);
    }
  }, [type, blockSize, totalMemory, processes, freeBlocks, pidCounter]);

  // Deallocate a process
  const deallocateProcess = useCallback((processId: string) => {
    const processToRemove = processes.find(p => p.id === processId);
    if (!processToRemove) return;
    
    if (type === 'internal') {
      // Simply remove the process from our list
      setProcesses(prev => prev.filter(p => p.id !== processId));
    } else {
      // For external fragmentation, we need to create a new free block and potentially merge adjacent ones
      const newFreeBlock: FreeBlock = {
        type: 'free',
        startAddress: processToRemove.startAddress,
        size: processToRemove.size,
        id: `free-${Date.now()}`
      };
      
      // Remove the process
      setProcesses(prev => prev.filter(p => p.id !== processId));
      
      // Add the new free block and merge adjacent ones
      const allFreeBlocks = [...freeBlocks, newFreeBlock];
      
      // Sort by start address to make merging easier
      const sortedBlocks = allFreeBlocks.sort((a, b) => a.startAddress - b.startAddress);
      
      // Merge adjacent blocks
      const mergedBlocks: FreeBlock[] = [];
      let currentBlock = sortedBlocks[0];
      
      for (let i = 1; i < sortedBlocks.length; i++) {
        if (currentBlock.startAddress + currentBlock.size === sortedBlocks[i].startAddress) {
          // Merge these blocks
          currentBlock = {
            ...currentBlock,
            size: currentBlock.size + sortedBlocks[i].size
          };
        } else {
          // No merge possible, add current block to result and move to next
          mergedBlocks.push(currentBlock);
          currentBlock = sortedBlocks[i];
        }
      }
      
      // Add the last block
      mergedBlocks.push(currentBlock);
      
      setFreeBlocks(mergedBlocks);
    }
  }, [type, processes, freeBlocks]);

  // Reset the memory
  const resetMemory = useCallback(() => {
    setProcesses([]);
    setPidCounter(1);
    setFreeBlocks([{ type: 'free', startAddress: 0, size: totalMemory, id: 'initial-free' }]);
  }, [totalMemory]);

  return {
    processes,
    freeBlocks,
    allocatedMemory: calculateAllocatedMemory(),
    internalFragmentation: calculateInternalFragmentation(),
    allocateProcess,
    deallocateProcess,
    resetMemory
  };
};