const LoadingSpinner = ({ fullScreen = true, size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-primary/20 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
      </div>
      <p className="text-base-content/60 font-medium text-sm">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
