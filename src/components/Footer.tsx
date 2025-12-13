import React from 'react';
import { NeuButton } from './NeuButton';
import { personalInfo } from '../data/portfolio';
import { Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 mt-12 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        
        <div className="flex justify-center gap-6 mb-8">
          <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <NeuButton circle className="hover:text-primary-light">
              <Github size={20} />
            </NeuButton>
          </a>
          <a href={personalInfo.social.email} aria-label="Email">
            <NeuButton circle className="hover:text-primary-light">
              <Mail size={20} />
            </NeuButton>
          </a>
          {/* Add Scholar icon manually or use BookOpen as placeholder */}
           <a href={personalInfo.social.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
            <NeuButton circle className="hover:text-primary-light font-bold font-serif">
              S
            </NeuButton>
          </a>
        </div>

        <p className="text-sm text-text-light/60 dark:text-text-dark/60">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <p className="text-xs text-text-light/40 dark:text-text-dark/40 mt-2">
          Designed with Neumorphism
        </p>
      </div>
    </footer>
  );
};

