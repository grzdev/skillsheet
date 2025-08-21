
import type { ResumeData, WorkExperience, Education, Award } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

const ModernWriterTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, workExperience, education, skills, awards } = data;
  const accentColor = "#DC143C"; // Crimson Red

  return (
    <div className="font-sans bg-white text-gray-800 p-10 h-full w-full">
      {/* Header */}
      <header className="mb-10">
        <p style={{ color: accentColor }} className="text-xl">Hello,</p>
        <h1 className="text-5xl font-bold text-black mt-1">I'm {personalInfo.name}</h1>
        
        <div className="text-left text-sm text-gray-700 mt-6 space-y-1">
          <p>{personalInfo.contact.address}</p>
          <p>{personalInfo.contact.phone}</p>
          <p>{personalInfo.contact.email}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-8">
        <section>
          <h2 style={{ color: accentColor }} className="text-lg font-bold uppercase tracking-wider mb-3">Skills</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {skills.content as string[]}
          </p>
        </section>

        <section>
          <h2 style={{ color: accentColor }} className="text-lg font-bold uppercase tracking-wider mb-4">Experience</h2>
          <div className="space-y-6">
            {(workExperience.content as WorkExperience[]).map((job, index) => (
              <div key={index}>
                <p className="text-xs text-gray-500">{job.date.toUpperCase()}</p>
                <h3 className="text-md font-bold text-black mt-1">
                  {job.company}, {job.location} &mdash; {job.title}
                </h3>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ color: accentColor }} className="text-lg font-bold uppercase tracking-wider mb-4">Education</h2>
          <div className="space-y-4">
            {(education.content as Education[]).map((edu, index) => (
              <div key={index}>
                <p className="text-xs text-gray-500">{edu.date.toUpperCase()}</p>
                <h3 className="text-md font-bold text-black mt-1">
                  {edu.institution}, {edu.location} &mdash; {edu.degree}
                </h3>
                {edu.description && <p className="text-sm mt-1 text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ color: accentColor }} className="text-lg font-bold uppercase tracking-wider mb-3">Awards</h2>
           <div className="space-y-2">
            {(awards.content as Award[]).map((award, index) => (
              <div key={index} className="text-sm">
                <p><span className="font-bold">{award.name}</span>, {award.from}, {award.year}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ModernWriterTemplate;
