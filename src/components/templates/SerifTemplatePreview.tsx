
const SerifTemplatePreview: React.FC = () => {
  return (
    <div className="font-serif bg-white text-[6px] text-gray-800 p-3 h-full w-full flex flex-col leading-tight">
      {/* Header */}
      <header className="w-full mb-3">
        <h1 className="text-xl font-bold text-black">Your Name</h1>
        <p className="text-[7px] text-gray-500 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit.</p>
        <div className="text-right text-[5px] text-gray-500 -mt-4">
          <p>123-456-7890</p>
          <p>your.email@example.com</p>
        </div>
      </header>
      
      <div className="flex-1 flex gap-4">
        {/* Left Column (Main Content) */}
        <main className="w-[65%]">
          <section className="mb-3">
            <div className="mb-1">
                <h2 className="text-[7px] font-bold uppercase text-blue-600">Experience</h2>
                <div className="w-6 h-px bg-blue-200 mt-0.5"></div>
            </div>
            <div className="mb-2">
                <h3 className="text-[7px] font-bold text-black">Company, Location — Job Title</h3>
                <p className="text-[6px] text-gray-500">2020 - Present</p>
                <div className="mt-1 h-5 bg-gray-200 rounded animate-pulse w-full" />
            </div>
             <div className="mb-2">
                <h3 className="text-[7px] font-bold text-black">Another Co, Location — Sr. Role</h3>
                <p className="text-[6px] text-gray-500">2018 - 2020</p>
                <div className="mt-1 h-5 bg-gray-200 rounded animate-pulse w-full" />
            </div>
          </section>

          <section>
             <div className="mb-1">
                <h2 className="text-[7px] font-bold uppercase text-blue-600">Education</h2>
                <div className="w-6 h-px bg-blue-200 mt-0.5"></div>
            </div>
            <div className="mb-2">
                <h3 className="text-[7px] font-bold text-black">University, Place — B.S. Degree</h3>
                <p className="text-[6px] text-gray-500">2014 - 2018</p>
            </div>
          </section>
        </main>

        {/* Right Column (Sidebar) */}
        <aside className="w-[35%] pl-2 border-l border-gray-200">
           <section>
              <div className="mb-1">
                <h2 className="text-[7px] font-bold uppercase text-blue-600">Skills</h2>
                <div className="w-6 h-px bg-blue-200 mt-0.5"></div>
              </div>
              <div className="flex flex-wrap gap-1 text-[6px]">
                  <span className="bg-blue-50 text-blue-800 px-1 py-0.5 rounded-full font-medium">React</span>
                  <span className="bg-blue-50 text-blue-800 px-1 py-0.5 rounded-full font-medium">TypeScript</span>
                  <span className="bg-blue-50 text-blue-800 px-1 py-0.5 rounded-full font-medium">Node.js</span>
              </div>
           </section>
        </aside>
      </div>
    </div>
  );
};

export default SerifTemplatePreview;
