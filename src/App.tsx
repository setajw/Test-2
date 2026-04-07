/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Linkedin, Mail, Menu, X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from "react-router-dom";

// Data
const projects = [
  {
    id: 1,
    slug: "le-corbusiers-pavilion",
    title: "Le Corbusier's Pavilion",
    subtitle: "Studio I | Professor Abrams",
    course: "Studio I",
    year: "2024",
    image: "https://raw.githubusercontent.com/setajw/Test-2/27cd631c3bc85a41fb5ae774c6abcfdf84af76b1/Untitled-3.jpg",
    gallery: [
      "https://raw.githubusercontent.com/setajw/Test-2/27cd631c3bc85a41fb5ae774c6abcfdf84af76b1/Untitled-3.jpg",
      "https://images.unsplash.com/photo-1518005020250-68594f214602?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "A monolithic structure designed to withstand the harsh Icelandic climate while providing panoramic views of the volcanic landscape."
  },
  {
    id: 2,
    slug: "the-color-wheel",
    title: "The Color Wheel",
    subtitle: "Create Placemaking Studio | Professor Newman",
    course: "Create Placemaking Studio",
    year: "2023",
    image: "https://images.unsplash.com/photo-1449156001935-d28bc1dc7281?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1449156001935-d28bc1dc7281?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526495124232-a02e18494d17?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Creative Placemaking Studio | Professor Newman"
  }
];

const precedentStudies = [
  {
    id: 1,
    slug: "vanna-venturi-house",
    title: "Vanna Venturi House",
    course: "ARCH 401",
    architect: "Robert Venturi",
    year: "1964",
    image: "https://images.unsplash.com/photo-1518005020250-68594f214602?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518005020250-68594f214602?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "A collection of analytical studies exploring historical and contemporary architectural precedents. These works focus on understanding spatial hierarchies, structural systems, and material logic."
  },
  {
    id: 2,
    slug: "nasher-sculpture-center",
    title: "Nasher Sculpture Center",
    course: "ARCH 401",
    architect: "Renzo Piano",
    year: "2003",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020250-68594f214602?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "A collection of analytical studies exploring historical and contemporary architectural precedents. These works focus on understanding spatial hierarchies, structural systems, and material logic."
  }
];

const personalWork = {
  title: "Personal Work",
  description: "Beyond architectural practice, this collection explores the intersection of spatial thinking and artistic expression. It includes a diverse range of work that I have worked on including art, sketches, and more.",
  gallery: [
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", title: "Abstract Form I", year: "2023" },
    { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop", title: "Light Study", year: "2022" },
    { src: "https://images.unsplash.com/photo-1515405299443-fbd3bb755f99?q=80&w=2080&auto=format&fit=crop", title: "Urban Sketch", year: "2023" },
    { src: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2070&auto=format&fit=crop", title: "Materiality", year: "2021" },
    { src: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop", title: "Spatial Rhythm", year: "2023" },
    { src: "https://images.unsplash.com/photo-1501812327411-aa63fdd3cc3e?q=80&w=2070&auto=format&fit=crop", title: "Shadow Play", year: "2022" }
  ]
};

// Components
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navigation = ({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <Link to="/" className="text-xl font-bold tracking-tighter leading-none uppercase text-white">Seta Whitney</Link>
        </motion.div>
        
        <div className="hidden md:flex space-x-12 text-xs uppercase tracking-[0.3em] font-medium text-white">
          {["Projects", "Precedent Studies", "Personal Work", "About Me", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              onClick={(e) => handleNavClick(e, item.toLowerCase().replace(/\s+/g, '-'))}
              className="hover:text-gray-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#FFFDFC] z-40 flex flex-col justify-center items-center space-y-8 text-3xl font-serif italic"
          >
            {["Projects", "Precedent Studies", "Personal Work", "About Me", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                onClick={(e) => handleNavClick(e, item.toLowerCase().replace(/\s+/g, '-'))}
                className="hover:text-[#262626]"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = [...projects, ...precedentStudies].find(p => p.slug === slug);

  if (!item) return <div className="min-h-screen flex items-center justify-center">Item not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFFDFC] pt-32 pb-20 px-6 md:px-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="mb-12 flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:text-gray-500 transition-colors"
      >
        <ChevronLeft size={16} />
        <span>Back</span>
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            {item.gallery.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full bg-gray-100 overflow-hidden"
              >
                <img 
                  src={img} 
                  alt={`${item.title} - Image ${i + 1}`}
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4 sticky top-32">
            <h1 className="text-serif text-4xl md:text-5xl mb-4 italic">{item.title}</h1>
            
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-black/5">
                {!('architect' in item) && (
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Course</span>
                    <p className="text-black font-medium">{item.course}</p>
                  </div>
                )}
                <div className={!('architect' in item) ? "" : "col-span-2"}>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Year</span>
                  <p className="text-black font-medium">{item.year}</p>
                </div>
                {'architect' in item && (
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Architect</span>
                    <p className="text-black font-medium">{item.architect}</p>
                  </div>
                )}
              </div>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PersonalWorkPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<typeof personalWork.gallery[0] | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFFDFC] pt-32 pb-20 px-6 md:px-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="mb-12 flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:text-gray-500 transition-colors"
      >
        <ChevronLeft size={16} />
        <span>Back</span>
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h1 className="text-serif text-5xl md:text-7xl mb-8 italic uppercase tracking-tighter">{personalWork.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            {personalWork.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalWork.gallery.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square overflow-hidden bg-gray-100 group cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-black hover:text-gray-500 transition-colors"
              >
                <X size={32} />
              </button>

              <div className="w-full h-full overflow-hidden bg-gray-100">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full pt-8 text-center">
                <h2 className="text-serif text-3xl md:text-4xl mb-2 italic">{selectedImage.title}</h2>
                <p className="text-[#262626] text-xs uppercase tracking-[0.4em] font-bold">{selectedImage.year}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Architecture Background"
            className="w-full h-full object-cover grayscale opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFC] via-transparent to-[#FFFDFC]"></div>
        </div>

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-serif text-5xl md:text-[7vw] leading-[0.9] tracking-tighter mb-8"
          >
            Seta Whitney <br />
            <span className="italic text-[0.31em] tracking-[0.3em] block mt-6 uppercase font-sans font-semibold text-[#262626]">Architecture and Design</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm md:text-lg max-w-lg leading-relaxed font-light"
          >
            A portfolio of architectural explorations, precedent studies, and personal artistic works focused on spatial clarity and material honesty.
          </motion.p>
        </motion.div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-l border-black/20 transform skew-x-12"></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <h2 className="text-serif text-4xl md:text-6xl mb-6 italic uppercase tracking-tighter">Projects</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              A selection of architectural projects exploring the intersection of form, function, and environment.
            </p>
          </div>
          <div className="mt-8 md:mt-0 text-[10px] uppercase tracking-[0.3em] text-gray-400">
            Click to explore
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
            >
              <Link to={`/project/${project.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-serif text-2xl mb-1">{project.title}</h3>
                    <p className="text-[#262626] text-[10px] uppercase tracking-widest mb-2 font-medium">{project.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Precedent Studies Section */}
      <section id="precedent-studies" className="py-32 px-6 md:px-12 border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <h2 className="text-serif text-4xl md:text-6xl mb-6 italic uppercase tracking-tighter">Precedent Studies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              A collection of analytical studies exploring historical and contemporary architectural precedents. These works focus on understanding spatial hierarchies, structural systems, and material logic.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {precedentStudies.map((study, i) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/study/${study.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-serif text-xl mb-1 italic">{study.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#262626] mb-1">{study.architect}</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">{study.year}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personal Work Section */}
      <section id="personal-work" className="py-32 px-6 md:px-12 border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt="Personal Work" 
              className="w-full h-full object-cover grayscale opacity-70"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-[#FFFDFC]"></div>
          </div>
          <div>
            <h2 className="text-serif text-4xl md:text-6xl mb-6 italic uppercase tracking-tighter">Personal Work</h2>
            <div className="space-y-6 text-gray-600 text-sm leading-relaxed max-w-lg">
              <p>
                Beyond architectural practice, this collection explores the intersection of spatial thinking and artistic expression. It includes a diverse range of work that I have worked on including art, sketches, and more.
              </p>
              <p>
                These pieces represent a continuous exploration of form, light, and shadow, serving as both a foundation for and a departure from structural constraints.
              </p>
              <Link to="/personal-work" className="pt-4 flex items-center space-x-4 text-black hover:text-[#262626] transition-colors group">
                <span className="text-xs uppercase tracking-widest font-semibold">View Collection</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-me" className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="text-serif text-4xl md:text-5xl italic leading-tight uppercase tracking-tighter">About Me</h2>
            </div>
            <div className="md:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8 text-gray-600 text-lg md:text-2xl font-light leading-relaxed"
              >
                <p>
                  [placeholder text]
                </p>
                <div className="pt-8">
                  <a 
                    href="/resume-placeholder.pdf" 
                    download="Seta_Whitney_Resume.pdf"
                    className="inline-flex items-center space-x-4 px-8 py-4 bg-black text-white hover:bg-[#262626] transition-all duration-300 group"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">Download Resume</span>
                    <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-serif text-4xl md:text-6xl mb-12 italic uppercase tracking-tighter">Contact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Mail size={20} className="text-[#262626]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Email</p>
              <p className="text-sm">setawhitney@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <Linkedin size={20} className="text-[#262626]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Connect</p>
              <p className="text-sm">linkedin.com/in/setawhitney</p>
            </div>
          </div>

          <div className="flex justify-center space-x-8 pt-12 border-t border-black/5">
            <Linkedin size={20} className="text-gray-400 hover:text-black cursor-pointer transition-colors" />
            <Mail size={20} className="text-gray-400 hover:text-black cursor-pointer transition-colors" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-400">
        <p>© 2026 Seta Whitney Architecture. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FFFDFC] text-black selection:bg-[#262626] selection:text-white font-sans antialiased">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<DetailPage />} />
          <Route path="/study/:slug" element={<DetailPage />} />
          <Route path="/personal-work" element={<PersonalWorkPage />} />
        </Routes>
      </div>
    </Router>
  );
}
