
import type { ResumeData, WorkExperience, Education, Project } from '@/lib/types';

interface TemplateProps {
  data: ResumeData;
}

const CoralTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, workExperience, education, projects } = data;

  return (
    <div className="font-serif bg-white text-gray-800 p-12 h-full w-full text-justify text-sm leading-relaxed">
      {/* Header */}
      <header className="w-full mb-4 text-left">
        <h1 className="text-lg font-bold tracking-tight text-black">{personalInfo.name}</h1>
        <p className="text-sm text-gray-700">Professor Name</p>
        <p className="text-sm text-gray-700">Subject Name</p>
        <p className="text-sm text-gray-700">04 September 2024</p>
      </header>
      
      {/* Title */}
      <h2 className="text-center text-lg my-8">{personalInfo.title}</h2>

      {/* Summary / Introduction */}
      <p className="mb-6 indent-8">
        {summary.content as string}
      </p>

      {/* Main Content */}
      <main>
        <section className="mb-6">
          <h3 className="font-bold text-md uppercase mb-3">Experience</h3>
          {(workExperience.content as WorkExperience[]).map((job, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-bold text-black">{job.title}</h4>
              <p className="text-sm italic text-gray-600">{job.company}, {job.location} ({job.date})</p>
              <p className="mt-2 indent-8">
                {job.description.join(' ')}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="font-bold text-md uppercase mb-3">Education</h3>
          {(education.content as Education[]).map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-bold text-black">{edu.degree}</h4>
              <p className="text-sm italic text-gray-600">{edu.institution}, {edu.location} ({edu.date})</p>
              {edu.description && <p className="mt-2 indent-8">{edu.description}</p>}
            </div>
          ))}
        </section>
        
        <section>
          <h3 className="font-bold text-md uppercase mb-3">Projects</h3>
          {(projects.content as Project[]).map((project, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-bold text-black">{project.name} &mdash; {project.detail}</h4>
              <p className="mt-2 indent-8">{project.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CoralTemplate;
