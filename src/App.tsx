/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Instagram, Linkedin, Mail, MapPin, Menu, X, Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "The Obsidian Pavilion",
    location: "Reykjavík, Iceland",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020250-68594f214602?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Residential",
    description: "A monolithic structure designed to withstand the harsh Icelandic climate while providing panoramic views of the volcanic landscape."
  },
  {
    id: 2,
    title: "Ethereal Heights",
    location: "Dubai, UAE",
    year: "2023",
    image: "https://images.unsplash.com/photo-1449156001935-d28bc1dc7281?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1449156001935-d28bc1dc7281?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526495124232-a02e18494d17?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Commercial",
    description: "A vertical oasis that redefines the luxury workspace, blending high-tech glass with organic interior gardens."
  },
  {
    id: 3,
    title: "Monolith Cultural Center",
    location: "Berlin, Germany",
    year: "2023",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020250-68594f214602?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Public",
    description: "A brutalist masterpiece serving as a hub for contemporary art and community engagement in the heart of Berlin."
  },
  {
    id: 4,
    title: "Verdant Atrium",
    location: "Singapore",
    year: "2022",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-153002096329a-8cd147e1741f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Mixed Use",
    description: "A sustainable urban development that integrates lush greenery into every level of its commercial and residential spaces."
  }
];

const resumeData = {
  experience: [
    {
      role: "Senior Architect",
      company: "AURA Architecture",
      period: "2018 - Present",
      description: "Leading design teams for international high-profile residential and commercial projects."
    },
    {
      role: "Project Architect",
      company: "Minimalist Design Studio",
      period: "2014 - 2018",
      description: "Focused on brutalist residential projects across Northern Europe."
    },
    {
      role: "Junior Designer",
      company: "Urban Form Lab",
      period: "2012 - 2014",
      description: "Assisted in the development of public space masterplans."
    }
  ],
  education: [
    {
      degree: "Master of Architecture",
      school: "The Royal Danish Academy",
      year: "2012"
    },
    {
      degree: "Bachelor of Design",
      school: "Oslo School of Architecture",
      year: "2010"
    }
  ]
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentGalleryIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentGalleryIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c5a059] selection:text-black" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          AURA<span className="text-[#c5a059]">.</span>
        </motion.div>
        
        <div className="hidden md:flex space-x-12 text-xs uppercase tracking-[0.3em] font-medium">
          {["Work", "Studio", "Resume", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#c5a059] transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center space-y-8 text-3xl font-serif italic"
      >
        {["Work", "Studio", "Resume", "Contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#c5a059]"
          >
            {item}
          </a>
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 font-semibold"
          >
            Architecture & Spatial Design
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-serif text-6xl md:text-[10vw] leading-[0.9] tracking-tighter mb-8"
          >
            Defining the <br />
            <span className="italic">Silent</span> Void.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center space-x-4 group cursor-pointer"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-500"></div>
            <span className="text-xs uppercase tracking-widest">Explore Projects</span>
          </motion.div>
        </motion.div>

        {/* Background Subtle Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-l border-white/20 transform skew-x-12"></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-24 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <h2 className="text-serif text-4xl md:text-6xl mb-6 italic">Selected Works</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              A collection of structures that challenge the boundaries between environment and inhabitant. 
              Each project is a dialogue between light, shadow, and materiality.
            </p>
          </div>
          <div className="mt-8 md:mt-0 text-[10px] uppercase tracking-[0.3em] text-gray-500">
            Click to expand
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              onClick={() => {
                setSelectedProject(project);
                setCurrentGalleryIndex(0);
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 mb-6">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 text-[10px] uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 border border-white/10">
                  {project.category}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-serif text-2xl mb-1">{project.title}</h3>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">{project.location} — {project.year}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-full flex flex-col md:flex-row gap-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-0 right-0 z-10 p-4 text-white hover:text-[#c5a059]"
              >
                <X size={32} />
              </button>

              <div className="relative flex-1 bg-zinc-900 overflow-hidden group">
                <motion.img 
                  key={currentGalleryIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  src={selectedProject.gallery[currentGalleryIndex]} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={prevImage} className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-[#c5a059] transition-colors">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-[#c5a059] transition-colors">
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {selectedProject.gallery.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all ${i === currentGalleryIndex ? 'bg-[#c5a059] w-6' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col justify-center">
                <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">{selectedProject.category}</span>
                <h2 className="text-serif text-4xl mb-6">{selectedProject.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <div className="space-y-4 border-t border-white/10 pt-8 text-[10px] uppercase tracking-widest text-gray-500">
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="text-white">{selectedProject.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year</span>
                    <span className="text-white">{selectedProject.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Studio / About Section */}
      <section id="studio" className="py-32 px-6 md:px-12 bg-[#0a0a0a]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt="Studio" 
              className="w-full h-full object-cover grayscale opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-[#0a0a0a]"></div>
          </div>
          <div>
            <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.5em] font-bold block mb-6">The Studio</span>
            <h2 className="text-serif text-4xl md:text-6xl mb-8 leading-tight">
              We believe in architecture that <span className="italic">breathes</span>.
            </h2>
            <div className="space-y-6 text-gray-400 text-sm leading-relaxed max-w-lg">
              <p>
                Founded in 2018, AURA is an international architecture firm focused on the intersection of minimalist aesthetics and sustainable innovation.
              </p>
              <p>
                Our process is reductive. We remove the noise to find the essence of a space, utilizing raw materials like exposed concrete, charred wood, and structural glass to create environments that evoke emotion.
              </p>
              <button className="pt-4 flex items-center space-x-4 text-white hover:text-[#c5a059] transition-colors group">
                <span className="text-xs uppercase tracking-widest font-semibold">Our Philosophy</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20">
            <div>
              <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.5em] font-bold block mb-6">Curriculum Vitae</span>
              <h2 className="text-serif text-4xl md:text-6xl italic">Professional Journey</h2>
            </div>
            <button className="mt-8 md:mt-0 flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full hover:bg-[#c5a059] transition-colors group">
              <Download size={18} />
              <span className="text-xs uppercase tracking-widest font-bold">Download PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12 flex items-center">
                <FileText size={14} className="mr-3" /> Experience
              </h3>
              <div className="space-y-16">
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-white/10">
                    <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] rounded-full bg-[#c5a059]" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">{exp.period}</span>
                    <h4 className="text-xl font-serif mb-1">{exp.role}</h4>
                    <p className="text-[#c5a059] text-xs uppercase tracking-widest mb-4">{exp.company}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12 flex items-center">
                <FileText size={14} className="mr-3" /> Education & Recognition
              </h3>
              <div className="space-y-12">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="group">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">{edu.year}</span>
                    <h4 className="text-xl font-serif mb-1 group-hover:text-[#c5a059] transition-colors">{edu.degree}</h4>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">{edu.school}</p>
                  </div>
                ))}
                
                <div className="pt-12 border-t border-white/5">
                  <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Core Competencies</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Master Planning", "BIM Management", "Sustainable Design", "Parametric Modeling", "Interior Architecture"].map((skill) => (
                      <span key={skill} className="px-4 py-2 border border-white/10 text-[10px] uppercase tracking-widest hover:border-[#c5a059] transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-serif text-5xl md:text-8xl mb-12 tracking-tighter">Let's build the <span className="italic">future</span>.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Mail size={20} className="text-[#c5a059]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Email</p>
              <p className="text-sm">hello@aura-arch.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <MapPin size={20} className="text-[#c5a059]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Location</p>
              <p className="text-sm">124 Minimalist Way, Oslo</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Linkedin size={20} className="text-[#c5a059]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Connect</p>
              <p className="text-sm">@aura_architecture</p>
            </div>
          </div>

          <div className="flex justify-center space-x-8 pt-12 border-t border-white/5">
            <Instagram size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Linkedin size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Mail size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-600">
        <p>© 2026 AURA Architecture. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
