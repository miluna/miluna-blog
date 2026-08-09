export interface ImpactCardItem {
  id: string;
  category: string;
  title: string;
  description: string;
  badgeColor: 'emerald' | 'indigo' | 'purple' | 'blue';
  tags: string[];
  iconSvg: string;
}

export const impactCardsData: ImpactCardItem[] = [
  {
    id: 'fintech-microservices',
    category: 'Escala FinTech',
    title: 'Microservicios FinTech a Escala Masiva',
    description: 'Desarrollo e implementación de microservicios con Spring Boot y FastAPI en plataformas financieras procesando millones de peticiones mensuales a escala global.',
    badgeColor: 'emerald',
    tags: ['Spring Boot', 'FastAPI', 'High Throughput'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>'
  },
  {
    id: 'ai-agents-mcp',
    category: 'Automatización IA',
    title: 'Agentes de IA & Servidores MCP',
    description: 'Creación de Agentes de IA y servidores MCP integrados con scripts para diagnosticar y solucionar decenas de incidencias críticas en producción en tiempo récord.',
    badgeColor: 'indigo',
    tags: ['AI Agents', 'MCP Servers', 'Incident Automation'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
  },
  {
    id: 'aurora-migration',
    category: 'Base de Datos',
    title: 'Migraciones RDS Aurora Zero-Downtime',
    description: 'Planificación y ejecución de migraciones de datos masivos en producción sobre RDS Aurora sin interrumpir el servicio ni generar degradación.',
    badgeColor: 'purple',
    tags: ['RDS Aurora', 'Zero-Downtime', 'CDC & Replication'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>'
  },
  {
    id: 'aws-k8s-orchestration',
    category: 'Infraestructura',
    title: 'Orquestación Cloud en AWS & K8s',
    description: 'Despliegues en producción sobre Kubernetes (K8s), AWS ECS y Lambda con pipelines de eventos de alta velocidad (Kafka, SQS, EventBridge).',
    badgeColor: 'blue',
    tags: ['Kubernetes', 'AWS ECS/Lambda', 'Apache Kafka'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>'
  },
  {
    id: 'finops-optimization',
    category: 'FinOps',
    title: 'Optimización FinOps ($$$ Ahorros)',
    description: 'Auditoría y re-arquitectura de cómputo y almacenamiento logrando ahorros comprobados de miles de dólares al mes en factura cloud.',
    badgeColor: 'purple',
    tags: ['Cost Optimization', 'Spot Instances', 'Monthly Savings'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
  },
  {
    id: 'stripe-dr',
    category: 'Pagos & DR',
    title: 'Pagos Stripe & Recuperación ante Desastres',
    description: 'Integración de Stripe y pasarelas con lógica idempotente, máquinas de estado sin bugs y diseño de planes Disaster Recovery (DR).',
    badgeColor: 'emerald',
    tags: ['Stripe Integration', 'State Machines', 'Disaster Recovery'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"/>'
  }
];

export const impactCardsDataEn: ImpactCardItem[] = [
  {
    id: 'fintech-microservices',
    category: 'FinTech Scale',
    title: 'FinTech Microservices at Massive Scale',
    description: 'Development and implementation of microservices with Spring Boot and FastAPI on financial platforms processing millions of monthly requests at global scale.',
    badgeColor: 'emerald',
    tags: ['Spring Boot', 'FastAPI', 'High Throughput'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>'
  },
  {
    id: 'ai-agents-mcp',
    category: 'AI Automation',
    title: 'AI Agents & MCP Servers',
    description: 'Creation of AI Agents and MCP servers integrated with scripts to diagnose and solve dozens of critical production incidents in record time.',
    badgeColor: 'indigo',
    tags: ['AI Agents', 'MCP Servers', 'Incident Automation'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
  },
  {
    id: 'aurora-migration',
    category: 'Database',
    title: 'Zero-Downtime RDS Aurora Migrations',
    description: 'Planning and execution of massive database migrations in production on RDS Aurora without interrupting service or causing degradation.',
    badgeColor: 'purple',
    tags: ['RDS Aurora', 'Zero-Downtime', 'CDC & Replication'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>'
  },
  {
    id: 'aws-k8s-orchestration',
    category: 'Infrastructure',
    title: 'Cloud Orchestration in AWS & K8s',
    description: 'Production deployments on Kubernetes (K8s), AWS ECS, and Lambda with high-speed event pipelines (Kafka, SQS, EventBridge).',
    badgeColor: 'blue',
    tags: ['Kubernetes', 'AWS ECS/Lambda', 'Apache Kafka'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>'
  },
  {
    id: 'finops-optimization',
    category: 'FinOps',
    title: 'FinOps Optimization ($$$ Savings)',
    description: 'Auditing and re-architecture of compute and storage, achieving proven savings of thousands of dollars per month on the cloud bill.',
    badgeColor: 'purple',
    tags: ['Cost Optimization', 'Spot Instances', 'Monthly Savings'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
  },
  {
    id: 'stripe-dr',
    category: 'Payments & DR',
    title: 'Stripe Payments & Disaster Recovery',
    description: 'Integration of Stripe and payment gateways with idempotent logic, bug-free state machines, and design of Disaster Recovery (DR) plans.',
    badgeColor: 'emerald',
    tags: ['Stripe Integration', 'State Machines', 'Disaster Recovery'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"/>'
  }
];
