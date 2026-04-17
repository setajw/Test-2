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
    image: "https://raw.githubusercontent.com/setajw/Test-2/main/images/color_wheel_event.jpg",
    gallery: [
      "https://raw.githubusercontent.com/setajw/Test-2/main/images/color_wheel_event.jpg",
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
  categories: [
    {
      name: "Architectural Sketches",
      items: [
        { 
          src: "/images/aa_drawing.jpg", 
          title: "Arched Gallery Sketch", 
          year: "2026",
          medium: "Pencil on paper"
        },
        { 
          src: "https://raw.githubusercontent.com/setajw/Test-2/main/images/watercolor_cityscape_v2.jpg", 
          title: "Arno River, Florence, IT", 
          year: "2025",
          medium: "Watercolor on paper"
        },
        { 
          src: "https://raw.githubusercontent.com/setajw/Test-2/main/images/ss_plaza.jpg", 
          title: "Piazza Della Santissima Annunziata, Florence, IT", 
          year: "2025",
          medium: "Watercolor on paper"
        },
        { 
          src: "https://raw.githubusercontent.com/setajw/Test-2/main/images/watercolor_street.jpg", 
          title: "Street in Florence, IT", 
          year: "2025",
          medium: "Watercolor & ink on paper"
        }
      ]
    },
    {
      name: "Digital Portraits",
      items: [
        { 
          src: "https://raw.githubusercontent.com/setajw/Test-2/main/images/digital_illustration_3.png", 
          title: "PPRL GRL", 
          year: "2024",
          medium: "Digital Illustration"
        },
        { 
          src: "https://raw.githubusercontent.com/setajw/Test-2/main/images/digital_illustration_1.jpg", 
          title: "Olive", 
          year: "2025",
          medium: "Digital Illustration"
        },
        { 
          src: "https://raw.githubusercontent.com/setajw/Test-2/main/images/digital_illustration_4.png", 
          title: "Erchen Portrait", 
          year: "2025",
          medium: "Digital Illustration"
        }
      ]
    },
    {
      name: "Misc",
      items: [
        { src: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2070&auto=format&fit=crop", title: "Materiality", year: "2021" }
      ]
    }
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
            className="fixed inset-0 bg-[#FFFBF5] z-40 flex flex-col justify-center items-center space-y-8 text-3xl font-serif italic"
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
      className="min-h-screen bg-[#FFFBF5] pt-32 pb-20 px-6 md:px-12"
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
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFFBF5] pt-32 pb-20 px-6 md:px-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="mb-12 flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:text-gray-500 transition-colors"
      >
        <ChevronLeft size={16} />
        <span>Back</span>
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-3xl">
            <h1 className="text-serif text-5xl md:text-7xl mb-8 italic uppercase tracking-tighter">{personalWork.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {personalWork.description}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold border border-black/10 px-4 py-2 rounded-full">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
            <span>Click to expand</span>
          </div>
        </div>

        <div className="space-y-32">
          {personalWork.categories.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-serif text-3xl md:text-4xl mb-12 italic border-b border-black/10 pb-4 uppercase tracking-tighter">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((img, i) => (
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
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
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

              <div className="w-full h-full overflow-hidden">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full pt-8 text-center">
                <h2 className="text-serif text-3xl md:text-4xl mb-1 italic">{selectedImage.title}</h2>
                {('medium' in selectedImage) && (
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">{selectedImage.medium}</p>
                )}
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
            animate={{ scale: 1, opacity: 0.35 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://raw.githubusercontent.com/setajw/Test-2/main/images/watercolor_cityscape.jpg"
            alt="Watercolor Cityscape Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-transparent to-[#FFFBF5]"></div>
        </div>

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-serif text-6xl md:text-[9vw] leading-[0.9] tracking-tighter mb-8"
          >
            Seta Whitney <br />
            <span className="italic text-[0.18em] tracking-[0.4em] block mt-6 uppercase font-sans font-semibold text-[#262626] whitespace-nowrap">Architecture Portfolio</span>
          </motion.h1>
          
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#FFFBF5] via-[#FFFBF5]/80 to-transparent blur-2xl -z-10"></div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-700 text-sm md:text-lg max-w-lg leading-relaxed font-medium relative z-10"
            >
              Explore my portfolio of undergraduate architectural work, creative placemaking projects, precedent studies, and personal artwork. My work focuses on a human-centered approach, where I explore how spaces, images, and designs evoke emotion and connect with people.
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 px-8 py-4 bg-black text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#262626] transition-all duration-300 flex items-center space-x-4 group"
          >
            <span>View Projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-l border-black/20 transform skew-x-12"></div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-me" className="py-40 px-6 md:px-12 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <h2 className="text-serif text-4xl md:text-5xl italic leading-tight uppercase tracking-tighter">About Me</h2>
          </div>
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="space-y-8 text-gray-600 text-lg md:text-2xl font-light leading-relaxed mb-12">
                <p>
                  I am an architectural designer focused on the intersection of spatial clarity, material honesty, and environmental context. My work explores how built environments can respond to human needs while maintaining a strong structural and aesthetic logic.
                </p>
                <p>
                  With a background in both traditional architectural practice and contemporary digital studies, I strive to create spaces that are both functional and evocative.
                </p>
              </div>
              
              <a 
                href="/resume-placeholder.pdf" 
                download="Seta_Whitney_Resume.pdf"
                className="inline-flex items-center space-x-6 group border-b border-black pb-2 hover:border-black/20 transition-all duration-300"
              >
                <span className="text-xs uppercase tracking-[0.4em] font-bold">Download Full Resume</span>
                <Download size={14} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
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
              className="group cursor-pointer"
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
          <div className="relative overflow-hidden">
            <img 
              src="https://raw.githubusercontent.com/setajw/Test-2/main/images/watercolor_cityscape_v2.jpg" 
              alt="Personal Work" 
              className="w-full h-auto opacity-70 block"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-[#FFFBF5]"></div>
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

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 md:px-12 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <h2 className="text-serif text-4xl md:text-5xl italic leading-tight uppercase tracking-tighter">Contact</h2>
          </div>
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 block mb-6">Inquiries</span>
                <a 
                  href="mailto:setajw@gmail.com" 
                  className="text-base md:text-xl lg:text-2xl font-serif italic hover:text-gray-500 transition-colors break-all"
                >
                  setajw@gmail.com
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 block mb-4">Social</span>
                  <a 
                    href="https://linkedin.com/in/setawhitney" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors flex items-center space-x-2"
                  >
                    <span>LinkedIn</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 block mb-4">Location</span>
                  <p className="text-sm uppercase tracking-widest">Maryland, United States</p>
                </div>
              </div>
            </motion.div>
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
      <div className="min-h-screen bg-[#FFFBF5] text-black selection:bg-[#262626] selection:text-white font-sans antialiased">
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
