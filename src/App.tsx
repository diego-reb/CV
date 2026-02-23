/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Layout, 
  Terminal,
  Menu,
  X,
  ChevronRight,
  Award,
  BookOpen,
  Briefcase,
  User,
  Globe
} from 'lucide-react';

// --- Components ---

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 glass-dark' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tight"
        >
          Diego <span className="text-accent-blue">Zaid</span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          {['Inicio', 'Aptitudes', 'Experiencia', 'Formación', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-all">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 hover:bg-white/10 rounded-full transition-all">
              <Globe size={18} />
            </a>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 md:hidden hover:bg-white/10 rounded-full transition-all"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-72 glass-dark z-[70] p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6 text-lg font-medium">
              {['Inicio', 'Aptitudes', 'Experiencia', 'Formación', 'Contacto'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={onClose}
                  className="flex items-center justify-between group"
                >
                  <span>{item}</span>
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-white/10 flex justify-center space-x-6">
              <Github size={20} className="text-white/50 hover:text-white cursor-pointer" />
              <Linkedin size={20} className="text-white/50 hover:text-white cursor-pointer" />
              <Mail size={20} className="text-white/50 hover:text-white cursor-pointer" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/50 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const SkillCard = ({ title, icon: Icon, description, level }: { title: string; icon: any; description: string; level: number }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-3xl group transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6 text-accent-blue group-hover:scale-110 transition-transform duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/50 text-sm mb-6 leading-relaxed">{description}</p>
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium text-white/40 uppercase tracking-wider">
        <span>Dominio</span>
        <span>{level}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-accent-blue"
        />
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ title, company, period, description, details }: { title: string; company: string; period: string; description: string; details?: string[] }) => (
  <div className="relative pl-8 pb-12 last:pb-0 group">
    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-last:bg-transparent">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_15px_rgba(0,113,227,0.5)]" />
    </div>
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass p-8 rounded-3xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-accent-blue font-medium">{company}</p>
        </div>
        <span className="text-sm font-medium px-4 py-1 rounded-full bg-white/5 text-white/60 self-start md:self-center">
          {period}
        </span>
      </div>
      <p className="text-white/60 mb-4">{description}</p>
      {details && (
        <ul className="space-y-2">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start text-sm text-white/40">
              <ChevronRight size={14} className="mt-1 mr-2 text-accent-blue flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  </div>
);

const EducationCard = ({ title, institution, period, icon: Icon }: { title: string; institution: string; period: string; icon: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-3xl flex items-start space-x-6"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 flex-shrink-0">
      <Icon size={28} />
    </div>
    <div>
      <span className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-1 block">{period}</span>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/50">{institution}</p>
    </div>
  </motion.div>
);

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-bold tracking-widest uppercase text-accent-blue mb-6">
              Ingeniería en Sistemas Computacionales
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-[0.9]">
              Garcia Rebollo <br />
              <span className="text-gradient">Diego Zaid</span>
            </h1>
            <p className="text-xl text-white/50 mb-10 max-w-lg leading-relaxed">
              Especialista en desarrollo de software, bases de datos y seguridad. 
              Enfocado en crear soluciones tecnológicas elegantes y eficientes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#contacto" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-apple-silver transition-all duration-300 flex items-center group">
                Contáctame
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center space-x-4 px-6 py-4 glass rounded-full">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center border-2 border-apple-black">
                    <Globe size={14} className="text-accent-blue" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-apple-black text-[10px] font-bold">
                    ES
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-apple-black text-[10px] font-bold">
                    EN
                  </div>
                </div>
                <span className="text-sm font-medium text-white/60">Bilingüe</span>
              </div>
            </div>

            <div className="mt-12 flex items-center space-x-6 text-white/40">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-sm">diego.zaid@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span className="text-sm">Informático en Programación</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Decorative Rings */}
            <div className="absolute w-[120%] aspect-square border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[100%] aspect-square border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-[80%] aspect-square border border-accent-blue/20 rounded-full" />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 glass-dark overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/diego/800/800" 
                  alt="Diego Zaid" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-apple-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass p-4 rounded-2xl flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Seguridad</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 glass p-4 rounded-2xl flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                <Database size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">SQL Expert</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Aptitudes Section */}
      <section id="aptitudes" className="py-24 px-6 bg-apple-black/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Combinando lógica técnica con diseño moderno para crear experiencias digitales excepcionales.">
            Aptitudes y <span className="text-accent-blue">Capacidades</span>
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard 
              title="Backend Development" 
              icon={Cpu} 
              description="Dominio de Python, PHP y .NET para construir arquitecturas robustas y escalables."
              level={92}
            />
            <SkillCard 
              title="Bases de Datos" 
              icon={Database} 
              description="Diseño, implementación y optimización de bases de datos relacionales complejas."
              level={95}
            />
            <SkillCard 
              title="Frontend Moderno" 
              icon={Layout} 
              description="Creación de interfaces elegantes y responsivas con las últimas tecnologías web."
              level={88}
            />
            <SkillCard 
              title="Ciberseguridad" 
              icon={ShieldCheck} 
              description="Implementación de medidas de seguridad avanzadas como Captcha y validaciones críticas."
              level={90}
            />
            <SkillCard 
              title="Optimización de Código" 
              icon={Terminal} 
              description="Corrección, refactorización y mejora de rendimiento en proyectos legados y nuevos."
              level={94}
            />
            <SkillCard 
              title="Mantenimiento" 
              icon={Code2} 
              description="Mantenimiento preventivo y correctivo de sistemas críticos empresariales."
              level={96}
            />
          </div>
        </div>
      </section>

      {/* Experiencia Section */}
      <section id="experiencia" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Trayectoria profesional enfocada en resultados tangibles y soluciones innovadoras.">
            Experiencia <span className="text-accent-blue">Laboral</span>
          </SectionTitle>

          <div className="space-y-4">
            <TimelineItem 
              title="Proyecto Ubika"
              company="Desarrollo Independiente"
              period="2024 - Presente"
              description="Sistema integral de logística y seguimiento en tiempo real."
              details={[
                "Seguimiento de operadores mediante geolocalización.",
                "Ubicación en tiempo real con precisión avanzada.",
                "Sistema de prevención de omisión de citas mediante alertas inteligentes."
              ]}
            />
            <TimelineItem 
              title="Proyecto Latina"
              company="Portal Gasolinera PEMEX"
              period="2023 - 2024"
              description="Optimización y mantenimiento del portal de gestión de gasolineras."
              details={[
                "Corrección integral de código y mejora de rendimiento.",
                "Implementación de módulos de seguridad y validación de datos."
              ]}
            />
            <TimelineItem 
              title="Revista del Chamuco"
              company="Portal Digital"
              period="2022 - 2023"
              description="Desarrollo full-stack para uno de los portales culturales más importantes."
              details={[
                "Desarrollo completo de la base de datos del portal.",
                "Implementación del frontend moderno y responsivo.",
                "Integración de sistemas de seguridad (Captcha)."
              ]}
            />
            <TimelineItem 
              title="Servicio Social"
              company="Secretaría de Educación Pública (SEP)"
              period="2021 - 2022"
              description="Apoyo técnico y desarrollo de herramientas internas para la gestión educativa."
            />
          </div>
        </div>
      </section>

      {/* Formación Section */}
      <section id="formación" className="py-24 px-6 bg-apple-black/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Compromiso continuo con el aprendizaje y la excelencia académica.">
            Formación y <span className="text-accent-blue">Certificaciones</span>
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center">
                <BookOpen className="mr-3 text-accent-blue" /> Académica
              </h3>
              <EducationCard 
                title="Ingeniería en Sistemas Computacionales"
                institution="Educación Superior"
                period="En curso"
                icon={Briefcase}
              />
              <EducationCard 
                title="Técnico en Informática y Programación"
                institution="Educación Media Superior"
                period="Concluido"
                icon={Code2}
              />
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center">
                <Award className="mr-3 text-accent-blue" /> Certificaciones
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {['Microsoft Certified Professional', 'Cisco Networking Academy', 'Oracle Database Specialist', 'Azure Fundamentals'].map((cert, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="glass p-6 rounded-2xl flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                        <Award size={20} />
                      </div>
                      <span className="font-medium">{cert}</span>
                    </div>
                    <ExternalLink size={16} className="text-white/20 group-hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">¿Tienes un <span className="text-accent-blue">proyecto</span>?</h2>
            <p className="text-white/50 mb-12 text-lg">Estoy disponible para nuevas oportunidades y colaboraciones técnicas.</p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email</label>
                  <input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Mensaje</label>
                <textarea 
                  rows={4} 
                  placeholder="¿En qué puedo ayudarte?" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>
              <button className="w-full py-5 bg-accent-blue text-white font-bold rounded-2xl hover:bg-accent-blue/90 transition-all duration-300 shadow-lg shadow-accent-blue/20">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-display font-bold tracking-tight">
            Diego <span className="text-accent-blue">Zaid</span>
          </div>
          
          <div className="text-white/40 text-sm font-medium">
            © 2026 Garcia Rebollo Diego Zaid. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
