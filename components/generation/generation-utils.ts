export const getProgressBorderGradient = (progress: number): string => {
  if (progress === 0) {
    return "radial-gradient(227.54% 59.42% at 42.03% 86.23%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 0 && progress <= 25) {
    return "radial-gradient(381.16% 99.21% at 83.33% 78.99%, #FF6200 0%, rgba(170, 0, 255, 0.5) 48.76%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 25 && progress <= 50) {
    return "radial-gradient(256.72% 316.94% at -26.81% 115.94%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 50 && progress <= 75) {
    return "radial-gradient(134.78% 607.75% at 85.51% -94.93%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else if (progress > 75 && progress < 100) {
    return "radial-gradient(806.32% 145.65% at 94.2% 0%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  } else {
    return "radial-gradient(555.92% 279.47% at 41.3% 100%, #FF6200 0%, rgba(170, 0, 255, 0.5) 30.42%, rgba(0, 0, 0, 0) 100%)";
  }
};

export const getLoadingText = (progress: number): string => {
  if (progress < 30) {
    return "Starting AI audio engine...";
  } else if (progress >= 30 && progress < 60) {
    return "Initializing sound models...";
  } else {
    return "Processing your audio...";
  }
};
