import React from 'react';
import styles from './../page.module.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectsSectionProps {
  featuredProjects: Project[];
}

export default function ProjectsSection({
  featuredProjects,
}: ProjectsSectionProps) {
  return (
    <section className="mb-12">
      <h2 className={styles.sectionTitle}>Featured Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((project, idx) => (
          <div key={idx} className={styles.card}>
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-blue-200 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
