export interface ImpactCardItem {
  id: string;
  badgeColor: 'emerald' | 'indigo' | 'purple' | 'blue';
  tags: string[];
  iconSvg: string;
}

export const impactCardsData: ImpactCardItem[] = [
  {
    id: 'fintech-microservices',
    badgeColor: 'emerald',
    tags: ['Spring Boot', 'FastAPI', 'High Throughput'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>'
  },
  {
    id: 'ai-agents-mcp',
    badgeColor: 'indigo',
    tags: ['AI Agents', 'MCP Servers', 'Incident Automation'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
  },
  {
    id: 'aurora-migration',
    badgeColor: 'purple',
    tags: ['RDS Aurora', 'Zero-Downtime', 'CDC & Replication'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>'
  },
  {
    id: 'aws-k8s-orchestration',
    badgeColor: 'blue',
    tags: ['Kubernetes', 'AWS ECS/Lambda', 'Apache Kafka'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>'
  },
  {
    id: 'finops-optimization',
    badgeColor: 'purple',
    tags: ['Cost Optimization', 'Spot Instances', 'Monthly Savings'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
  },
  {
    id: 'stripe-dr',
    badgeColor: 'emerald',
    tags: ['Stripe Integration', 'State Machines', 'Disaster Recovery'],
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"/>'
  }
];
