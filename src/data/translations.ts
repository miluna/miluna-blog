export type Lang = 'en' | 'es';

export interface MultilingualProps {
  lang?: Lang;
}

export const translations = {
  en: {
    // Layout
    layoutDefaultTitle: "Miluna Cloud | Cloud Distributed Systems Architecture, AWS & Kubernetes",
    layoutDefaultDescription: "Miluna Cloud Services is the consulting page of Miguel Ángel Luna, Senior Software Engineer specialized in Cloud Distributed Systems on AWS and Kubernetes (K8s, ECS, Lambda, Kafka, RDS Aurora).",

    // Header
    home: "Home",
    aboutMe: "About Me",
    blog: "Blog",
    contact: "Contact",
    language: "Language:",

    // Footer
    footerDesc: "Consulting and architecture of cloud distributed systems (Kubernetes, AWS ECS, Lambda, Kafka).",
    specialties: "Specialties",
    specialtyCloud: "Cloud Microservices",
    specialtyAI: "AI Agents & MCP",
    specialtyPayments: "Payment Gateways",
    specialtyMigrations: "Migrations & Cost Optimization",
    navigation: "Navigation",
    aboutMiguel: "About Miguel Ángel",
    allRightsReserved: "All rights reserved.",
    seniorConsultantLine: "Senior Cloud Distributed Systems Consulting by Miguel Ángel Luna",

    // HeroSection
    heroStatusBadge: "Available for Backend, Cloud AWS & AI Agents projects",
    heroTitlePart1: "Backend Microservices",
    heroTitleAnd: "and",
    heroTitlePart2: "Cloud Architecture",
    heroDesc: "Senior engineering services by Miguel Ángel Luna. Specialized in microservices development with Spring Boot & FastAPI, deployments on AWS and Kubernetes, building AI Agents and MCP Servers, and zero-downtime RDS Aurora migrations.",
    contactMe: "Contact Me",
    learnMore: "Learn More",
    featuredCompanies: "Featured Companies & Projects",

    // CapabilitiesGrid
    technicalDomain: "Technical Domain",
    specializationHeader: "Specialization & Core Capabilities",
    capabilitiesDesc: "Cutting-edge engineering focused on resilient microservices, distributed infrastructure, and advanced AI automation.",

    // RecentPosts
    technicalPublications: "Technical Posts",
    engineeringArticles: "Engineering Articles",
    viewAllArticles: "View all articles",
    read: "Read",

    // ContactCTA
    contactBadge: "Do you have a Backend, Cloud, or AI Agents project?",
    contactTitle: "Let's solve operational challenges.",
    contactDesc: "From microservices in Spring Boot & FastAPI deployed on AWS/Kubernetes, to zero-downtime migrations in RDS Aurora and advanced automations with AI Agents.",

    // AboutHeader
    professionalProfile: "Professional Profile",
    professionalTitle: "Senior Software Engineer & Cloud Distributed Systems Consultant",
    linkedinButton: "View Full Profile on LinkedIn",

    // BioSection
    bioPara1: "I am Miguel Ángel Luna, a Software Engineer focused on the development of <strong class=\"text-slate-900 font-semibold\">backend microservices</strong> (Spring Boot & FastAPI), design of <strong class=\"text-slate-900 font-semibold\">cloud distributed systems</strong> (AWS & Kubernetes), and accelerated operational incident resolution using <strong class=\"text-slate-900 font-semibold\">AI Agents and MCP Servers</strong>.",
    bioPara2: "I have extensive experience in high-resiliency environments (FinTech, Cloud Automotive), specializing in zero-error margin architectures, hot migrations with zero-downtime, and infrastructure cost optimizations (FinOps).",

    // ImpactGrid
    technicalImpactHeader: "Technical Impact & Production Achievements",

    // BlogHeader
    blogHeaderTitle: "Engineering Blog",
    blogHeaderBadge: "Technical Posts",
    blogHeaderDesc: "Engineering insights, in-depth analyses, and thoughts on scalability, distributed computing, and mission-critical systems.",

    // BlogSidebar
    filterByTopic: "Filter by Topic",
    allTopics: "All Topics",
    specializedConsulting: "Specialized Consulting?",
    consultingAdDesc: "Infrastructure optimization, C++ compilers, distributed systems, and cloud architecture.",
    contactMeArrow: "Contact Me &rarr;",

    // BlogPostCard
    byAuthor: "By",
    readArticle: "Read Article",

    // BlogDetail
    backToAllArticles: "Back to all articles",
    writtenBy: "Written by",
    publishedOn: "Published on",
    consultingServicesTitle: "Consulting & Engineering Services",
    consultingServicesDesc: "Do you need specialized architectural help with Microservices, Cloud (AWS/K8s), or AI Agents? Let's talk.",

    // Blog Index Texts
    blogNoPosts: "No articles found for the selected topic.",
    blogEmptyState: "No posts published yet. Check back soon!",
    blogDescription: "Engineering insights, in-depth analyses, and thoughts on scalability, distributed computing, and mission-critical systems.",

    // Dynamic Services Data
    services: {
      'cloud-dev': {
        title: "Cloud Development",
        description: "Robust microservices in Spring Boot and asynchronous APIs with FastAPI. Container orchestration (K8s/ECS), serverless, and Kafka streaming.",
        linkText: "Hire →"
      },
      'ai-mcp': {
        title: "AI Agents & MCP",
        description: "Automation of incident resolution in production through MCP servers.",
        linkText: "Hire →"
      },
      'payment-gateways': {
        title: "Payment Gateways",
        description: "Integration with Stripe, PayPal, and Adyen.",
        linkText: "Hire →"
      },
      'migrations-finops': {
        title: "Migrations & FinOps",
        description: "Zero-downtime RDS Aurora migrations and cloud cost optimization.",
        linkText: "Hire →"
      }
    },

    // Dynamic Impact Cards Data
    cards: {
      'fintech-microservices': {
        category: "FinTech Scale",
        title: "FinTech Microservices at Massive Scale",
        description: "Development and implementation of microservices with Spring Boot and FastAPI on financial platforms processing millions of monthly requests at global scale."
      },
      'ai-agents-mcp': {
        category: "AI Automation",
        title: "AI Agents & MCP Servers",
        description: "Creation of AI Agents and MCP servers integrated with scripts to diagnose and solve dozens of critical production incidents in record time."
      },
      'aurora-migration': {
        category: "Database",
        title: "Zero-Downtime RDS Aurora Migrations",
        description: "Planning and execution of massive database migrations in production on RDS Aurora without interrupting service or causing degradation."
      },
      'aws-k8s-orchestration': {
        category: "Infrastructure",
        title: "Cloud Orchestration in AWS & K8s",
        description: "Production deployments on Kubernetes (K8s), AWS ECS, and Lambda with high-speed event pipelines (Kafka, SQS, EventBridge)."
      },
      'finops-optimization': {
        category: "FinOps",
        title: "FinOps Optimization ($$$ Savings)",
        description: "Auditing and re-architecture of compute and storage, achieving proven savings of thousands of dollars per month on the cloud bill."
      },
      'stripe-dr': {
        category: "Payments & DR",
        title: "Stripe Payments & Disaster Recovery",
        description: "Integration of Stripe and payment gateways with idempotent logic, bug-free state machines, and design of Disaster Recovery (DR) plans."
      }
    }
  },
  es: {
    // Layout
    layoutDefaultTitle: "Miluna Cloud | Arquitectura de Sistemas Distribuidos Cloud, AWS & Kubernetes",
    layoutDefaultDescription: "Miluna Cloud Services es la página de consultoría de Miguel Ángel Luna, Ingeniero de Software Senior especializado en Sistemas Distribuidos Cloud sobre AWS y Kubernetes (K8s, ECS, Lambda, Kafka, RDS Aurora).",

    // Header
    home: "Inicio",
    aboutMe: "Sobre Mí",
    blog: "Blog",
    contact: "Contacto",
    language: "Idioma:",

    // Footer
    footerDesc: "Consultoría y arquitectura de sistemas distribuidos en la nube (Kubernetes, AWS ECS, Lambda, Kafka).",
    specialties: "Especialidades",
    specialtyCloud: "Microservicios Cloud",
    specialtyAI: "Agentes IA & MCP",
    specialtyPayments: "Pasarelas de pagos",
    specialtyMigrations: "Migraciones y Optimización de Costes",
    navigation: "Navegación",
    aboutMiguel: "Sobre Miguel Ángel",
    allRightsReserved: "Todos los derechos reservados.",
    seniorConsultantLine: "Consultoría Senior en Sistemas Distribuidos Cloud por Miguel Ángel Luna",

    // HeroSection
    heroStatusBadge: "Disponible para proyectos Backend, Cloud AWS & Agentes de IA",
    heroTitlePart1: "Microservicios Backend",
    heroTitleAnd: "&",
    heroTitlePart2: "Arquitectura Cloud",
    heroDesc: "Servicios de ingeniería senior por Miguel Ángel Luna. Especializado en desarrollo de microservicios con Spring Boot & FastAPI, despliegues sobre AWS y Kubernetes, creación de Agentes de IA y Servidores MCP, y migraciones RDS Aurora sin caída de servicio.",
    contactMe: "Contactar",
    learnMore: "Saber más",
    featuredCompanies: "Empresas & Proyectos Destacados",

    // CapabilitiesGrid
    technicalDomain: "Dominio Técnico",
    specializationHeader: "Especialización & Capacidades Core",
    capabilitiesDesc: "Ingeniería de vanguardia enfocada en microservicios resilientes, infraestructura distribuida y automatización avanzada con IA.",

    // RecentPosts
    technicalPublications: "Publicaciones Técnicas",
    engineeringArticles: "Artículos de Ingeniería",
    viewAllArticles: "Ver todos los artículos",
    read: "Leer",

    // ContactCTA
    contactBadge: "¿Tienes un proyecto Backend, Cloud o de Agentes de IA?",
    contactTitle: "Resolvamos retos operativos.",
    contactDesc: "Desde microservicios en Spring Boot & FastAPI desplegados en AWS/Kubernetes, hasta migraciones sin caída en RDS Aurora y automatizaciones avanzadas con Agentes de IA.",

    // AboutHeader
    professionalProfile: "Perfil Profesional",
    professionalTitle: "Senior Software Engineer & Consultor de Sistemas Distribuidos Cloud",
    linkedinButton: "Ver Perfil Completo en LinkedIn",

    // BioSection
    bioPara1: "Soy Miguel Ángel Luna, Ingeniero de Software centrado en el desarrollo de <strong class=\"text-slate-900 font-semibold\">microservicios backend</strong> (Spring Boot & FastAPI), diseño de <strong class=\"text-slate-900 font-semibold\">sistemas distribuidos cloud</strong> (AWS & Kubernetes) y resolución acelerada de incidencias operativas mediante <strong class=\"text-slate-900 font-semibold\">Agentes de IA y Servidores MCP</strong>.",
    bioPara2: "Cuento con amplia experiencia en entornos de alta resiliencia (FinTech, Automoción Cloud), especializándome en arquitecturas de cero margen de error, migraciones en caliente sin caída de servicio y optimizaciones de costes de infraestructura (FinOps).",

    // ImpactGrid
    technicalImpactHeader: "Impacto Técnico & Logros en Producción",

    // BlogHeader
    blogHeaderTitle: "Engineering Blog",
    blogHeaderBadge: "Publicaciones Técnicas",
    blogHeaderDesc: "Perspectivas de ingeniería, análisis en profundidad y reflexiones sobre escalabilidad, cómputo distribuido y sistemas de misión crítica.",

    // BlogSidebar
    filterByTopic: "Filtrar por Tema",
    allTopics: "Todos los Temas",
    specializedConsulting: "¿Asesoría Especializada?",
    consultingAdDesc: "Optimización de infraestructura, compiladores C++, sistemas distribuidos y arquitectura en la nube.",
    contactMeArrow: "Contactar &rarr;",

    // BlogPostCard
    byAuthor: "Por",
    readArticle: "Leer Artículo",

    // BlogDetail
    backToAllArticles: "Volver a todos los artículos",
    writtenBy: "Escrito por",
    publishedOn: "Publicado el",
    consultingServicesTitle: "Servicios de Consultoría e Ingeniería",
    consultingServicesDesc: "¿Necesitas ayuda arquitectónica especializada en Microservicios, Cloud (AWS/K8s) o Agentes de IA? Hablemos.",

    // Blog Index Texts
    blogNoPosts: "No se encontraron artículos para este tema seleccionado.",
    blogEmptyState: "Todavía no hay posts publicados. ¡Vuelve pronto!",
    blogDescription: "Perspectivas de ingeniería, análisis en profundidad y reflexiones sobre escalabilidad, cómputo distribuido y sistemas de misión crítica.",

    // Dynamic Services Data
    services: {
      'cloud-dev': {
        title: "Desarrollo Cloud",
        description: "Microservicios robustos en Spring Boot y APIs asíncronas con FastAPI. Orquestación de contenedores (K8s/ECS), serverless y streaming Kafka.",
        linkText: "Contratar →"
      },
      'ai-mcp': {
        title: "Agentes de IA & MCP",
        description: "Automatización de resolución de incidencias en producción mediante servidores MCP.",
        linkText: "Contratar →"
      },
      'payment-gateways': {
        title: "Pasarelas de pagos",
        description: "Integración con Stripe, Paypal y Adyen.",
        linkText: "Contratar →"
      },
      'migrations-finops': {
        title: "Migraciones & FinOps",
        description: "Migraciones RDS Aurora zero-downtime y optimización de costes cloud.",
        linkText: "Contratar →"
      }
    },

    // Dynamic Impact Cards Data
    cards: {
      'fintech-microservices': {
        category: "Escala FinTech",
        title: "Microservicios FinTech a Escala Masiva",
        description: "Desarrollo e implementación de microservicios con Spring Boot y FastAPI en plataformas financieras procesando millones de peticiones mensuales a escala global."
      },
      'ai-agents-mcp': {
        category: "Automatización IA",
        title: "Agentes de IA & Servidores MCP",
        description: "Creación de Agentes de IA y servidores MCP integrados con scripts para diagnosticar y solucionar decenas de incidencias críticas en producción en tiempo récord."
      },
      'aurora-migration': {
        category: "Base de Datos",
        title: "Migraciones RDS Aurora Zero-Downtime",
        description: "Planificación y ejecución de migraciones de datos masivos en producción sobre RDS Aurora sin interrumpir el servicio ni generar degradación."
      },
      'aws-k8s-orchestration': {
        category: "Infraestructura",
        title: "Orquestación Cloud en AWS & K8s",
        description: "Despliegues en producción sobre Kubernetes (K8s), AWS ECS y Lambda con pipelines de eventos de alta velocidad (Kafka, SQS, EventBridge)."
      },
      'finops-optimization': {
        category: "FinOps",
        title: "Optimización FinOps ($$$ Ahorros)",
        description: "Auditoría y re-arquitectura de cómputo y almacenamiento logrando ahorros comprobados de miles de dólares al mes en factura cloud."
      },
      'stripe-dr': {
        category: "Pagos & DR",
        title: "Pagos Stripe & Recuperación ante Desastres",
        description: "Integración de Stripe y pasarelas con lógica idempotente, máquinas de estado sin bugs y diseño de planes Disaster Recovery (DR)."
      }
    }
  }
};

export type TranslationKey = keyof typeof translations.en;
