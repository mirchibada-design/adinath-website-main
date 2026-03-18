// components/sections/LeadGeneration.tsx
// ─────────────────────────────────────────────────────────────
// Section 10: Lead Generation Form
// Full-width dark section with gold accents:
//   - react-hook-form + zod validation
//   - Accessible form with visible labels
//   - Two CTA options: Schedule Visit / Request Brochure
//   - Loading state during submission
// ─────────────────────────────────────────────────────────────

'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Phone, Mail, User, Home, CheckCircle, Loader2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

// ─── Zod validation schema ────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Enter a valid 10-digit mobile number')
    .max(13)
    .regex(/^[+0-9\s-]+$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  apartmentType: z.enum(['2BHK', '3BHK', '4BHK', 'Penthouse', ''], {
    required_error: 'Please select a preference',
  }),
  message: z.string().max(300, 'Message too long').optional(),
});

type FormData = z.infer<typeof formSchema>;

// ─── Form submission states ───────────────────────────────────
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

// ─── Input field styles ───────────────────────────────────────
const inputBase = `
  w-full bg-transparent border border-white/10
  focus:border-gold/50 focus:outline-none
  font-dm-sans text-sm text-white placeholder-white/25
  px-4 py-4 transition-colors duration-300
`;

export default function LeadGeneration() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitAction, setSubmitAction] = useState<'visit' | 'brochure'>('visit');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { apartmentType: '' },
  });

  // ── Form submission handler ────────────────────────────────
  const onSubmit = async () => {
    setSubmitState('loading');

    // ── TODO: Replace with actual API call ─────────────────
    // Example: await fetch('/api/lead', { method: 'POST', body: JSON.stringify({ ...data, action: submitAction }) })
    // For now, simulate a 1.5s delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitState('success');
    reset();

    // Reset back to idle after 5 seconds
    setTimeout(() => setSubmitState('idle'), 5000);
  };

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #000000, #0A0A08, #000000)',
      }}
      aria-label="Contact and lead generation"
    >
      {/* ── Ambient gold glow ─────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(223,193,94,0.5), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(223,193,94,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <Container>

        {/* ── Section Header ────────────────────────────────── */}
        <SectionHeader
          label="Get In Touch"
          heading="Begin Your Journey"
          subheading="Fill in your details and our team will get in touch within 24 hours."
          align="center"
          className="mb-16"
        />

        {/* ── Form Container ────────────────────────────────── */}
        <div className="max-w-3xl mx-auto">

          {/* ── Success State ─────────────────────────────── */}
          {submitState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold/30 p-12 text-center"
            >
              <CheckCircle size={40} className="text-gold mx-auto mb-5" aria-hidden="true" />
              <h3 className="font-playfair font-light text-white text-2xl mb-3">
                Thank You
              </h3>
              <p className="font-dm-sans text-sm text-white/50">
                We have received your enquiry.
                Our team will reach out to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Enquiry form"
              className="space-y-5"
            >
              {/* ── Row 1: Name + Phone ───────────────────── */}
              <div className="grid sm:grid-cols-2 gap-5">

                {/* Name */}
                <FormField
                  id="name"
                  label="Full Name *"
                  icon={User}
                  error={errors.name?.message}
                >
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    className={inputBase}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name')}
                  />
                </FormField>

                {/* Phone */}
                <FormField
                  id="phone"
                  label="Mobile Number *"
                  icon={Phone}
                  error={errors.phone?.message}
                >
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                    className={inputBase}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    {...register('phone')}
                  />
                </FormField>
              </div>

              {/* ── Row 2: Email + Apartment Type ────────── */}
              <div className="grid sm:grid-cols-2 gap-5">

                {/* Email */}
                <FormField
                  id="email"
                  label="Email Address"
                  icon={Mail}
                  error={errors.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={inputBase}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                  />
                </FormField>

                {/* Apartment Type */}
                <FormField
                  id="apartmentType"
                  label="Preferred Configuration"
                  icon={Home}
                  error={errors.apartmentType?.message}
                >
                  <select
                    id="apartmentType"
                    className={`${inputBase} cursor-pointer`}
                    style={{ appearance: 'none' }}
                    aria-invalid={!!errors.apartmentType}
                    {...register('apartmentType')}
                  >
                    <option value="" disabled>Select configuration</option>
                    <option value="2BHK">2 BHK</option>
                    <option value="3BHK">3 BHK</option>
                    <option value="4BHK">4 BHK</option>
                    <option value="Penthouse">4 BHK Penthouse</option>
                  </select>
                </FormField>
              </div>

              {/* ── Message ──────────────────────────────── */}
              <FormField
                id="message"
                label="Message (Optional)"
                error={errors.message?.message}
              >
                <textarea
                  id="message"
                  placeholder="Any specific requirements or questions..."
                  rows={4}
                  className={`${inputBase} resize-none`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message')}
                />
              </FormField>

              {/* ── CTA Buttons ───────────────────────────── */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                {/* Schedule Visit */}
                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  onClick={() => setSubmitAction('visit')}
                  className="
                    flex-1 flex items-center justify-center gap-2
                    bg-gold text-black font-dm-sans text-xs tracking-[0.15em] uppercase
                    px-6 py-4 hover:bg-gold-light
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300
                  "
                  aria-label="Submit form to schedule a visit"
                >
                  {submitState === 'loading' && submitAction === 'visit' ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : null}
                  Schedule a Visit
                </button>

                {/* Request Brochure */}
                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  onClick={() => setSubmitAction('brochure')}
                  className="
                    flex-1 flex items-center justify-center gap-2
                    border border-gold/60 text-gold font-dm-sans text-xs tracking-[0.15em] uppercase
                    px-6 py-4 hover:bg-gold/5 hover:border-gold
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300
                  "
                  aria-label="Submit form to request brochure"
                >
                  {submitState === 'loading' && submitAction === 'brochure' ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : null}
                  Request Brochure
                </button>
              </div>

              {/* Disclaimer */}
              <p className="font-dm-sans text-[10px] text-white/20 text-center leading-relaxed">
                By submitting, you agree to be contacted by Adinath Buildwell regarding
                this project. Your details are kept confidential and never shared with third parties.
              </p>
            </motion.form>
          )}
        </div>

        {/* ── Direct contact line ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16 pt-10 border-t border-white/5"
        >
          <div className="flex items-center gap-3">
            <Phone size={14} className="text-gold/60" aria-hidden="true" />
            <div>
              <p className="font-dm-sans text-[10px] text-white/25 tracking-widest uppercase mb-0.5">Call Us</p>
              <a
                href="tel:+919829000000"
                className="font-dm-sans text-sm text-white/70 hover:text-gold transition-colors"
                aria-label="Call Adinath Buildwell"
              >
                +91 98290 XXXXX {/* Replace with actual number */}
              </a>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <Mail size={14} className="text-gold/60" aria-hidden="true" />
            <div>
              <p className="font-dm-sans text-[10px] text-white/25 tracking-widest uppercase mb-0.5">Email Us</p>
              <a
                href="mailto:info@adinath.net.in"
                className="font-dm-sans text-sm text-white/70 hover:text-gold transition-colors"
                aria-label="Email Adinath Buildwell"
              >
                info@adinath.net.in
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Form Field Wrapper Component ────────────────────────────
function FormField({
  id,
  label,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-dm-sans text-[10px] tracking-[0.2em] uppercase text-white/40"
      >
        {Icon && <Icon size={11} className="text-gold/40" aria-hidden="true" />}
        {label}
      </label>

      {/* Input */}
      {children}

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-dm-sans text-[10px] text-red-400/80 tracking-wide"
        >
          {error}
        </p>
      )}
    </div>
  );
}
