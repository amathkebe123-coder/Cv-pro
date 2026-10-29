/**
 * Configuration centralisée des coordonnées de contact
 * Modifiable facilement à tout moment.
 */
export const CONTACT_CONFIG = {
  name: "Mouhameth Kébé",
  email: "kebeamath123@gmail.com",
  phone: "+221 76 376 46 78",
  whatsappNumber: "221763764678",
  whatsappMessage: "Bonjour, je vous contacte depuis votre site CV Pro.",
  emailSubject: "Contact depuis CV Pro",

  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  },

  get mailtoUrl() {
    return `mailto:${this.email}?subject=${encodeURIComponent(this.emailSubject)}`;
  }
};

