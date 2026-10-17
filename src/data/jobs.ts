import { COMPANY_WHATSAPP_URL } from './company';

export interface Job {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobs: Job[] = [
  { id: 'sales-executive', title: 'Sales Executive', location: 'Mumbai HO', department: 'Sales', type: 'Full Time', overview: 'Contribute to customer engagement and business development across industrial markets.', responsibilities: ['Customer interaction', 'Lead generation', 'Business development'], requirements: ['Relevant qualification', 'Clear communication skills', 'Customer-focused approach'] },
  { id: 'area-sales-manager', title: 'Area Sales Manager', location: 'Mumbai HO', department: 'Sales', type: 'Full Time', overview: 'Support regional customer relationships and help grow industrial product sales.', responsibilities: ['Area account development', 'Customer relationship management', 'Sales coordination'], requirements: ['Relevant sales experience', 'Strong communication skills', 'Commercial awareness'] },
  { id: 'sales-coordinator', title: 'Sales Co-ordinator', location: 'Mumbai HO', department: 'Sales', type: 'Full Time', overview: 'Keep customer, quotation and sales activities moving with precision and consistency.', responsibilities: ['Sales documentation', 'Customer follow-up', 'Internal coordination'], requirements: ['Organised working style', 'Good communication skills', 'Attention to detail'] },
  { id: 'technical-sales-engineer', title: 'Technical Sales Engineer', location: 'Mumbai HO', department: 'Technical Sales', type: 'Full Time', overview: 'Connect industrial applications with practical bearing and motion solutions.', responsibilities: ['Application discussions', 'Technical product support', 'Customer solution development'], requirements: ['Engineering or technical qualification', 'Interest in industrial products', 'Clear technical communication'] },
  { id: 'telecaller', title: 'Telecaller', location: 'Mumbai HO', department: 'Sales / Telecalling', type: 'Full Time', overview: 'Build the first connection with customers and support a responsive sales process.', responsibilities: ['Outbound customer calls', 'Lead qualification', 'Requirement follow-up'], requirements: ['Confident communication', 'Professional phone manner', 'Customer-oriented approach'] },
  { id: 'sales-internship', title: 'Sales Internship Program', location: 'Mumbai HO', department: 'Sales', type: 'Internship', overview: 'Gain hands-on exposure to industrial sales, communication and customer handling.', responsibilities: ['Sales team support', 'Market and customer research', 'Learning product applications'], requirements: ['Motivation to learn', 'Good communication skills', 'Curious and dependable approach'] }
];

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id);
}

export interface ApplicationFormData {
  fullName: string;
  mobile: string;
  email: string;
  location: string;
  qualification: string;
  experience: string;
  currentCompany: string;
  resumeLink: string;
  message: string;
}

export function generateWhatsAppMessage(job: Job, form: ApplicationFormData) {
  return [
    `*Job Application — KHS-LG Careers*`,
    ``,
    `*Position:* ${job.title} (${job.department})`,
    `*Full Name:* ${form.fullName}`,
    `*Mobile:* ${form.mobile}`,
    `*Email:* ${form.email}`,
    `*Current Location:* ${form.location || 'Not provided'}`,
    `*Qualification:* ${form.qualification || 'Not provided'}`,
    `*Experience:* ${form.experience || 'Not provided'}`,
    `*Current Company:* ${form.currentCompany || 'Not provided'}`,
    `*Resume / CV Link:* ${form.resumeLink || 'Not provided'}`,
    ``,
    `*Cover Note / Message:*`,
    form.message || 'None provided',
    ``,
    `_Sent via KHS-LG Web Portal_`
  ].join('\n');
}

export function openWhatsAppApplication(job: Job, form: ApplicationFormData) {
  window.open(`${COMPANY_WHATSAPP_URL}?text=${encodeURIComponent(generateWhatsAppMessage(job, form))}`, '_blank', 'noopener,noreferrer');
}