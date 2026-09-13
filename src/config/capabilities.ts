/**
 * Capability marquee (brief §5.3, proposal P7 approved as proposed).
 * A marquee is a claim: only list what Bima actually uses. Items marked
 * confirmed:false are still pending his yes/no and are tracked in
 * docs/content-needed.md — flip them to true once he confirms.
 */

export type CapabilityKind = 'capability' | 'tech';

export type Capability = {
  label: string;
  kind: CapabilityKind;
  confirmed: boolean;
};

export const capabilities: Capability[] = [
  { label: 'Custom Website', kind: 'capability', confirmed: true },
  { label: 'Web Application', kind: 'capability', confirmed: true },
  { label: 'AI Integration', kind: 'capability', confirmed: true },
  { label: 'Business Automation', kind: 'capability', confirmed: true },
  { label: 'Admin Panel & CMS', kind: 'capability', confirmed: true },
  { label: 'Payment Gateway', kind: 'capability', confirmed: true },
  { label: 'Third-party API', kind: 'capability', confirmed: true },
  { label: 'Technical SEO', kind: 'capability', confirmed: true },
  { label: 'Performance Setup', kind: 'capability', confirmed: true },
  { label: 'Design System', kind: 'capability', confirmed: false },
  { label: 'Automation Workflow', kind: 'capability', confirmed: false },
  { label: 'Testing & QA', kind: 'capability', confirmed: false },
  { label: 'Deployment & CI', kind: 'capability', confirmed: false },
  { label: 'Astro', kind: 'tech', confirmed: false },
  { label: 'TypeScript', kind: 'tech', confirmed: false },
  { label: 'Tailwind CSS', kind: 'tech', confirmed: false },
  { label: 'Node.js', kind: 'tech', confirmed: false },
  { label: 'PostgreSQL', kind: 'tech', confirmed: false },
  { label: 'Three.js', kind: 'tech', confirmed: false },
  { label: 'GSAP', kind: 'tech', confirmed: false },
];

/** Only confirmed entries are rendered — an unconfirmed tech would be a false claim. */
export const confirmedCapabilities = capabilities.filter((item) => item.confirmed);
