import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowDownIcon, ArrowUpRightIcon, BriefcaseBusinessIcon, CalculatorIcon, ClipboardListIcon, Code2Icon, MegaphoneIcon, UsersIcon, XIcon } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/company';
import { ApplicationFormData, Job, jobs, openWhatsAppApplication } from '../data/jobs';
import { startSmoothScroll, stopSmoothScroll } from '../hooks/useSmoothScroll';
import { useSeo } from '../hooks/useSeo';

const AREAS = [
  { name: 'Marketing', description: 'Build brand awareness and support business growth through strategic marketing.', icon: MegaphoneIcon },
  { name: 'Sales', description: 'Develop customer relationships and drive industrial product sales.', icon: BriefcaseBusinessIcon },
  { name: 'Operations', description: 'Support efficient execution of day-to-day business operations.', icon: ClipboardListIcon },
  { name: 'Research and Development', description: 'Work on technical solutions, product development and industrial innovation.', icon: Code2Icon },
  { name: 'Accounts', description: 'Support financial operations, reporting and business processes.', icon: CalculatorIcon },
  { name: 'Human Resources', description: 'Support people, culture and organizational development.', icon: UsersIcon },
  { name: 'Management', description: 'Drive strategy, execution and overall business growth.', icon: BriefcaseBusinessIcon }
];

const EMPTY_FORM: ApplicationFormData = { fullName: '', mobile: '', email: '', location: '', qualification: '', experience: '', currentCompany: '', resumeLink: '', message: '' };

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useSeo({ title: 'Careers', description: 'Explore career opportunities at KHS-LG and join our growing team in industrial and bearing solutions.', path: '/careers' });

  const openApplication = (job: Job) => setSelectedJob(job);

  return <main>
    <PageHero code="Careers" eyebrow="Build your future in motion" lines={['Build your career', 'with KHS-LG']} body="Join KHS-LG and build your career with a growing organization in the industrial and bearing solutions sector. We are always looking for talented, motivated and ambitious individuals who want to learn, contribute and grow." />
    {/* Section 01: Culture & Growth Pillars (Replaces redundant second hero layout) */}
    <section className="relative overflow-hidden border-b border-ink-700 bg-ink-900 py-12 lg:py-16">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-5 border-b border-ink-700 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <TechnicalLabel code="01 / Culture">Work & Growth at KHS-LG</TechnicalLabel>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-steel-50 sm:text-4xl">
              Learn. Contribute. <span className="text-signal">Grow.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-steel-400">
            Build your career with hands-on exposure to real industrial bearing solutions, alongside an experienced team that values initiative, continuous learning, and practical execution.
          </p>
        </div>

        {/* 3 Distinct Growth Pillars */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="group border border-ink-700 bg-ink-950 p-6 transition-colors hover:border-signal/50">
            <span className="font-mono text-[10px] uppercase tracking-tech text-signal">01 / Industry Exposure</span>
            <h3 className="mt-3 font-display text-xl font-bold uppercase text-steel-50 group-hover:text-signal">
              Real Industrial Impact
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-steel-400">
              Work with world-class bearing technologies and precision motion solutions across automotive, automation, steel mills, and heavy equipment sectors.
            </p>
          </div>

          <div className="group border border-ink-700 bg-ink-950 p-6 transition-colors hover:border-signal/50">
            <span className="font-mono text-[10px] uppercase tracking-tech text-signal">02 / Mentorship</span>
            <h3 className="mt-3 font-display text-xl font-bold uppercase text-steel-50 group-hover:text-signal">
              Mentorship & Learning
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-steel-400">
              Gain hands-on guidance from industry specialists with 50+ years of domain heritage, mastering customer consultation, technical sales, and commercial skills.
            </p>
          </div>

          <div className="group border border-ink-700 bg-ink-950 p-6 transition-colors hover:border-signal/50">
            <span className="font-mono text-[10px] uppercase tracking-tech text-signal">03 / Advancement</span>
            <h3 className="mt-3 font-display text-xl font-bold uppercase text-steel-50 group-hover:text-signal">
              Merit-Based Growth
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-steel-400">
              Whether you are a fresher or an experienced professional, KHS-LG recognizes ambition and performance with clear responsibilities and leadership avenues.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-2">
          <a
            href="#featured-jobs"
            className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-signal hover:text-signal-bright"
          >
            Explore open vacancies <ArrowDownIcon className="h-4 w-4" aria-hidden />
          </a>
          <span className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
            Head Office: Mumbai · Opportunities across Sales, Technical, Operations
          </span>
        </div>
      </div>
    </section>
    <section className="bg-ink-950 py-12 lg:py-18"><div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8"><TechnicalLabel code="02 / Areas">Explore your opportunity</TechnicalLabel><div className="mt-8 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-4">{AREAS.map((area, index) => <article key={area.name} className="group bg-ink-950 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-ink-800"><div className="flex items-start justify-between"><area.icon className="h-6 w-6 text-signal" strokeWidth={1.5} aria-hidden /><span className="font-mono text-[9px] tracking-tech text-steel-600">{String(index + 1).padStart(2, '0')}</span></div><h2 className="mt-10 font-display text-2xl font-semibold uppercase leading-none text-steel-50 group-hover:text-signal">{area.name}</h2><p className="mt-4 text-sm leading-relaxed text-steel-500">{area.description}</p></article>)}</div></div></section>
    <FeaturedJobs onApply={openApplication} />
    <section className="bg-ink-950 py-12 lg:py-18"><div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 text-center sm:px-8"><TechnicalLabel code="04 / Next step" className="justify-center">Ready to grow with KHS-LG?</TechnicalLabel><h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.9] text-steel-50">Your next chapter <span className="text-signal">starts here.</span></h2><p className="mt-6 max-w-xl text-[15px] leading-relaxed text-steel-400">Explore our open positions and take the next step in your career.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><MagneticButton href="#featured-jobs" variant="yellow" icon={<ArrowDownIcon className="h-4 w-4" aria-hidden />}>View open positions</MagneticButton><a href={`https://wa.me/${COMPANY_PHONE_RAW}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-ink-600 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-steel-300 hover:border-signal hover:text-signal">Have a question? WhatsApp</a></div><p className="mt-6 font-mono text-[10px] uppercase tracking-tech text-steel-600">{COMPANY_PHONE}</p></div></section>
    {selectedJob && <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
  </main>;
}

function FeaturedJobs({ onApply }: { onApply: (job: Job) => void }) {
  const [filter, setFilter] = useState('All');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const filters = ['All', 'Sales', 'Technical', 'Internship'];
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    if (filter === 'Sales') return job.department.includes('Sales');
    if (filter === 'Technical') return job.department === 'Technical Sales';
    if (filter === 'Internship') return job.type === 'Internship';
    return true;
  }), [filter]);

  const chooseFilter = (value: string) => {
    setFilter(value);
    setExpandedJobId(null);
  };

  return <section id="featured-jobs" className="relative border-y border-ink-700 bg-ink-900 py-12 lg:py-18"><div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden /><div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8"><div className="flex flex-col gap-6 border-b border-ink-700 pb-8 lg:flex-row lg:items-end lg:justify-between"><div><TechnicalLabel code="03 / Open positions">Featured jobs</TechnicalLabel><h2 className="mt-5 font-display text-4xl font-bold uppercase text-steel-50 sm:text-5xl">Find your next move.</h2></div><div className="flex items-end justify-between gap-8 lg:flex-col lg:items-end lg:gap-3"><p className="max-w-sm text-sm leading-relaxed text-steel-500 lg:text-right">Explore current opportunities at Mumbai HO and take the next step with KHS-LG.</p><span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-tech text-signal">{String(filteredJobs.length).padStart(2, '0')} open positions</span></div></div><div className="mt-8 flex flex-wrap items-center gap-2 border-b border-ink-700 pb-5"><span className="mr-3 font-mono text-[9px] uppercase tracking-tech text-steel-600">Filter by</span>{filters.map((item) => <button key={item} type="button" onClick={() => chooseFilter(item)} aria-pressed={filter === item} className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${filter === item ? 'border-signal bg-signal text-ink-950' : 'border-ink-600 text-steel-500 hover:border-signal/60 hover:text-signal'}`}>{item}</button>)}</div><div className="mt-2 border-t border-ink-700">{filteredJobs.map((job) => <JobRow key={job.id} job={job} index={jobs.indexOf(job)} expanded={expandedJobId === job.id} onToggle={() => setExpandedJobId((current) => current === job.id ? null : job.id)} onApply={onApply} />)}</div></div></section>;
}

function JobRow({ job, index, expanded, onToggle, onApply }: { job: Job; index: number; expanded: boolean; onToggle: () => void; onApply: (job: Job) => void }) {
  return <article className={`group relative border-b border-ink-700 transition-colors duration-300 ${expanded ? 'bg-ink-950' : 'hover:bg-ink-800'}`}><span className={`absolute bottom-0 left-0 top-0 w-px origin-top bg-signal transition-transform duration-300 ${expanded ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} aria-hidden /><button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={`job-details-${job.id}`} className="grid w-full items-center gap-5 px-4 py-7 text-left sm:grid-cols-[56px_minmax(0,1fr)_180px_auto] sm:px-6 lg:gap-8 lg:px-8"><span className={`font-mono text-sm tracking-tech transition-colors ${expanded ? 'text-signal' : 'text-signal/70 group-hover:text-signal'}`}>{String(index + 1).padStart(2, '0')}</span><span className="min-w-0"><strong className="block font-display text-2xl font-semibold uppercase leading-none text-steel-50 transition-colors group-hover:text-signal sm:text-3xl">{job.title}</strong><span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.12em] text-steel-500">{job.department} <span className="mx-1 text-steel-700">/</span> {job.location}</span></span><span className="font-mono text-[10px] uppercase tracking-tech text-steel-500 sm:text-right">{job.type}</span><span className="inline-flex items-center gap-2 justify-self-start font-display text-sm font-semibold uppercase tracking-[0.14em] text-signal sm:justify-self-end">{expanded ? 'Close role' : 'View role'} <ArrowUpRightIcon className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} aria-hidden /></span></button>{expanded && <div id={`job-details-${job.id}`} className="grid gap-8 border-t border-ink-700 px-4 pb-8 pt-7 sm:px-[92px] lg:grid-cols-[1.1fr_1fr_1fr_auto] lg:items-start lg:px-[124px]"><div><p className="font-mono text-[10px] uppercase tracking-tech text-signal">Job overview</p><p className="mt-4 max-w-md text-sm leading-relaxed text-steel-400">{job.overview}</p></div><DetailList label="Responsibilities" items={job.responsibilities} /><DetailList label="Requirements" items={job.requirements} /><button type="button" onClick={() => onApply(job)} aria-label={`Apply for ${job.title}`} className="inline-flex items-center gap-2 self-end whitespace-nowrap border border-signal px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal hover:text-ink-950 lg:mb-1">Apply now <ArrowUpRightIcon className="h-4 w-4" aria-hidden /></button></div>}</article>;
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return <div><p className="font-mono text-[10px] uppercase tracking-tech text-signal">{label}</p><ul className="mt-4 space-y-2 text-sm leading-relaxed text-steel-400">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-signal" aria-hidden />{item}</li>)}</ul></div>;
}

function ApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState<ApplicationFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    stopSmoothScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      startSmoothScroll();
    };
  }, [onClose]);

  const update =
    (key: keyof ApplicationFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let val = event.target.value;
      if (key === 'mobile') {
        val = val.replace(/\D/g, '').slice(0, 10);
      }
      setForm((current) => ({ ...current, [key]: val }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof ApplicationFormData, string>> = {};

    const trimmedName = form.fullName.trim();
    if (!trimmedName) {
      next.fullName = 'Full name is required.';
    } else if (trimmedName.length < 2) {
      next.fullName = 'Name must be at least 2 characters.';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      next.fullName = 'Name can only contain alphabetic letters and spaces.';
    }

    const cleanMobile = form.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      next.mobile = 'Mobile number is required.';
    } else if (cleanMobile.length !== 10) {
      next.mobile = 'Mobile number must be exactly 10 digits.';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      next.mobile = 'Enter a valid 10-digit mobile number (e.g. 9876543210).';
    }

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      next.email = 'Email address is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      next.email = 'Enter a valid email address (e.g. name@company.com).';
    }

    if (form.resumeLink.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(form.resumeLink.trim())) {
      next.resumeLink = 'Enter a valid link (starting with http:// or https://)';
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    window.setTimeout(() => {
      openWhatsAppApplication(job, form);
      setSubmitting(false);
      onClose();
    }, 450);
  };

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-ink-950/85 px-4 py-6 backdrop-blur-sm overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-heading"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        data-lenis-prevent="true"
        className="relative my-auto max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto border border-ink-600 bg-ink-950 p-6 shadow-2xl sm:p-9 overscroll-contain"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application form"
          className="absolute right-4 top-4 p-2 text-steel-500 hover:text-signal"
        >
          <XIcon className="h-5 w-5" aria-hidden />
        </button>

        <TechnicalLabel code="Application">Join the team</TechnicalLabel>
        <h2
          id="application-heading"
          className="mt-5 max-w-xl pr-8 font-display text-3xl font-bold uppercase leading-none text-steel-50 sm:text-4xl"
        >
          Apply for <span className="text-signal">{job.title}</span>
        </h2>

        <form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="selected-position" className="field-label text-xs">
              Selected position
            </label>
            <input
              id="selected-position"
              value={job.title}
              readOnly
              className="field-input text-xs font-semibold text-signal"
            />
          </div>

          <Field
            id="full-name"
            label="Full name"
            placeholder="e.g. Vikram Patil"
            value={form.fullName}
            onChange={update('fullName')}
            required
            error={errors.fullName}
          />
          <Field
            id="mobile"
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit number (e.g. 9876543210)"
            value={form.mobile}
            onChange={update('mobile')}
            required
            error={errors.mobile}
          />
          <Field
            id="email"
            label="Email address"
            type="email"
            placeholder="e.g. vikram@example.com"
            value={form.email}
            onChange={update('email')}
            required
            error={errors.email}
          />
          <Field
            id="location"
            label="Current location"
            placeholder="e.g. Pune, Maharashtra"
            value={form.location}
            onChange={update('location')}
          />
          <Field
            id="qualification"
            label="Qualification"
            placeholder="e.g. B.E. Mechanical / Diploma"
            value={form.qualification}
            onChange={update('qualification')}
          />
          <Field
            id="experience"
            label="Total experience"
            placeholder="e.g. 3 years in CNC precision machining"
            value={form.experience}
            onChange={update('experience')}
          />
          <Field
            id="current-company"
            label="Current company"
            placeholder="e.g. Precision Engineering Works"
            value={form.currentCompany}
            onChange={update('currentCompany')}
          />

          <div className="flex flex-col sm:col-span-2">
            <Field
              id="resume-link"
              label="Resume / CV link"
              value={form.resumeLink}
              onChange={update('resumeLink')}
              placeholder="Paste your Google Drive / OneDrive / portfolio resume link"
              hint="Please make sure the link is accessible."
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="application-message" className="field-label text-xs">
              Message / cover note
            </label>
            <textarea
              id="application-message"
              value={form.message}
              onChange={update('message')}
              rows={4}
              placeholder="Tell us about your experience, expertise, or reasons for applying..."
              className="field-input resize-y text-xs"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="border border-ink-600 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-steel-400 hover:border-signal hover:text-signal"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-signal px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 hover:bg-signal-bright disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? 'Opening WhatsApp...' : 'Submit application'}
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  error,
  hint,
  maxLength,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  maxLength?: number;
  inputMode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
}) {
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
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className={`field-input text-xs ${error ? 'border-red-400/80 ring-1 ring-red-400/30' : ''}`}
        aria-invalid={Boolean(error)}
      />
      {hint && <p className="mt-1 text-[11px] text-steel-500">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}