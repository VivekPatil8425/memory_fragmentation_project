export interface Process {
  id: string;
  name: string;
  size: number;
  type: 'process';
  color: string;
  startAddress: number;
  blockIndex?: number; // Used for internal fragmentation
}

export interface FreeBlock {
  id: string;
  type: 'free';
  startAddress: number;
  size: number;
}