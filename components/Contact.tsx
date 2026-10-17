import React, { useState } from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, Send, CheckCircle2, Loader2, MessageSquare, Calendar, Clock, Video, CalendarPlus } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

type ContactMode = 'appointment' | 'message';

const Contact: React.FC = () => {
  const { contact } = SITE_CONTENT;

  // Active tab: 'appointment' (default) or 'message'
  const [mode, setMode] = useState<ContactMode>('appointment');

  // Appointment form state
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    date: '',
    timeSlot: '02:00 PM - 03:00 PM (PHT / GMT+8)',
    platform: 'Google Meet',
    topic: 'Technical Interview / Full-time Role',
    notes: ''
  });

  // Direct message form state
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack Web Development',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Today's date in YYYY-MM-DD for date picker min value
  const todayStr = new Date().toISOString().split('T')[0];

  // Construct Gmail web composer URL for Appointment
  const getAppointmentGmailUrl = () => {
    const subjectLine = `[Appointment Request] ${appointmentData.topic} - with ${appointmentData.name || 'Visitor'}`;
    const bodyContent = `Hi Nikko,\n\nI would like to schedule an appointment with you.\n\n` +
      `• Name: ${appointmentData.name}\n` +
      `• Email: ${appointmentData.email}\n` +
      `• Topic: ${appointmentData.topic}\n` +
      `• Preferred Date: ${appointmentData.date || 'To be confirmed'}\n` +
      `• Preferred Time: ${appointmentData.timeSlot}\n` +
      `• Preferred Platform: ${appointmentData.platform}\n\n` +
      `Agenda / Discussion Notes:\n${appointmentData.notes || 'None provided'}\n\n` +
      `---\nRequested via portfolio appointment scheduler`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contact.email
    )}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
  };

  // Construct Google Calendar Event URL
  const getGoogleCalendarUrl = () => {
    const title = `Meeting: ${appointmentData.name} & Nikko Dacara (${appointmentData.topic})`;
    const details = `Topic: ${appointmentData.topic}\nGuest Email: ${appointmentData.email}\nPlatform: ${appointmentData.platform}\n\nNotes:\n${appointmentData.notes || 'No extra notes'}\n\nHost: Nikko Dacara (${contact.email})`;

    // Default to date selected or today
    const dateFormatted = appointmentData.date ? appointmentData.date.replace(/-/g, '') : todayStr.replace(/-/g, '');
    const dates = `${dateFormatted}T060000Z/${dateFormatted}T070000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      appointmentData.platform
    )}&add=${encodeURIComponent(contact.email)}`;
  };

  // Construct Gmail web composer URL for Direct Message
  const getMessageGmailUrl = () => {
    const subjectLine = `[Portfolio Inquiry] ${messageData.subject} - from ${messageData.name || 'Visitor'}`;
    const bodyContent = `Hi Nikko,\n\nName: ${messageData.name}\nEmail: ${messageData.email}\nTopic: ${messageData.subject}\n\nMessage:\n${messageData.message}\n\n---\nSent via portfolio contact dispatch`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contact.email
    )}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetUrl = mode === 'appointment' ? getAppointmentGmailUrl() : getMessageGmailUrl();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(targetUrl, '_blank');
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column — Contact Info & Direct Links */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="section-label block mb-3">Get Connected</span>
              <h2 className="text-heading text-text-primary mb-6">
                {contact.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8 text-sm">
                Schedule a technical discussion, interview, or consultation directly into my calendar, or send a direct inquiry to my Gmail.
              </p>

              {/* Direct Info Card */}
              <div className="border border-border p-5 bg-surface-raised space-y-4 mb-8">
                <div>
                  <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">
                    Google Email
                  </span>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-text-primary hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <Mail size={14} className="text-accent" />
                    <span>{contact.email}</span>
                    <ArrowUpRight size={12} className="text-text-muted group-hover:text-accent transition-colors" />
                  </a>
                </div>

                {contact.phone && (
                  <div className="pt-3 border-t border-border">
                    <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">
                      Phone / Mobile
                    </span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm font-medium text-text-primary hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <Phone size={14} className="text-accent" />
                      {contact.phone}
                    </a>
                  </div>
                )}

                <div className="pt-3 border-t border-border">
                  <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">
                    Location & Timezone
                  </span>
                  <div className="flex items-center gap-2 text-sm text-text-primary">
                    <MapPin size={14} className="text-text-muted" />
                    <span>{contact.location} (GMT+8)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase">
                    Status
                  </span>
                  <span className="text-xs font-mono text-accent flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Open to Appointments
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-3">
                Social Profiles
              </span>
              <div className="flex flex-wrap gap-2.5">
                {contact.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 border border-border text-xs text-text-secondary font-mono hover:text-accent hover:border-accent transition-all duration-150 bg-surface-raised"
                    aria-label={social.platform}
                  >
                    <social.icon size={13} />
                    {social.platform}
                    <ArrowUpRight size={11} className="text-text-muted" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Interactive Scheduler & Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-border bg-surface-raised overflow-hidden">

              {/* Mode Toggle Header */}
              <div className="bg-surface px-4 py-2 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setMode('appointment'); setSubmitted(false); }}
                    className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 text-xs ${mode === 'appointment'
                      ? 'border-accent bg-accent/10 text-accent font-semibold'
                      : 'border-transparent text-text-muted hover:text-text-primary'
                      }`}
                  >
                    <Calendar size={13} />
                    <span>Book Appointment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMode('message'); setSubmitted(false); }}
                    className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 text-xs ${mode === 'message'
                      ? 'border-accent bg-accent/10 text-accent font-semibold'
                      : 'border-transparent text-text-muted hover:text-text-primary'
                      }`}
                  >
                    <MessageSquare size={13} />
                    <span>Send Message</span>
                  </button>
                </div>

                <span className="text-[10px] text-text-muted uppercase tracking-wider hidden sm:inline">
                  LINKED // GMAIL WEB
                </span>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">

                {/* SUCCESS / CONFIRMATION VIEW */}
                {submitted ? (
                  <div className="py-6 text-center space-y-5">
                    <div className="w-12 h-12 border border-accent/40 bg-accent/10 text-accent flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {mode === 'appointment' ? 'Appointment Request Ready' : 'Inquiry Ready to Dispatch'}
                      </h3>
                      <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                        A pre-formatted email has been opened in Google Mail for <span className="text-accent font-medium">{contact.email}</span>. You can review and click send.
                      </p>
                    </div>

                    {mode === 'appointment' && (
                      <div className="p-4 border border-border bg-surface text-left font-mono text-xs space-y-1.5 max-w-md mx-auto text-text-muted">
                        <div className="text-text-primary font-semibold pb-1 border-b border-border mb-2">
                          Session Summary
                        </div>
                        <div><span className="text-accent">Topic:</span> {appointmentData.topic}</div>
                        <div><span className="text-accent">Date:</span> {appointmentData.date || 'TBD'}</div>
                        <div><span className="text-accent">Time:</span> {appointmentData.timeSlot}</div>
                        <div><span className="text-accent">Platform:</span> {appointmentData.platform}</div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={mode === 'appointment' ? getAppointmentGmailUrl() : getMessageGmailUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-accent text-surface font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-accent-hover transition-colors shadow-md"
                      >
                        <Mail size={13} />
                        Re-open in Gmail ↗
                      </a>

                      {mode === 'appointment' && (
                        <a
                          href={getGoogleCalendarUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 border border-border bg-surface text-xs font-mono text-text-primary hover:text-accent hover:border-accent transition-colors flex items-center gap-1.5"
                        >
                          <CalendarPlus size={13} />
                          Add to Google Calendar ↗
                        </a>
                      )}

                      <button
                        onClick={handleReset}
                        className="px-4 py-2.5 border border-border text-xs font-mono text-text-muted hover:text-text-primary hover:border-text-muted transition-colors uppercase tracking-wider"
                      >
                        New Submission
                      </button>
                    </div>
                  </div>
                ) : (
                  /* FORM VIEW */
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* APPOINTMENT FORM */}
                    {mode === 'appointment' ? (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="app-name" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                              Your Name <span className="text-accent">*</span>
                            </label>
                            <input
                              id="app-name"
                              type="text"
                              required
                              value={appointmentData.name}
                              onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                              placeholder="e.g. Sarah Jenkins"
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>

                          <div>
                            <label htmlFor="app-email" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                              Your Email <span className="text-accent">*</span>
                            </label>
                            <input
                              id="app-email"
                              type="email"
                              required
                              value={appointmentData.email}
                              onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                              placeholder="sarah@company.com"
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>
                        </div>

                        {/* Date & Time Slot Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="app-date" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Calendar size={12} className="text-accent" />
                              Preferred Date <span className="text-accent">*</span>
                            </label>
                            <input
                              id="app-date"
                              type="date"
                              required
                              min={todayStr}
                              value={appointmentData.date}
                              onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors font-mono"
                            />
                          </div>

                          <div>
                            <label htmlFor="app-time" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Clock size={12} className="text-accent" />
                              Preferred Time Slot
                            </label>
                            <select
                              id="app-time"
                              value={appointmentData.timeSlot}
                              onChange={(e) => setAppointmentData({ ...appointmentData, timeSlot: e.target.value })}
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
                            >
                              <option value="10:00 AM - 11:00 AM (PHT / GMT+8)">10:00 AM - 11:00 AM (PHT / GMT+8)</option>
                              <option value="02:00 PM - 03:00 PM (PHT / GMT+8)">02:00 PM - 03:00 PM (PHT / GMT+8)</option>
                              <option value="04:00 PM - 05:00 PM (PHT / GMT+8)">04:00 PM - 05:00 PM (PHT / GMT+8)</option>
                              <option value="08:00 PM - 09:00 PM (PHT / GMT+8)">08:00 PM - 09:00 PM (PHT / GMT+8)</option>
                              <option value="Flexible / Negotiable Time">Flexible / Negotiable Time</option>
                            </select>
                          </div>
                        </div>

                        {/* Topic & Platform Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="app-topic" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                              Meeting Purpose
                            </label>
                            <select
                              id="app-topic"
                              value={appointmentData.topic}
                              onChange={(e) => setAppointmentData({ ...appointmentData, topic: e.target.value })}
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
                            >
                              <option value="Technical Interview / Full-time Role">Technical Interview / Full-time Role</option>
                              <option value="Project Architecture & Consulting">Project Architecture & Consulting</option>
                              <option value="Healthcare Information Systems (HIS)">Healthcare Information Systems (HIS)</option>
                              <option value="Local AI & OCR Automation">Local AI & OCR Automation</option>
                              <option value="Contract / Freelance Build">Contract / Freelance Build</option>
                              <option value="General Technical Chat">General Technical Chat</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="app-platform" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Video size={12} className="text-accent" />
                              Platform
                            </label>
                            <select
                              id="app-platform"
                              value={appointmentData.platform}
                              onChange={(e) => setAppointmentData({ ...appointmentData, platform: e.target.value })}
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
                            >
                              <option value="Google Meet">Google Meet</option>
                              <option value="Zoom Meeting">Zoom Meeting</option>
                              <option value="WhatsApp / Phone Call">WhatsApp / Phone Call</option>
                            </select>
                          </div>
                        </div>

                        {/* Agenda / Notes */}
                        <div>
                          <label htmlFor="app-notes" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                            Discussion Notes / Agenda
                          </label>
                          <textarea
                            id="app-notes"
                            rows={3}
                            value={appointmentData.notes}
                            onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                            placeholder="Briefly outline what you'd like to discuss or collaborate on..."
                            className="w-full bg-surface border border-border p-3.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors resize-none leading-relaxed"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-accent text-surface font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer shadow-md"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={14} className="animate-spin" />
                                Opening Gmail...
                              </>
                            ) : (
                              <>
                                <Calendar size={13} />
                                Schedule via Google Email
                              </>
                            )}
                          </button>

                          <span className="text-[11px] font-mono text-text-muted">
                            Routes to <span className="text-text-secondary">{contact.email}</span>
                          </span>
                        </div>
                      </>
                    ) : (
                      /* DIRECT MESSAGE FORM */
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="msg-name" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                              Your Name <span className="text-accent">*</span>
                            </label>
                            <input
                              id="msg-name"
                              type="text"
                              required
                              value={messageData.name}
                              onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                              placeholder="e.g. Alex Rivera"
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>

                          <div>
                            <label htmlFor="msg-email" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                              Your Email <span className="text-accent">*</span>
                            </label>
                            <input
                              id="msg-email"
                              type="email"
                              required
                              value={messageData.email}
                              onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
                              placeholder="alex@company.com"
                              className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="msg-topic" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                            Inquiry Topic
                          </label>
                          <select
                            id="msg-topic"
                            value={messageData.subject}
                            onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                            className="w-full bg-surface border border-border px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
                          >
                            <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                            <option value="DevOps & CI/CD Pipelines">DevOps & CI/CD Pipelines</option>
                            <option value="Healthcare Information Systems (HIS)">Healthcare Information Systems (HIS)</option>
                            <option value="Local AI & OCR Automation">Local AI & OCR Automation</option>
                            <option value="Mobile App Development (Flutter)">Mobile App Development (Flutter)</option>
                            <option value="Contract / Full-time Role">Contract / Full-time Role</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="msg-text" className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                            Message <span className="text-accent">*</span>
                          </label>
                          <textarea
                            id="msg-text"
                            rows={4}
                            required
                            value={messageData.message}
                            onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                            placeholder="Tell me about your project scope, requirements, or timeline..."
                            className="w-full bg-surface border border-border p-3.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent transition-colors resize-none leading-relaxed"
                          />
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-accent text-surface font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors disabled:opacity-60 cursor-pointer shadow-md"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={14} className="animate-spin" />
                                Opening Gmail...
                              </>
                            ) : (
                              <>
                                <Send size={13} />
                                Send via Google Email
                              </>
                            )}
                          </button>

                          <span className="text-[11px] font-mono text-text-muted">
                            Routes to <span className="text-text-secondary">{contact.email}</span>
                          </span>
                        </div>
                      </>
                    )}

                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;