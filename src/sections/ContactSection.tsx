import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="section-container bg-zinc-900 curved-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="text-xl text-zinc-400">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700/50 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 gradient-text">Let's Connect</h3>
                <p className="text-zinc-400 mb-8">Feel free to reach out for collaborations, questions, or just to say hello!</p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-primary-400 mt-1 flex-shrink-0 mr-4" size={20} />
                    <div>
                      <h4 className="text-zinc-200 font-medium">Email</h4>
                      <p className="text-zinc-400">{t('contact.email')}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="text-primary-400 mt-1 flex-shrink-0 mr-4" size={20} />
                    <div>
                      <h4 className="text-zinc-200 font-medium">Location</h4>
                      <p className="text-zinc-400">{t('contact.location')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-zinc-700/50">
                <h4 className="text-zinc-200 font-medium mb-3">{t('contact.availability')}</h4>
                <p className="text-zinc-400">{t('contact.phone')}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {formStatus === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full bg-zinc-800/50 backdrop-blur-sm rounded-xl p-12 border border-green-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="text-green-500 mb-6" size={64} />
                <h3 className="text-2xl font-bold mb-4 text-green-400">{t('contact.success')}</h3>
                <p className="text-zinc-300 text-center">I'll get back to you as soon as possible!</p>
              </motion.div>
            ) : formStatus === 'error' ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full bg-zinc-800/50 backdrop-blur-sm rounded-xl p-12 border border-red-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="text-red-500 mb-6" size={64} />
                <h3 className="text-2xl font-bold mb-4 text-red-400">{t('contact.error')}</h3>
                <p className="text-zinc-300 text-center">Please try again or contact me directly via email.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 btn btn-outline"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-zinc-200"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-zinc-200"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-zinc-200 resize-none"
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className={`btn btn-primary w-full ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        {t('contact.sendButton')}
                        <Send className="ml-2" size={16} />
                      </span>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;