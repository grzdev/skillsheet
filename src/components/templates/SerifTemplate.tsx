import type { ResumeData, WorkExperience, Education, Award, Project } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="mb-3">
    <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
      {title}
    </h2>
    <div className="w-12 h-px bg-blue-200 mt-1"></div>
  </div>
);

const SerifTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, workExperience, education, skills, awards, projects } = data;

  return (
    <div className="font-serif bg-white text-gray-800 p-10 h-full w-full flex flex-col">
      {/* Header */}
      <header className="w-full mb-8">
        <h1 className="text-5xl font-bold tracking-tight text-black">{personalInfo.name}</h1>
        <p className="text-md text-gray-500 mt-2">{summary.content as string}</p>
        <div className="text-right text-xs text-gray-500 -mt-8">
          <p>{personalInfo.contact.phone}</p>
          <p>{personalInfo.contact.email}</p>
          <p>{personalInfo.contact.address}</p>
        </div>
      </header>
      
      <div className="flex-1 flex gap-10">
        {/* Left Column (Main Content) */}
        <main className="w-[65%]">
          <section className="mb-6">
            <SectionHeader title="Experience" />
            {(workExperience.content as WorkExperience[]).map((job, index) => (
              <div key={index} className="mb-5">
                <h3 className="text-md font-bold text-black">
                  {job.company}, {job.location} &mdash; {job.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{job.date}</p>
                 <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                    {job.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <SectionHeader title="Education" />
            {(education.content as Education[]).map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-md font-bold text-black">
                  {edu.institution}, {edu.location} &mdash; {edu.degree}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{edu.date}</p>
                {edu.description && <p className="text-sm mt-1 text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </section>
          
           <section>
            <SectionHeader title="Projects" />
            {(projects.content as Project[]).map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-md font-bold text-black">
                  {project.name} &mdash; {project.detail}
                </h3>
                <p className="text-sm mt-1 text-gray-700">{project.description}</p>
              </div>
            ))}
          </section>
        </main>

        {/* Right Column (Sidebar) */}
        <aside className="w-[35%] pl-8 border-l border-gray-200">
           <section className="mb-6">
              <SectionHeader title="Skills" />
              <div className="flex flex-wrap gap-2 text-sm">
                {(skills.content as string[]).map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
           </section>
           
           <section>
             <SectionHeader title="Awards" />
             {(awards.content as Award[]).map((award, index) => (
              <div key={index} className="mb-3">
                <p className="font-bold text-sm">{award.name}</p>
                <p className="text-xs text-gray-600">{award.from}, {award.year}</p>
              </div>
            ))}
           </section>
        </aside>
      </div>
    </div>
  );
};

export default SerifTemplate;
