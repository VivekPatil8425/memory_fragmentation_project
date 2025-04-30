export const generateRandomColor = (): string => {
  // Generate colors in the purple/blue spectrum for consistency with theme
  const hue = Math.floor(Math.random() * 60) + 230; // Between 230-290 (blue to purple)
  const saturation = Math.floor(Math.random() * 30) + 70; // High saturation
  const lightness = Math.floor(Math.random() * 20) + 45; // Medium lightness
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};