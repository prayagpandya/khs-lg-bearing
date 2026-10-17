/**
 * Email Service for KHS-LG Lead Capture
 * 
 * Uses Web3Forms (or compatible API) to deliver catalogue brochure download leads
 * directly to the sales email inbox (e.g. sales@khsbearings.com).
 * 
 * Required Credential:
 * - VITE_WEB3FORMS_ACCESS_KEY in .env file
 *   Get a free key in 30 seconds at https://web3forms.com by entering your email.
 */

import { CatalogueRecord } from '../data/catalogues';

export interface CatalogueDownloadFormPayload {
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  city: string;
  industry?: string;
  message?: string;
}

export interface EmailSendResult {
  success: boolean;
  message?: string;
  error?: string;
  isDemo?: boolean;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Sends catalogue lead details via email before releasing the PDF download.
 */
export async function sendCatalogueLeadEmail(
  catalogue: CatalogueRecord,
  payload: CatalogueDownloadFormPayload
): Promise<EmailSendResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  // Fallback mode for development/preview before the user adds their Web3Forms key
  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
    console.info(
      '[KHS-LG Email Service] No VITE_WEB3FORMS_ACCESS_KEY found in .env. Lead saved locally in demo mode.',
      { catalogue: catalogue.title, payload }
    );
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      isDemo: true,
      message: 'Demo mode: Email simulated. Please configure VITE_WEB3FORMS_ACCESS_KEY to receive real emails.'
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Brochure Request: ${catalogue.title} — ${payload.fullName} (${payload.companyName})`,
        from_name: 'KHS-LG Web Portal',
        catalogue_name: catalogue.title,
        catalogue_id: catalogue.id,
        full_name: payload.fullName,
        company_name: payload.companyName,
        mobile_number: payload.mobile,
        email_address: payload.email,
        city_location: payload.city,
        industry_application: payload.industry || 'Not specified',
        specific_requirements: payload.message || 'None specified',
        submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        message: 'Lead delivered to sales engineering inbox successfully.'
      };
    } else {
      return {
        success: false,
        error: data.message || 'Email service rejected the request.'
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error while contacting email service';
    return {
      success: false,
      error: errorMsg
    };
  }
}
