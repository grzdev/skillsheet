
const ModernWriterTemplatePreview: React.FC = () => {
    const accentColor = "#DC143C";
  
    return (
      <div className="font-sans bg-white text-[6px] text-gray-800 p-4 h-full w-full flex flex-col leading-tight antialiased">
        {/* Header */}
        <header className="mb-4">
          <p style={{ color: accentColor }} className="text-[8px]">Hello,</p>
          <h1 className="text-xl font-bold text-black mt-0.5 leading-none">I'm Your Name</h1>
          <div className="text-[5px] text-gray-600 mt-2">
            <p>123 Main Street</p>
            <p>(123) 456-7890</p>
            <p>your.email@example.com</p>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="space-y-3">
          <section>
            <h2 style={{ color: accentColor }} className="text-[7px] font-bold uppercase mb-1">Skills</h2>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-full" />
          </section>
  
          <section>
            <h2 style={{ color: accentColor }} className="text-[7px] font-bold uppercase mb-1">Experience</h2>
            <div className="space-y-2">
              <div>
                <p className="text-[5px] text-gray-500">2020 - PRESENT</p>
                <h3 className="text-[6px] font-bold text-black">Company, LLC — Job Title</h3>
                <div className="mt-1 h-6 bg-gray-200 rounded animate-pulse w-full" />
              </div>
              <div>
                <p className="text-[5px] text-gray-500">2018 - 2020</p>
                <h3 className="text-[6px] font-bold text-black">Another Co. — Sr. Role</h3>
                <div className="mt-1 h-5 bg-gray-200 rounded animate-pulse w-full" />
              </div>
            </div>
          </section>
  
          <section>
            <h2 style={{ color: accentColor }} className="text-[7px] font-bold uppercase mb-1">Education</h2>
            <div>
              <p className="text-[5px] text-gray-500">2014-2018</p>
              <h3 className="text-[6px] font-bold text-black">University of Tech — B.S. Degree</h3>
            </div>
          </section>
        </main>
      </div>
    );
  };
  
  export default ModernWriterTemplatePreview;
  