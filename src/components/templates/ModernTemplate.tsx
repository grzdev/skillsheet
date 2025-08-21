import type { ResumeData, WorkExperience, Education, Award } from '@/lib/types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, workExperience, education, skills, awards } = data;

  return (
    <div className="font-sans text-gray-800 flex h-full">
      {/* Left Sidebar */}
      <div className="w-[30%] bg-gray-800 text-white p-6 flex flex-col">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white">{personalInfo.name}</h1>
          <h2 className="text-lg text-orange-500 mt-1">{personalInfo.title}</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-2">Contact</h3>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2"><Phone size={14} /> {personalInfo.contact.phone}</p>
              <p className="flex items-center gap-2 text-orange-400"><Mail size={14} /> {personalInfo.contact.email}</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.contact.address}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-2">Skills</h3>
            <div className="text-sm leading-relaxed">
              {(skills.content as string[]).map((skill, index) => (
                <span key={index} className="inline-block bg-gray-700 rounded-md px-2 py-1 mr-2 mb-2">{skill.trim()}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-2">Awards</h3>
            {(awards.content as Award[]).map((award, index) => (
              <div key={index} className="text-sm mb-2">
                <p className="font-bold">{award.name}</p>
                <p>{award.from}, {award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-[70%] bg-white p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4 uppercase tracking-wider">
            Experience
          </h2>
          {(workExperience.content as WorkExperience[]).map((job, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-bold text-orange-600">{job.title}</h3>
              </div>
              <div className="flex justify-between items-baseline text-sm text-gray-600 mb-2">
                 <p className="font-semibold">{job.company}</p>
                 <p>{job.date} | {job.location}</p>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {job.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4 uppercase tracking-wider">
            Education
          </h2>
          {(education.content as Education[]).map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                 <p className="text-sm text-gray-600">{edu.date} | {edu.location}</p>
              </div>
              <p className="font-semibold text-md">{edu.institution}</p>
              {edu.description && <p className="text-sm mt-1 text-gray-700">{edu.description}</p>}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;
