import React, { useState } from 'react';
import {
  CheckCircle2Icon,
  MailIcon,
  PhoneIcon,
  AlertCircleIcon,
  Loader2Icon,
  MapPinIcon,
  ArrowUpRightIcon,
  FactoryIcon,
  Building2Icon,
  BuildingIcon
} from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { company, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_URL } from '../data/company';
import { products } from '../data/products';
import { useSeo } from '../hooks/useSeo';
import { useSearchParams } from 'react-router-dom';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  requirement: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  companyName: '',
  phone: '',
  email: '',
  requirement: products[0].name,
  message: ''
};

export function Contact() {
  const [searchParams] = useSearchParams();
  const requestedBrand = searchParams.get('brand');
  const requestedProduct = searchParams.get('product') ?? searchParams.get('category');
  const requestedRequirement = requestedBrand && requestedProduct ? `${requestedBrand} — ${requestedProduct}` : null;
  const [form, setForm] = useState<FormState>(() => requestedRequirement ? { ...EMPTY, requirement: requestedRequirement, message: `I am interested in ${requestedRequirement}. Please share availability, specifications and quotation.` } : EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const mapDestination = company.factoryOffice.split('\n').slice(1).map((line) => line.replace(/,$/, '')).join(', ');

  useSeo({
    title: 'Contact',
    description: `Contact KHS-LG — ${company.email}, ${company.phone}. Request a quote for precision bearing solutions.`,
    path: '/contact'
  });

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let val = e.target.value;
    if (key === 'phone') {
      val = val.replace(/\D/g, '').slice(0, 10);
    }
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};

    const trimmedName = form.name.trim();
    if (!trimmedName) {
      next.name = 'Full name is required.';
    } else if (trimmedName.length < 2) {
      next.name = 'Full name must be at least 2 characters.';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      next.name = 'Name can only contain alphabetic letters and spaces.';
    }

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      next.email = 'Email address is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      next.email = 'Enter a valid email address (e.g. name@company.com).';
    }

    const cleanPhone = form.phone.replace(/\D/g, '');
    if (form.phone.trim()) {
      if (cleanPhone.length !== 10) {
        next.phone = 'Phone number must be exactly 10 digits.';
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        next.phone = 'Enter a valid 10-digit mobile number (e.g. 9876543210).';
      }
    }

    const trimmedMessage = form.message.trim();
    if (!trimmedMessage) {
      next.message = 'Please provide details about your requirement.';
    } else if (trimmedMessage.length < 10) {
      next.message = 'Please enter at least 10 characters describing your application.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    setStatus('submitting');

    const lines = [
      `*New Quote Request — KHS-LG Website*`,
      ``,
      `*Name:* ${form.name.trim()}`,
      form.companyName.trim() ? `*Company:* ${form.companyName.trim()}` : null,
      form.phone.trim() ? `*Phone:* ${form.phone.trim()}` : null,
      `*Email:* ${form.email.trim()}`,
      form.requirement.trim() ? `*Product / Requirement:* ${form.requirement.trim()}` : null,
      ``,
      `*Application / Requirements:*`,
      form.message.trim()
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(lines)}`;

    window.setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setStatus('success');
    }, 400);
  };

  return (
    <main>
      <PageHero
        code="Contact"
        eyebrow="Request a quote"
        lines={["Let's build", 'Better motion.']}
        body="Send us the application, the size and the motion you need. The KHS-LG team will come back with the right bearing from the range." />
      

      {/* Tier 1: Direct Inquiries & Request a Quote */}
      <section className="bg-ink-900 py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Left Column: Direct Inquiries & Quick Connect */}
            <div className="space-y-6">
              <div>
                <TechnicalLabel code="Direct">Get in touch</TechnicalLabel>
                <h2 className="mt-2 font-display text-2xl font-bold uppercase text-steel-50 sm:text-3xl">
                  Connect With Engineering & Sales
                </h2>
                <p className="mt-2 text-sm text-steel-400">
                  Speak directly with our technical application team or submit your requirements for expedited quoting, CAD models, and stock verification.
                </p>
              </div>

              {/* Direct Channels Cards */}
              <div className="space-y-px border border-ink-700 bg-ink-700">
                <div className="flex flex-col justify-between gap-3 bg-ink-950 p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Sales Inquiries</p>
                    <a
                      className="mt-1 flex items-center gap-2.5 font-display text-lg font-semibold uppercase text-steel-50 transition-colors hover:text-signal"
                      href={company.salesEmailHref}
                    >
                      <MailIcon className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                      {company.salesEmail}
                    </a>
                  </div>
                  <a
                    href={company.salesEmailHref}
                    className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-tech text-signal hover:underline"
                  >
                    Email Sales
                    <ArrowUpRightIcon className="h-3 w-3" />
                  </a>
                </div>

                <div className="flex flex-col justify-between gap-3 bg-ink-950 p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">General Support</p>
                    <a
                      className="mt-1 flex items-center gap-2.5 font-display text-lg font-semibold uppercase text-steel-50 transition-colors hover:text-signal"
                      href={company.emailHref}
                    >
                      <MailIcon className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                      {company.email}
                    </a>
                  </div>
                  <a
                    href={company.emailHref}
                    className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-tech text-steel-400 hover:text-signal hover:underline"
                  >
                    Write to us
                    <ArrowUpRightIcon className="h-3 w-3" />
                  </a>
                </div>

                <div className="flex flex-col justify-between gap-3 bg-ink-950 p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Direct Phone Line</p>
                    <a
                      className="mt-1 flex items-center gap-2.5 font-display text-lg font-semibold uppercase text-steel-50 transition-colors hover:text-signal"
                      href={company.phoneHref}
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                      {company.phone}
                    </a>
                  </div>
                  <a
                    href={company.phoneHref}
                    className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-tech text-signal hover:underline"
                  >
                    Call Now
                    <ArrowUpRightIcon className="h-3 w-3" />
                  </a>
                </div>

                <div className="bg-ink-950 p-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Instant WhatsApp Chat</p>
                      <p className="mt-1 font-display text-lg font-semibold uppercase text-steel-50">+91 91752 75964</p>
                    </div>
                    <a
                      href={COMPANY_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start border border-signal/40 bg-signal/10 px-3.5 py-2 font-mono text-[10px] uppercase tracking-tech text-signal transition-colors hover:bg-signal hover:text-ink-950"
                    >
                      Chat on WhatsApp
                      <ArrowUpRightIcon className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-steel-400">
                    Quick technical inquiries, stock confirmation & instant quotes.
                  </p>
                </div>
              </div>

              {/* Working Hours & SLA */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-ink-700 bg-ink-950 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Response SLA</p>
                  <p className="mt-1 font-display text-base font-bold uppercase text-steel-100">Within 2 Hours</p>
                  <p className="mt-1 text-xs text-steel-400">For standard catalog bearing RFQs during business hours</p>
                </div>
                <div className="border border-ink-700 bg-ink-950 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">Operating Hours</p>
                  <p className="mt-1 font-display text-base font-bold uppercase text-steel-100">Mon – Sat: 9am – 7pm</p>
                  <p className="mt-1 text-xs text-steel-400">Indian Standard Time (IST) • Dispatches active daily</p>
                </div>
              </div>
            </div>

            {/* Right Column: Request a Quote Form (self-start ensures NO vertical stretching) */}
            <form
              onSubmit={submit}
              noValidate
              className="self-start border border-ink-700 bg-ink-950 p-6 shadow-xl sm:p-9"
            >
              <div className="flex items-center justify-between gap-4 border-b border-ink-800 pb-5">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase text-steel-50 sm:text-3xl">
                    Request a Quote
                  </h2>
                  <p className="mt-1 text-xs text-steel-400">
                    Fields marked with <span className="text-signal">*</span> are required.
                  </p>
                </div>
                <span className="hidden font-mono text-[10px] uppercase tracking-tech text-signal sm:inline-block">
                  RFQ Portal
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  placeholder="e.g. Rahul Sharma"
                  required
                  value={form.name}
                  onChange={update('name')}
                  error={errors.name}
                  autoComplete="name"
                />

                <Field
                  label="Company"
                  placeholder="e.g. Acme Precision Ltd"
                  value={form.companyName}
                  onChange={update('companyName')}
                  autoComplete="organization"
                />

                <Field
                  label="Phone"
                  placeholder="10-digit number (e.g. 9876543210)"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />

                <Field
                  label="Email"
                  placeholder="e.g. rahul@example.com"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                />

                <div className="flex flex-col sm:col-span-2">
                  <label htmlFor="requirement" className="field-label text-xs">
                    Product / Requirement
                  </label>
                  <select
                    id="requirement"
                    value={form.requirement}
                    onChange={update('requirement')}
                    className="field-input cursor-pointer text-xs"
                  >
                    {requestedRequirement && <option value={requestedRequirement}>{requestedRequirement}</option>}
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Other requirement">Other requirement</option>
                  </select>
                </div>

                <div className="flex flex-col sm:col-span-2">
                  <label htmlFor="message" className="field-label text-xs">
                    Message / Specifications <span className="text-signal">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Describe your specifications, dimensions, tolerances, quantities, or delivery requirements..."
                    className={`field-input resize-y text-xs ${
                      errors.message ? 'border-red-400/80 ring-1 ring-red-400/30' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-red-500" role="alert">
                      <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-ink-800 pt-6">
                <MagneticButton type="submit" variant="yellow">
                  {status === 'submitting' ? 'Preparing WhatsApp...' : 'Request a Quote on WhatsApp'}
                </MagneticButton>

                <div aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.12em]">
                  {status === 'submitting' && (
                    <span className="flex items-center gap-2 text-steel-400">
                      <Loader2Icon className="h-3.5 w-3.5 animate-spin" aria-hidden />
                      Opening WhatsApp
                    </span>
                  )}
                  {status === 'success' && (
                    <span className="flex flex-wrap items-center gap-2 font-semibold text-signal">
                      <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden />
                      Quote request opened in WhatsApp! Our team will respond shortly.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="flex items-center gap-2 font-medium text-red-500">
                      <AlertCircleIcon className="h-3.5 w-3.5 text-red-500" aria-hidden />
                      Check the highlighted fields
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Tier 2: Facilities & Offices Section */}
      <section className="border-t border-ink-800 bg-ink-950 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <TechnicalLabel code="Facilities">Our Presence</TechnicalLabel>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-steel-50 sm:text-4xl">
              Manufacturing & Administrative Offices
            </h2>
            <p className="mt-3 text-sm text-steel-400">
              Operating across three primary facilities in Maharashtra with an extensive zonal distribution network across major industrial corridors.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Factory Office */}
            <div className="relative flex flex-col justify-between border border-ink-700 bg-ink-900/60 p-7 transition-colors hover:border-signal/50">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-tech text-signal">
                    Primary Facility
                  </span>
                  <FactoryIcon className="h-4 w-4 text-steel-400" aria-hidden />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase text-steel-50">
                  Factory Office & Works
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-steel-400">
                  Correspondence Address
                </p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-steel-300">
                  {company.factoryOffice}
                </p>
              </div>
              <div className="mt-6 border-t border-ink-800 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-tech text-steel-400">
                  Hub: Manufacturing • Warehousing • Dispatch
                </span>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="relative flex flex-col justify-between border border-ink-700 bg-ink-900/60 p-7 transition-colors hover:border-signal/50">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-tech text-signal">
                    Executive HQ
                  </span>
                  <Building2Icon className="h-4 w-4 text-steel-400" aria-hidden />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase text-steel-50">
                  Corporate Office
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-steel-400">
                  Business & Strategic Consulting
                </p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-steel-300">
                  {company.corporateOffice}
                </p>
              </div>
              <div className="mt-6 border-t border-ink-800 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-tech text-steel-400">
                  Hub: Executive • Partnerships • Engineering
                </span>
              </div>
            </div>

            {/* Registered Office */}
            <div className="relative flex flex-col justify-between border border-ink-700 bg-ink-900/60 p-7 transition-colors hover:border-signal/50">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-tech text-signal">
                    Legal & Compliance
                  </span>
                  <BuildingIcon className="h-4 w-4 text-steel-400" aria-hidden />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase text-steel-50">
                  Registered Office
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-steel-400">
                  Corporate Registry
                </p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-steel-300">
                  {company.registeredOffice}
                </p>
              </div>
              <div className="mt-6 border-t border-ink-800 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-tech text-steel-400">
                  Certification: {company.certification}
                </span>
              </div>
            </div>
          </div>

          {/* Zonal Offices Bar */}
          <div className="mt-6 flex flex-col justify-between gap-4 border border-ink-700 bg-ink-900/40 px-6 py-5 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-signal" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-tech text-steel-400">
                Pan-India Zonal Support:
              </span>
              <div className="flex flex-wrap gap-2">
                {company.zonalOffices.map((city) => (
                  <span
                    key={city}
                    className="border border-ink-700 bg-ink-950 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-steel-200"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-steel-400 md:text-right">
              On-site field engineers & rapid dispatch available throughout these zones.
            </p>
          </div>
        </div>
      </section>

      {/* Tier 3: Map & Logistics Section */}
      <section className="border-t border-ink-800 bg-ink-900 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <TechnicalLabel code="Logistics">Facility Location</TechnicalLabel>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-steel-50 sm:text-4xl">
                Bhiwandi Works & Dispatch Center
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-steel-300">
                Our main factory and central warehouse are strategically located near the Mumbai-Nashik highway, allowing seamless heavy freight logistics, bulk dispatches, and quick transit to Nhava Sheva (JNPT) port for international exports.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <p className="text-xs text-steel-300">
                    <strong className="text-steel-100">Address:</strong> 196, Raj Rajeshwari Compound, Opp. Bombay Rayon Fashion Ltd., Near Sonale Police Station, Sonale, Bhiwandi – 421302.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <p className="text-xs text-steel-300">
                    <strong className="text-steel-100">Logistics Access:</strong> Heavy vehicle bays available for container trucks, trailers and expedited courier dispatches.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapDestination)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-tech text-ink-950 transition-colors hover:bg-signal-400"
                >
                  <MapPinIcon className="h-4 w-4" aria-hidden />
                  Get Directions in Google Maps
                  <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="overflow-hidden border border-ink-700 bg-ink-950 shadow-2xl">
              <iframe
                title="Map to KHS Innovation & Engineering LLP factory office in Sonale, Bhiwandi"
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapDestination)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full border-0 sm:aspect-[16/9]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  placeholder,
  autoComplete,
  maxLength,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  inputMode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
}) {
  const id = label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="field-label text-xs">
        {label} {required && <span className="text-signal">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        className={`field-input text-xs ${
          error ? 'border-red-400/80 ring-1 ring-red-400/30' : ''
        }`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-red-500 font-semibold" role="alert">
          <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}