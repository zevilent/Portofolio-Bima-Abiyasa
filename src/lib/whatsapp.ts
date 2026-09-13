/**
 * WhatsApp message builders — pure functions, fully tested (brief §5.13, §12.1).
 * No formatting of user input happens here beyond trimming; the URL encoder is applied
 * once, at the end, so newlines become %0A exactly as WhatsApp expects.
 */

export type BriefInput = {
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  description: string;
  contact?: string;
};

export type BriefErrors = Partial<Record<keyof BriefInput, string>>;

export const BRIEF_LIMITS = {
  nameMin: 2,
  nameMax: 60,
  descriptionMin: 20,
  descriptionMax: 600,
} as const;

/** Compose the brief message exactly as specified in the brief. */
export function buildBriefMessage(input: BriefInput): string {
  const lines: string[] = ['Halo Bima, saya ingin membahas proyek.', ''];

  if (input.projectType.trim()) lines.push(`Jenis proyek: ${input.projectType.trim()}`);
  if (input.budget.trim()) lines.push(`Budget: ${input.budget.trim()}`);
  if (input.timeline.trim()) lines.push(`Target mulai: ${input.timeline.trim()}`);
  if (input.name.trim()) lines.push(`Nama: ${input.name.trim()}`);
  if (input.contact?.trim()) lines.push(`Kontak: ${input.contact.trim()}`);

  const description = input.description.trim();
  if (description) {
    lines.push('', 'Ringkasan:', description);
  }

  return lines.join('\n');
}

/** Short consult message (header, hero, pricing, footer, 404). */
export function buildConsultMessage(): string {
  return 'Halo Bima, saya ingin mendiskusikan proyek web.';
}

/** Case-study specific message, e.g. from a case study page CTA. */
export function buildCaseStudyMessage(projectName: string): string {
  return `Halo Bima, saya tertarik dengan cara Anda mengerjakan ${projectName}. Saya ingin membahas proyek serupa.`;
}

/** wa.me URL for a number in international format (with or without leading +). */
export function whatsappUrl(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function consultWhatsappUrl(phone: string): string {
  return whatsappUrl(phone, buildConsultMessage());
}

export function briefWhatsappUrl(phone: string, input: BriefInput): string {
  return whatsappUrl(phone, buildBriefMessage(input));
}

/**
 * Validation for the 3-step brief form. Indonesian messages, no colour-only errors
 * (brief §5.9, §9). The honeypot field is checked separately in the form component.
 */
export function validateBrief(input: BriefInput): BriefErrors {
  const errors: BriefErrors = {};

  if (!input.projectType.trim()) {
    errors.projectType = 'Pilih jenis proyek dulu.';
  }

  if (!input.budget.trim()) {
    errors.budget = 'Pilih rentang budget.';
  }

  if (!input.timeline.trim()) {
    errors.timeline = 'Pilih target mulai.';
  }

  const name = input.name.trim();
  if (!name) {
    errors.name = 'Nama tidak boleh kosong.';
  } else if (name.length < BRIEF_LIMITS.nameMin) {
    errors.name = `Nama minimal ${BRIEF_LIMITS.nameMin} karakter.`;
  } else if (name.length > BRIEF_LIMITS.nameMax) {
    errors.name = `Nama maksimal ${BRIEF_LIMITS.nameMax} karakter.`;
  }

  const description = input.description.trim();
  if (!description) {
    errors.description = 'Ceritakan singkat proyek Anda.';
  } else if (description.length < BRIEF_LIMITS.descriptionMin) {
    errors.description = `Minimal ${BRIEF_LIMITS.descriptionMin} karakter supaya saya bisa menilai kebutuhannya.`;
  } else if (description.length > BRIEF_LIMITS.descriptionMax) {
    errors.description = `Maksimal ${BRIEF_LIMITS.descriptionMax} karakter.`;
  }

  if (input.contact && input.contact.trim().length > 120) {
    errors.contact = 'Maksimal 120 karakter.';
  }

  return errors;
}

export function isValidBrief(errors: BriefErrors): boolean {
  return Object.keys(errors).length === 0;
}
