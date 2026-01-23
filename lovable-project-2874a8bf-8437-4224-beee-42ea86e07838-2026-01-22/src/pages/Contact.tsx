import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { MetaPair } from '@/components/MetaPair';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // CMS-ready: This would connect to a backend API
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  return (
    <Layout>
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-6 lg:gap-12 mb-6">
          <MetaPair label="page" value="Contact" />
          <MetaPair label="response" value="24-48 Hours" />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a tip? Want to collaborate? Just want to say hello? 
          We'd love to hear from you.
        </p>
      </section>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <section className="bg-surface-alt rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-card border-border focus-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="bg-card border-border focus-gold"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                className="bg-card border-border focus-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                required
                className="bg-card border-border focus-gold resize-none"
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </section>
        
        {/* Contact Info */}
        <section className="space-y-6">
          <div className="bg-surface-alt rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Contact Info</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="meta-label">Email</span>
                  <p className="text-foreground font-medium mt-1">hello@music4all.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="meta-label">Location</span>
                  <p className="text-foreground font-medium mt-1">Los Angeles, California</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="meta-label">Press Inquiries</span>
                  <p className="text-foreground font-medium mt-1">press@music4all.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-alt rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Follow Us</h2>
            <p className="text-muted-foreground mb-4">
              Stay connected on social media for the latest updates, exclusive content, 
              and behind-the-scenes moments.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Twitter', 'Instagram', 'YouTube', 'TikTok'].map((platform) => (
                <Button 
                  key={platform} 
                  variant="outline" 
                  size="sm"
                  className="border-border text-foreground hover:border-primary hover:text-primary"
                >
                  {platform}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
