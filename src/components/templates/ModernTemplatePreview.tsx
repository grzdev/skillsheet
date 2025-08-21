
import { Phone, Mail, MapPin } from 'lucide-react';

const ModernTemplatePreview: React.FC = () => {
  return (
    <div className="font-sans text-[6px] flex h-full bg-white w-full leading-tight">
      {/* Left Sidebar */}
      <div className="w-[30%] bg-gray-800 text-white p-2 flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-base font-bold tracking-tighter text-white">Your Name</h1>
          <h2 className="text-[8px] text-orange-500 mt-0.5">Creative Director</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-[8px] font-semibold uppercase tracking-wider mb-1">Contact</h3>
            <div className="text-[7px] space-y-1">
              <p className="flex items-center gap-1"><Phone size={8} /> (123) 456-7890</p>
              <p className="flex items-center gap-1 text-orange-400"><Mail size={8} /> hello@example.com</p>
              <p className="flex items-center gap-1"><MapPin size={8} /> 123 Main St, Anytown</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-[8px] font-semibold uppercase tracking-wider mb-1">Skills</h3>
            <div className="text-[7px] leading-relaxed flex flex-wrap gap-1">
                <span className="inline-block bg-gray-700 rounded-sm px-1 py-0.5">React</span>
                <span className="inline-block bg-gray-700 rounded-sm px-1 py-0.5">Next.js</span>
                <span className="inline-block bg-gray-700 rounded-sm px-1 py-0.5">Node.js</span>
            </div>
          </div>

          <div>
            <h3 className="text-[8px] font-semibold uppercase tracking-wider mb-1">Awards</h3>
            <div className="text-[7px] mb-1">
                <p className="font-bold">Webby Award</p>
                <p className="text-gray-300">The Webby Awards, 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-[70%] bg-white p-3 text-gray-800">
        <section className="mb-3">
          <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-1 uppercase tracking-wider">
            Experience
          </h2>
            <div className="mb-2">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-orange-600">Lead Developer</h3>
              </div>
              <div className="flex justify-between items-baseline text-[7px] text-gray-600">
                 <p className="font-semibold">Tech Corp</p>
                 <p>2020 - Present | SF</p>
              </div>
              <div className="mt-1 h-6 bg-gray-200 rounded animate-pulse w-full" />
            </div>
             <div className="mb-2">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-orange-600">Web Developer</h3>
              </div>
              <div className="flex justify-between items-baseline text-[7px] text-gray-600">
                 <p className="font-semibold">Innovate LLC</p>
                 <p>2018 - 2020 | Remote</p>
              </div>
               <div className="mt-1 h-6 bg-gray-200 rounded animate-pulse w-full" />
            </div>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-1 uppercase tracking-wider">
            Education
          </h2>
            <div className="mb-2">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold">B.S. Computer Science</h3>
                 <p className="text-[7px] text-gray-600">2014-2018 | Boston, MA</p>
              </div>
              <p className="font-semibold text-[8px]">University of Tech</p>
            </div>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplatePreview;
