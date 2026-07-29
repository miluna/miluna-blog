export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badgeColor: 'emerald' | 'indigo' | 'blue' | 'purple';
  iconSvg: string;
  linkHref: string;
  linkText: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'cloud-dev',
    title: 'Desarrollo Cloud',
    description: 'Microservicios robustos en Spring Boot y APIs asíncronas con FastAPI. Orquestación de contenedores (K8s/ECS), serverless y streaming Kafka.',
    badgeColor: 'emerald',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>',
    linkHref: '/about#contact',
    linkText: 'Contratar →'
  },
  {
    id: 'ai-mcp',
    title: 'Agentes de IA & MCP',
    description: 'Automatización de resolución de incidencias en producción mediante servidores MCP.',
    badgeColor: 'indigo',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
    linkHref: '/about#contact',
    linkText: 'Contratar →'
  },
  {
    id: 'payment-gateways',
    title: 'Pasarelas de pagos',
    description: 'Integración con Stripe, Paypal y Adyen.',
    badgeColor: 'blue',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>',
    linkHref: '/about#contact',
    linkText: 'Contratar →'
  },
  {
    id: 'migrations-finops',
    title: 'Migraciones & FinOps',
    description: 'Migraciones RDS Aurora zero-downtime y optimización de costes cloud.',
    badgeColor: 'purple',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    linkHref: '/about#contact',
    linkText: 'Contratar →'
  }
];
