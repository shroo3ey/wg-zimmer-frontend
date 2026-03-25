import React, { useState } from 'react';
import { X, Mail, Phone, User, MessageSquare, AlertCircle, Loader } from 'lucide-react';
import { Room } from '../types/Room';
import { sendContactEmail } from '../services/emailService';

interface ContactModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ room, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !room) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const emailData = {
        roomId: room.id,
        roomTitle: room.title,
        senderName: formData.name,
        senderEmail: formData.email,
        senderPhone: formData.phone,
        message: formData.message,
        roomOwnerEmail: room.contact.email,
        roomOwnerName: room.contact.name,
      };

      const result = await sendContactEmail(emailData);

      if (result.success) {
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', message: '' });
          setError(null);
          onClose();
        }, 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-foreground">Kontakt aufnehmen</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors duration-200 p-1 hover:bg-background rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success State */
          <div className="p-10 text-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Nachricht gesendet!</h3>
            <p className="text-muted">
              Ihre Anfrage wurde an {room.contact.name} weitergeleitet. Sie werden sich in Kürze bei Ihnen melden.
            </p>
          </div>
        ) : (
          <>
            {/* Room Info */}
            <div className="p-6 bg-background border-b border-slate-100">
              <h3 className="font-bold text-foreground mb-2">{room.title}</h3>
              <p className="text-sm text-muted mb-3">{room.district}, {room.city}</p>
              <div className="flex items-center gap-4 text-sm text-foreground">
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">{room.rent} €/Monat</span>
                <span>{room.size} m²</span>
                <span>ab {new Date(room.availableFrom).toLocaleDateString('de-DE')}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 border-b border-slate-100">
              <h4 className="font-bold text-foreground mb-3">Anbieter</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  {room.contact.name}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  {room.contact.email}
                </div>
                {room.contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    {room.contact.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Nachricht senden
              </h4>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm placeholder-muted transition-all duration-200"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm placeholder-muted transition-all duration-200"
                      placeholder="ihre.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Telefon (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm placeholder-muted transition-all duration-200"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Nachricht *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background text-sm placeholder-muted resize-none transition-all duration-200"
                    placeholder="Hallo! Ich interessiere mich für Ihr WG-Zimmer und würde gerne mehr erfahren..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 bg-background hover:bg-muted/20 disabled:opacity-50 disabled:cursor-not-allowed text-foreground border border-slate-200 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-foreground disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      'Nachricht senden'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
