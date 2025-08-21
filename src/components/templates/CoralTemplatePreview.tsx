
const CoralTemplatePreview: React.FC = () => {
    return (
      <div className="font-serif bg-white text-[6px] text-gray-800 p-4 h-full w-full flex flex-col leading-tight antialiased">
        {/* Header */}
        <header className="w-full mb-2 text-left">
          <h1 className="text-[8px] font-bold text-black">Your Name</h1>
          <p className="text-[7px] text-gray-600">Professor Name</p>
          <p className="text-[7px] text-gray-600">Subject Name</p>
          <p className="text-[7px] text-gray-600">04 September 20XX</p>
        </header>
        
        {/* Title */}
        <h2 className="text-center text-[8px] my-4">Title of Your Report</h2>
  
        {/* Body */}
        <main>
          <div className="mb-2">
            <h3 className="font-bold text-[7px] uppercase mb-1">SECTION HEADER</h3>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
          </div>
          <div className="mb-2">
            <h3 className="font-bold text-[7px] uppercase mb-1">ANOTHER SECTION</h3>
            <div className="h-12 bg-gray-200 rounded animate-pulse w-full" />
          </div>
        </main>
      </div>
    );
  };
  
  export default CoralTemplatePreview;
  