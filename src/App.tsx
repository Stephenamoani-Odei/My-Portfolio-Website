import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendEmail } from "./config/emailjs";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────────────────────────

const skills = [
  { name: "React.js", level: 90, cat: "Frontend" },
  { name: "JavaScript (ES2024)", level: 92, cat: "Frontend" },
  { name: "Cybersecurity", level: 82, cat: "Security" },
  { name: "System Design", level: 78, cat: "Architecture" },
  { name: "Data Analytics", level: 80, cat: "Data" },
  { name: "Content Creation", level: 88, cat: "Creative" },
  { name: "AI Career Essentials", level: 85, cat: "AI" },
  { name: "Virtual Assistant", level: 86, cat: "Operations" },
];

const projects = [
  {
    title: "Sales Analytics Dashboard",
    desc: "An interactive data dashboard built to visualize key business metrics — revenue trends, customer acquisition, product performance, and regional breakdowns. Features filterable charts, KPI cards, and exportable reports designed for decision-makers.",
    tags: ["React", "Recharts", "JavaScript", "CSS Grid"],
    year: "2024",
    category: "Data",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
  {
    title: "ShopEase — E-Commerce Platform",
    desc: "A fully functional e-commerce storefront with product listings, cart management, user authentication, and checkout flow. Built with a focus on speed, mobile responsiveness, and a clean shopping experience.",
    tags: ["React", "JavaScript", "LocalStorage", "CSS"],
    year: "2024",
    category: "Web App",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
  {
    title: "TaskFlow — Project Manager",
    desc: "A Kanban-style task management web app for teams and freelancers. Drag-and-drop boards, deadline tracking, priority tags, and a clean dashboard overview — all running in the browser with no backend required.",
    tags: ["React", "JavaScript", "Drag & Drop", "LocalStorage"],
    year: "2024",
    category: "Web App",
    img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
  {
    title: "NetGuard — Security Audit Toolkit",
    desc: "A conceptual cybersecurity project: a web-based toolkit designed to help small businesses run basic security self-audits. It walks users through common vulnerability categories — weak passwords, open ports, outdated software, phishing exposure — and generates a risk report with recommended mitigations. The goal is to make security awareness accessible to non-technical teams.",
    tags: ["Cybersecurity", "React", "System Design", "Risk Analysis"],
    year: "2025",
    category: "Security",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
];

const navItems = ["About", "Skills", "Work"];

// ─── Components ─────────────────────────────────────────────────────────────

function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(12,12,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1c1c1c" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#hero"
          style={{ fontFamily: "var(--font-display)", color: "#e8a838", fontSize: "1.2rem", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          OAS.
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`nav-link text-sm transition-colors duration-200 ${
                active === item.toLowerCase() ? "active text-[#e8e2d6]" : "text-[#6b6560] hover:text-[#e8e2d6]"
              }`}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              padding: "7px 18px",
              border: "1px solid #e8a838",
              color: "#e8a838",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#e8a838";
              (e.currentTarget as HTMLElement).style.color = "#0c0c0c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#e8a838";
            }}
          >
            HIRE ME
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: 22, height: 1.5, background: "#e8e2d6", transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#e8e2d6", opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#e8e2d6", transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ background: "#0c0c0c", borderTop: "1px solid #1c1c1c" }}
          className="md:hidden px-6 py-6 flex flex-col gap-5"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#e8e2d6] text-base"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left" })
      .fromTo(nameRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.3")
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");

    // Parallax on scroll
    gsap.to(containerRef.current, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center dot-grid overflow-hidden">
      {/* Accent blob */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(232,168,56,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(transparent, #0c0c0c)",
          pointerEvents: "none",
        }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 w-full py-32">
        <div
          ref={lineRef}
          style={{ width: 48, height: 2, background: "#e8a838", marginBottom: 32 }}
        />

        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "#e8a838", marginBottom: 20 }}>
          WEB DEVELOPER · CYBERSECURITY · AI SPECIALIST
        </p>

        <h1
          ref={nameRef}
          className="hero-name"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#e8e2d6",
            marginBottom: 32,
          }}
        >
          Odei Amoani<br />
          <span style={{ color: "#e8a838" }}>Stephen.</span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "#6b6560",
            maxWidth: 540,
            lineHeight: 1.65,
            marginBottom: 48,
          }}
        >
          I build modern web experiences, secure digital systems, and data-driven solutions — combining technical depth with creative thinking to deliver real impact.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
          <a
            href="#work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              padding: "14px 32px",
              background: "#e8a838",
              color: "#0c0c0c",
              fontWeight: 500,
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f0bc58"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#e8a838"; }}
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              padding: "14px 32px",
              border: "1px solid #2a2a2a",
              color: "#6b6560",
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#e8e2d6";
              (e.currentTarget as HTMLElement).style.color = "#e8e2d6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
              (e.currentTarget as HTMLElement).style.color = "#6b6560";
            }}
          >
            GET IN TOUCH
          </a>

          {/* Social links */}
          <div className="flex gap-4 ml-2">
            {[
              { label: "GitHub", url: "https://github.com/Stephenamoani-Odei" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/stephen-odei-amoani-42a99b343/" },
              { label: "X", url: "https://x.com/home" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  color: "#6b6560",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e8a838"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
              >
                {social.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#2a2a2a" }}>SCROLL</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #2a2a2a, transparent)" }} />
        </div>
      </div>
    </section>
  );
}

function About() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section id="about" style={{ background: "#0c0c0c", padding: "120px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            data-aos="fade-right"
            data-aos-duration="800"
            style={{ position: "relative", overflow: "hidden", background: "#141414" }}
          >
            <div ref={imgRef} style={{ overflow: "hidden" }}>
              <img
                src="/odei amoani stephen.jpeg"
                alt="Odei Amoani Stephen — developer and designer"
                style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }}
              />
            </div>
            {/* Accent corner */}
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 80, height: 80, border: "2px solid #e8a838", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 20, left: 20, fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#e8a838", background: "#0c0c0c", padding: "4px 10px" }}>
              GHANA, WEST AFRICA
            </div>
          </div>

          {/* Text */}
          <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            <p className="section-label mb-6">// 01 — About</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#e8e2d6",
                marginBottom: 24,
              }}
            >
              Building the web, securing systems, and making sense of data.
            </h2>
            <p style={{ color: "#6b6560", lineHeight: 1.75, marginBottom: 16 }}>
              I"m <span style={{ color: "#e8e2d6" }}>Odei Amoani Stephen</span>, a web developer from Ghana with a broad and versatile skill set spanning frontend development, cybersecurity, system design, and data analytics. I thrive at the intersection of technology and creative thinking.
            </p>
            <p style={{ color: "#6b6560", lineHeight: 1.75, marginBottom: 32 }}>
              Beyond code, I bring value as a <span style={{ color: "#e8e2d6" }}>content creator</span>, <span style={{ color: "#e8e2d6" }}>AI tools specialist</span>, and <span style={{ color: "#e8e2d6" }}>virtual assistant</span> — making me a one-stop professional for teams that need both technical execution and strategic support.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6" style={{ borderTop: "1px solid #1c1c1c" }}>
              {[
                { n: "3+", label: "Years exp." },
                { n: "20+", label: "Projects" },
                { n: "8", label: "Skill areas" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#e8a838", lineHeight: 1 }}>{n}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#6b6560", marginTop: 4 }}>{label.toUpperCase()}</p>
                </div>
              ))}
            </div>

            <a
              href="/resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 32,
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                color: "#e8a838",
                borderBottom: "1px solid #e8a83860",
                paddingBottom: 2,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e8a838"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e8a83860"; }}
            >
              DOWNLOAD RÉSUMÉ ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Frontend", "Security", "Architecture", "Data", "Creative", "AI", "Operations"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.cat === activeCategory);

  return (
    <section id="skills" ref={sectionRef} style={{ background: "#080808", padding: "120px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" data-aos="fade-up">
          <p className="section-label mb-4">// 02 — Skills</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#e8e2d6",
              }}
            >
              Capabilities &<br />
              <span style={{ fontStyle: "italic", color: "#e8a838" }}>expertise.</span>
            </h2>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    padding: "6px 14px",
                    border: `1px solid ${activeCategory === cat ? "#e8a838" : "#2a2a2a"}`,
                    color: activeCategory === cat ? "#e8a838" : "#6b6560",
                    background: activeCategory === cat ? "rgba(232,168,56,0.08)" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <div className="flex justify-between items-baseline mb-2">
                <span style={{ color: "#e8e2d6", fontSize: "0.9rem" }}>{skill.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#6b6560" }}>{skill.level}%</span>
              </div>
              <div style={{ height: 2, background: "#1c1c1c", position: "relative", overflow: "hidden" }}>
                <div
                  className="skill-fill"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    background: "linear-gradient(to right, #e8a838, #f0bc58)",
                    width: animated ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#2a2a2a", marginTop: 4 }}>
                {skill.cat.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        {/* Tech logos row */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-20 flex flex-wrap gap-3"
          style={{ borderTop: "1px solid #1c1c1c", paddingTop: 40 }}
        >
          {["React.js", "JavaScript", "HTML/CSS", "Cybersecurity", "System Design", "Data Analytics", "Content Creation", "AI Tools", "Virtual Assistant", "Git", "Figma", "MS Office"].map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" style={{ background: "#0c0c0c", padding: "120px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" data-aos="fade-up">
          <p className="section-label mb-4">// 03 — Selected Work</p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#e8e2d6",
              maxWidth: 560,
            }}
          >
            Web apps, dashboards &<br /><span style={{ fontStyle: "italic", color: "#e8a838" }}>security concepts.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              className="project-card block"
              data-aos="fade-up"
              data-aos-delay={i * 100}
              style={{
                background: "#141414",
                border: "1px solid #1c1c1c",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              {/* Image */}
              <div style={{ overflow: "hidden", height: 220, background: "#1c1c1c", position: "relative" }}>
                <img
                  src={project.img}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", background: project.category === "Security" ? "rgba(232,168,56,0.15)" : "#0c0c0c", color: project.category === "Security" ? "#e8a838" : "#6b6560", border: project.category === "Security" ? "1px solid #e8a83860" : "none", padding: "4px 10px" }}>
                    {project.category.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", background: "#0c0c0c", color: "#6b6560", padding: "4px 10px" }}>
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "24px 28px 28px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "#e8e2d6",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ color: "#6b6560", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: 16 }}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "#e8a838",
                  }}
                >
                  VIEW PROJECT →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div data-aos="fade-up" className="mt-12 text-center">
          <a
            href="#"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              color: "#6b6560",
              borderBottom: "1px solid #2a2a2a",
              paddingBottom: 2,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e8e2d6"; (e.currentTarget as HTMLElement).style.borderColor = "#e8e2d6"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a"; }}
          >
            SEE ALL PROJECTS ON GITHUB
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const result = await sendEmail(form);
    
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" style={{ background: "#080808", padding: "120px 0" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16" data-aos="fade-up">
          <p className="section-label mb-4">// 04 — Contact</p>
          <div ref={lineRef} style={{ width: "100%", height: 1, background: "#1c1c1c", marginBottom: 48 }} />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#e8e2d6",
            }}
          >
            Let"s build<br />
            <span style={{ fontStyle: "italic", color: "#e8a838" }}>something great.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-16">
          {/* Info */}
          <div className="md:col-span-2" data-aos="fade-right" data-aos-delay="100">
            <p style={{ color: "#6b6560", lineHeight: 1.75, marginBottom: 40, fontSize: "0.9rem" }}>
              Available for freelance projects, full-time roles, content work, and virtual assistant engagements. I respond within 24 hours and am open to both local and international clients.
            </p>

            <div className="flex flex-col gap-6">
              {[
                { label: "EMAIL", value: "odeiamoanistephen@email.com" },
                { label: "LOCATION", value: "Ghana, West Africa — Remote OK" },
                { label: "STATUS", value: "Available for hire" },
              ].map(({ label, value }) => (
                <div key={label} style={{ borderLeft: "2px solid #1c1c1c", paddingLeft: 16 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6b6560", marginBottom: 4 }}>{label}</p>
                  <p style={{ color: "#e8e2d6", fontSize: "0.875rem" }}>{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              {["GitHub", "LinkedIn", "Dribbble"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: "#6b6560",
                    padding: "8px 14px",
                    border: "1px solid #1c1c1c",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#e8a838";
                    (e.currentTarget as HTMLElement).style.borderColor = "#e8a838";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#6b6560";
                    (e.currentTarget as HTMLElement).style.borderColor = "#1c1c1c";
                  }}
                >
                  {s.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3" data-aos="fade-left" data-aos-delay="150">
            {status === "success" ? (
              <div
                style={{
                  background: "#141414",
                  border: "1px solid #e8a83840",
                  padding: "64px 40px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontStyle: "italic", color: "#e8a838", marginBottom: 12 }}>
                  Message sent!
                </p>
                <p style={{ color: "#6b6560", fontSize: "0.875rem" }}>
                  I"ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6b6560", display: "block", marginBottom: 8 }}>
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Alex Rivera"
                      className="form-field w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6b6560", display: "block", marginBottom: 8 }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@company.com"
                      className="form-field w-full px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6b6560", display: "block", marginBottom: 8 }}>
                    SUBJECT *
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="form-field w-full px-4 py-3 text-sm"
                    style={{ appearance: "none", cursor: "pointer" }}
                  >
                    <option value="" disabled>Select a topic…</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Full-time Role">Full-time Role</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6b6560", display: "block", marginBottom: 8 }}>
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or opportunity…"
                    className="form-field w-full px-4 py-3 text-sm"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    padding: "16px 36px",
                    background: status === "sending" ? "#b07c20" : "#e8a838",
                    color: "#0c0c0c",
                    border: "none",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    alignSelf: "flex-start",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#f0bc58"; }}
                  onMouseLeave={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#e8a838"; }}
                >
                  {status === "sending" ? "SENDING…" : "SEND MESSAGE →"}
                </button>

                {status === "error" && (
                  <p style={{ color: "#e87a38", fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
                    Something went wrong. Please try emailing directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0c0c0c", borderTop: "1px solid #1c1c1c", padding: "40px 0" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span style={{ fontFamily: "var(--font-display)", color: "#e8a838", fontSize: "1.1rem", fontWeight: 600 }}>OAS.</span>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#2a2a2a" }}>
          © {new Date().getFullYear()} ODEI AMOANI STEPHEN — CRAFTED WITH CARE
        </p>
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "#6b6560",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e8a838"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
        >
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    AOS.init({ once: true, offset: 80, easing: "ease-out-cubic" });

    const sections = ["hero", "about", "skills", "work", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: "#0c0c0c", minHeight: "100%" }}>
      <Navbar active={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}
