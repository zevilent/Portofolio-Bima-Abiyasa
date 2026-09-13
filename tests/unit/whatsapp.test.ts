import { describe, expect, it } from 'vitest';
import {
  BRIEF_LIMITS,
  buildBriefMessage,
  buildCaseStudyMessage,
  buildConsultMessage,
  consultWhatsappUrl,
  briefWhatsappUrl,
  isValidBrief,
  validateBrief,
  whatsappUrl,
} from '@/lib/whatsapp';

const fullBrief = {
  projectType: 'Company Profile',
  budget: 'Rp5–15 juta',
  timeline: '1–3 bulan',
  name: 'Sari',
  description: 'Butuh website company profile untuk jasa konstruksi, ada blog dan form lead.',
};

describe('buildBriefMessage', () => {
  it('matches the template agreed in the brief (§5.13)', () => {
    expect(buildBriefMessage(fullBrief)).toBe(
      [
        'Halo Bima, saya ingin membahas proyek.',
        '',
        'Jenis proyek: Company Profile',
        'Budget: Rp5–15 juta',
        'Target mulai: 1–3 bulan',
        'Nama: Sari',
        '',
        'Ringkasan:',
        'Butuh website company profile untuk jasa konstruksi, ada blog dan form lead.',
      ].join('\n'),
    );
  });

  it('omits empty optional fields instead of printing undefined/null', () => {
    const message = buildBriefMessage({
      projectType: 'Landing Page',
      budget: '',
      timeline: '',
      name: 'Budi',
      description: 'Butuh landing page untuk campaign produk baru bulan depan.',
      contact: '',
    });

    expect(message).not.toMatch(/undefined|null|Budget:|Target mulai:/);
    expect(message).toContain('Jenis proyek: Landing Page');
  });

  it('trims stray whitespace from every field', () => {
    const message = buildBriefMessage({
      ...fullBrief,
      projectType: '  Corporate  ',
      name: '  Sari  ',
      description: '  Deskripsi rapi.  ',
    });

    expect(message).toContain('Jenis proyek: Corporate\n');
    expect(message).toContain('Nama: Sari\n');
    expect(message).toContain('\nDeskripsi rapi.');
  });

  it('keeps newlines in the description so the message stays readable', () => {
    const message = buildBriefMessage({
      ...fullBrief,
      description: 'Baris satu.\nBaris dua.',
    });

    expect(message).toContain('Ringkasan:\nBaris satu.\nBaris dua.');
  });
});

describe('consult and case-study messages', () => {
  it('uses the fixed consult sentence', () => {
    expect(buildConsultMessage()).toBe('Halo Bima, saya ingin mendiskusikan proyek web.');
  });

  it('names the project in the case-study message', () => {
    expect(buildCaseStudyMessage('Hikari Tutor')).toBe(
      'Halo Bima, saya tertarik dengan cara Anda mengerjakan Hikari Tutor. Saya ingin membahas proyek serupa.',
    );
  });
});

describe('whatsappUrl', () => {
  it('strips non-digits from the phone number and encodes the text once', () => {
    const url = whatsappUrl('+6285155402545', 'Halo\nBima & rekan');
    expect(url.startsWith('https://wa.me/6285155402545?text=')).toBe(true);
    expect(url).toContain('%0A');
    expect(url).toContain('%26');
  });

  it('never double-encodes the message', () => {
    const url = briefWhatsappUrl('+6285155402545', fullBrief);
    const text = decodeURIComponent(url.split('?text=')[1] ?? '');
    expect(text).toBe(buildBriefMessage(fullBrief));
    expect(url).not.toContain('%250A');
  });

  it('produces a usable consult URL', () => {
    expect(consultWhatsappUrl('+62 851-5540-2545')).toBe(
      `https://wa.me/6285155402545?text=${encodeURIComponent(buildConsultMessage())}`,
    );
  });

  it('survives emoji and quotes in the description', () => {
    const url = briefWhatsappUrl('+6285155402545', {
      ...fullBrief,
      description: 'Mau ada tombol "Chat" & emoji ringan 🙂 untuk klinik gigi.',
    });
    const text = decodeURIComponent(url.split('?text=')[1] ?? '');
    expect(text).toContain('"Chat" & emoji ringan 🙂');
  });
});

describe('validateBrief', () => {
  it('accepts a complete brief', () => {
    const errors = validateBrief(fullBrief);
    expect(isValidBrief(errors)).toBe(true);
  });

  it('requires the three choices and the two text fields', () => {
    const errors = validateBrief({
      projectType: '',
      budget: '',
      timeline: '',
      name: '',
      description: '',
    });

    expect(Object.keys(errors).sort()).toEqual([
      'budget',
      'description',
      'name',
      'projectType',
      'timeline',
    ]);
    expect(errors.name).toBe('Nama tidak boleh kosong.');
  });

  it('enforces the documented length range for the description', () => {
    const tooShort = validateBrief({ ...fullBrief, description: 'terlalu singkat' });
    expect(tooShort.description).toContain(String(BRIEF_LIMITS.descriptionMin));

    const tooLong = validateBrief({
      ...fullBrief,
      description: 'a'.repeat(BRIEF_LIMITS.descriptionMax + 1),
    });
    expect(tooLong.description).toContain(String(BRIEF_LIMITS.descriptionMax));
  });

  it('rejects a one-character name', () => {
    const errors = validateBrief({ ...fullBrief, name: 'B' });
    expect(errors.name).toBe(`Nama minimal ${BRIEF_LIMITS.nameMin} karakter.`);
  });
});
