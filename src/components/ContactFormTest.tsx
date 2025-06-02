
import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Briefcase, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ContactFormTest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-test',
          ...formData
        }).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message sent successfully! 🎉",
          description: "Thank you for reaching out. Aniketh will respond within 48 hours.",
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at aniketh@optra.me",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass p-8 rounded-3xl text-center">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gradient mb-4">Thank You!</h3>
        <p className="text-foreground/70 mb-6">
          Your message has been sent successfully. Aniketh will review your project details and respond within 48 hours.
        </p>
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              project: '',
              budget: '',
              timeline: '',
              message: ''
            });
          }}
          className="bg-optra-gradient hover:scale-105 transition-transform"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="glass p-8 rounded-3xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Let's Create Together</h2>
        <p className="text-foreground/70">
          Share your project details and let's start building something extraordinary.
        </p>
      </div>

      <form
        name="contact-test"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="contact-test" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/90">
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
              className="bg-white/5 border-white/20 focus:border-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/90">
              <Mail className="w-4 h-4" />
              Email Address *
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
              className="bg-white/5 border-white/20 focus:border-white/40"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/90">
              <Briefcase className="w-4 h-4" />
              Company/Organization
            </label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your company name"
              className="bg-white/5 border-white/20 focus:border-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">
              Project Type
            </label>
            <select
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm focus:outline-none focus:border-white/40 transition-colors"
            >
              <option value="">Select project type</option>
              <option value="brand-identity">Brand Identity</option>
              <option value="web-design">Web Design</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="consultation">Design Consultation</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm focus:outline-none focus:border-white/40 transition-colors"
            >
              <option value="">Select budget range</option>
              <option value="5k-10k">$5k - $10k</option>
              <option value="10k-25k">$10k - $25k</option>
              <option value="25k-50k">$25k - $50k</option>
              <option value="50k+">$50k+</option>
              <option value="discuss">Let's discuss</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/90">
              Timeline
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm focus:outline-none focus:border-white/40 transition-colors"
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="1-month">1 month</option>
              <option value="2-3-months">2-3 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground/90">
            <MessageSquare className="w-4 h-4" />
            Project Details *
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your project, goals, and vision..."
            required
            rows={4}
            className="bg-white/5 border-white/20 focus:border-white/40 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-optra-gradient hover:scale-105 transition-all duration-300 h-12 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              Send Project Details
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>

        <p className="text-xs text-foreground/50 text-center">
          By submitting this form, you agree to be contacted about your project.
          We typically respond within 48 hours.
        </p>
      </form>
    </div>
  );
};

export default ContactFormTest;
