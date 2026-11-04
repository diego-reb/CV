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
  Code2, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Terminal,
  Menu,
  X,
  ChevronRight,
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
          {['Inicio', 'Habilidades', 'Experiencia', 'Proyectos', 'Formación', 'Contacto'].map((item) => (
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
            <a href="https://github.com/diego-reb" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-all">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/diego-zaid-garcia-rebollo-9065192a6/" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-all">
              <Linkedin size={18} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dzgarcia10@gmail.com" className="p-2 hover:bg-white/10 rounded-full transition-all">
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
              {['Inicio', 'Habilidades', 'Experiencia', 'Proyectos', 'Formación', 'Contacto'].map((item) => (
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

const SkillGroup = ({ title, icon: Icon, skills }: { title: string; icon: any; skills: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-3xl group transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6 text-accent-blue group-hover:scale-110 transition-transform duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <ul className="space-y-2">
      {skills.map((skill) => (
        <li key={skill} className="flex items-start text-sm text-white/50 leading-relaxed">
          <ChevronRight size={14} className="mt-1 mr-2 text-accent-blue/70 flex-shrink-0" />
          {skill}
        </li>
      ))}
    </ul>
  </motion.div>
);

const ProjectCard = ({ name, context, bullets, stack }: { name: string; context: string; bullets: string[]; stack: string[] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass p-8 rounded-3xl flex flex-col"
  >
    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <span className="text-xs font-bold uppercase tracking-widest text-accent-blue">{context}</span>
    </div>
    <ul className="space-y-2 mb-6 flex-1">
      {bullets.map((bullet, idx) => (
        <li key={idx} className="flex items-start text-sm text-white/50 leading-relaxed">
          <ChevronRight size={14} className="mt-1 mr-2 text-accent-blue flex-shrink-0" />
          {bullet}
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
      {stack.map((tech) => (
        <span key={tech} className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 text-white/60">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

const TimelineItem = ({ title, company, period, description, details, stack }: { title: string; company: string; period: string; description: string; details?: string[]; stack?: string[] }) => (
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
      {stack && (
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
          {stack.map((tech) => (
            <span key={tech} className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/5 text-white/60">
              {tech}
            </span>
          ))}
        </div>
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
              Ingeniero en Sistemas Computacionales en proceso de titulación (diciembre 2026), con experiencia
              en desarrollo backend con Python/Django, Flask y PHP, y en mantenimiento de sistemas empresariales
              en .NET y SQL Server. Construyo backends y bases de datos claras, seguras y mantenibles, y busco mi
              primera posición como Desarrollador Backend Junior o QA Automation Junior.
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
                <span className="text-sm font-medium text-white/60">Inglés B2 – Comprensión alta, conversación en desarrollo</span>
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
                  src={`${import.meta.env.BASE_URL}imagenes/foto.jpeg`} 
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

      {/* Habilidades Section */}
      <section id="habilidades" className="py-24 px-6 bg-apple-black/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Tecnologías que uso en producción o en proyectos académicos, separadas por área.">
            Habilidades <span className="text-accent-blue">Técnicas</span>
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillGroup 
              title="Lenguajes" 
              icon={Code2} 
              skills={['Python', 'PHP', 'C# (.NET)', 'SQL', 'JavaScript', 'HTML5 / CSS3']}
            />
            <SkillGroup 
              title="Frameworks" 
              icon={Cpu} 
              skills={['Django', 'Flask', '.NET', 'Diseño de APIs y control de roles']}
            />
            <SkillGroup 
              title="Bases de Datos" 
              icon={Database} 
              skills={['SQL Server', 'Modelado relacional (esquemas, tablas, relaciones)', 'Consultas y migraciones de datos', 'Exportación e integración de datos (Excel)']}
            />
            <SkillGroup 
              title="Herramientas" 
              icon={Terminal} 
              skills={['Git / GitHub (ramas, commits, control de versiones)', 'Docker (contenedores, nivel básico)', 'Terminal (Bash / Linux)', 'Integración de APIs de pago (Mercado Pago)']}
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
              title="Desarrollador Backend (Servicio Social)"
              company="Secretaría de Educación Pública (SEP) — Proyecto EscalafónIA"
              period="2025 - Presente"
              description="Plataforma de apoyo a docentes construida con Python/Django y microservicios, con módulos de generación de cursos y evaluación asistidos por IA."
              details={[
                "Diseñé el modelo de datos y la lógica de permisos por rol (docente, evaluador, administrador y generador de cursos), evitando accesos cruzados entre perfiles.",
                "Integré servicios de IA para la generación de cursos y el apoyo a la evaluación docente, reduciendo el trabajo administrativo que antes se hacía de forma manual.",
                "Desarrollé los módulos sobre una arquitectura de microservicios en Django, separando responsabilidades para poder modificar un componente sin afectar al resto."
              ]}
              stack={['Python', 'Django', 'Microservicios', 'SQL', 'Git']}
            />
            <TimelineItem 
              title="Desarrollador Full Stack (Freelance)"
              company="Verquet — Portales Chamuco, Latina y Mac"
              period="2022 - 2024"
              description="Desarrollo y mantenimiento de portales web empresariales en .NET y SQL Server: funcionalidad nueva, reconstrucción de base de datos y endurecimiento de seguridad."
              details={[
                "Revista del Chamuco: implementé el login y 10 vistas en .NET, y reconstruí la base de datos completa en SQL Server (esquema, tablas y relaciones), dejando la estructura lista para altas y consultas sin intervención manual.",
                "Portal Latina (gasolinera PEMEX): añadí rate limiting al inicio de sesión para mitigar ataques de fuerza bruta, audité dependencias en busca de librerías con vulnerabilidades conocidas y reescribí los mensajes de error para no filtrar información del sistema.",
                "Portal Mac: actualicé 6 vistas en .NET, rediseñé la jerarquía de botones y amplié tablas existentes con nuevos campos, incluyendo la exportación de esos datos a Excel para el área administrativa.",
                "Empleé asistentes de IA como apoyo en la generación de casos de prueba y refactorización, revisando y validando manualmente cada cambio antes de integrarlo al repositorio."
              ]}
              stack={['C# (.NET)', 'SQL Server', 'Seguridad web', 'Git']}
            />
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="py-24 px-6 bg-apple-black/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Proyectos propios y académicos donde apliqué el stack de principio a fin: backend, base de datos y reglas de negocio.">
            Proyectos <span className="text-accent-blue">Destacados</span>
          </SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProjectCard
              name="Luz Violeta"
              context="Proyecto académico · Python / Flask"
              bullets={[
                "Desarrollé en Python/Flask una plataforma informativa para mujeres con chatbot guía, directorio de instituciones de ayuda y botón de pánico.",
                "Implementé el botón de pánico para capturar la ubicación del usuario y notificar a su contacto de emergencia, integrando la geolocalización con el flujo de alerta.",
                "Separé la lógica del chatbot del contenido del directorio, de modo que el equipo puede actualizar la información sin modificar el código del backend."
              ]}
              stack={['Python', 'Flask', 'HTML/CSS', 'Geolocalización', 'Git']}
            />
            <ProjectCard
              name="Cenit"
              context="E-commerce · PHP"
              bullets={[
                "Construí una tienda en línea de productos de limpieza con cuatro roles (mayorista, minorista, repartidor y administrador), cada uno con su propio flujo, precios y permisos.",
                "Integré la pasarela de pagos de Mercado Pago y automaticé el cálculo de precios y disponibilidad según el tipo de cliente, sustituyendo la cotización manual.",
                "Diseñé el modelo de datos de productos, pedidos y usuarios para sostener los distintos roles sobre una misma base relacional."
              ]}
              stack={['PHP', 'SQL', 'Mercado Pago API', 'Git']}
            />
            <ProjectCard
              name="Ubika"
              context="Cliente real · PHP"
              bullets={[
                "Desarrollé en PHP un sistema de gestión de ubicaciones para una empresa de servicios, donde cada visita asignada exige evidencia fotográfica y coordenadas GPS al completarse.",
                "Implementé el flujo de asignación, captura de evidencia y validación de asistencia contra el domicilio del cliente, sustituyendo el registro manual por comprobantes verificables.",
                "Modelé usuarios, clientes y visitas en una base relacional para que el seguimiento y los reportes de asistencia se consulten en un solo lugar."
              ]}
              stack={['PHP', 'SQL', 'GPS', 'Git']}
            />
          </div>
        </div>
      </section>

      {/* Formación Section */}
      <section id="formación" className="py-24 px-6 bg-apple-black/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Formación académica en ingeniería de software, con titulación prevista para diciembre de 2026.">
            Formación <span className="text-accent-blue">Académica</span>
          </SectionTitle>

          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center">
              <BookOpen className="mr-3 text-accent-blue" /> Académica
            </h3>
            <EducationCard 
              title="Ingeniería en Sistemas Computacionales"
              institution="Educación Superior · En proceso de titulación (Diciembre 2026)"
              period="Último semestre"
              icon={Briefcase}
            />
            <EducationCard 
              title="Técnico en Informática y Programación"
              institution="Educación Media Superior"
              period="Concluido"
              icon={Code2}
            />
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
            <a href="https://github.com/diego-reb" className="text-white/40 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/diego-zaid-garcia-rebollo-9065192a6/" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dzgarcia10@gmail.com" className="text-white/40 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
