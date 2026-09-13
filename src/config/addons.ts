/**
 * Add-ons and maintenance plans (brief §5.7 — data exactly as provided in the original prompt).
 * Note: source-code handover is NOT an add-on; it is a term (terms.ts).
 */

import type { PriceStyle } from '@/lib/format';

export type Addon = {
  label: string;
  price: PriceStyle;
};

export const addons: Addon[] = [
  { label: 'Halaman statis tambahan', price: { kind: 'perPage', amount: 0.75 } },
  { label: 'Halaman dengan desain unik', price: { kind: 'perPage', amount: 1.5 } },
  { label: 'Login dan registrasi', price: { kind: 'from', amount: 3_500_000 } },
  { label: 'Social login', price: { kind: 'perProvider', amount: 1.5 } },
  { label: 'Role dan permission', price: { kind: 'from', amount: 4_000_000 } },
  { label: 'Admin panel / CMS', price: { kind: 'from', amount: 6_000_000 } },
  { label: 'Payment gateway', price: { kind: 'perProvider', amount: 4 } },
  { label: 'Integrasi ongkir', price: { kind: 'perProvider', amount: 3 } },
  { label: 'Integrasi API eksternal', price: { kind: 'perApi', amount: 3 } },
  { label: 'WhatsApp / email notification', price: { kind: 'perChannel', amount: 2 } },
  { label: 'Dashboard analytics', price: { kind: 'from', amount: 4_000_000 } },
  { label: 'Export Excel / PDF', price: { kind: 'from', amount: 1_500_000 } },
  { label: 'Multi-language', price: { kind: 'percentOfDevelopment', percent: 25 } },
  { label: 'Progressive Web App', price: { kind: 'from', amount: 6_000_000 } },
  { label: 'Real-time data / WebSocket', price: { kind: 'from', amount: 6_000_000 } },
  { label: 'Migrasi data / website', price: { kind: 'from', amount: 3_000_000 } },
  { label: 'Technical SEO setup', price: { kind: 'from', amount: 2_000_000 } },
  { label: 'Deployment assistance', price: { kind: 'from', amount: 1_500_000 } },
];

export type MaintenancePlan = {
  id: string;
  name: string;
  price: PriceStyle;
  includes: string;
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: { kind: 'perMonth', amount: 1 },
    includes: 'monitoring dan perbaikan bug ringan',
  },
  {
    id: 'business',
    name: 'Business',
    price: { kind: 'perMonth', amount: 2.5 },
    includes: 'update dan perubahan kecil berkala',
  },
  {
    id: 'priority',
    name: 'Priority',
    price: { kind: 'perMonth', amount: 5 },
    includes: 'prioritas support dan pengembangan rutin',
  },
];
