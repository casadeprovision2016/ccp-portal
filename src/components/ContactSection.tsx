
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí se implementaría el envío del formulario
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-church-blue-dark mb-6">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Estamos aquí para ti. No dudes en contactarnos para cualquier consulta o oración
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-church-blue-dark flex items-center gap-2">
                <Mail className="h-6 w-6 text-church-gold" />
                Envíanos un Mensaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-church-gold hover:bg-church-gold-dark text-white font-semibold text-lg py-3"
                  size="lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information and Map */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-church-blue-dark">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-church-blue-dark mb-1">Dirección</h4>
                    <p className="text-gray-600">
                      Av. Principal 123<br />
                      Barrio Centro<br />
                      Ciudad, Estado 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-church-blue-dark mb-1">Teléfono</h4>
                    <p className="text-gray-600">(11) 9876-5432</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-church-blue-dark mb-1">Email</h4>
                    <p className="text-gray-600">contacto@casadeprovision.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-church-blue-dark mb-1">Horarios de Oficina</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Lunes - Viernes: 9:00 AM - 5:00 PM</p>
                      <p>Sábado: 9:00 AM - 1:00 PM</p>
                      <p>Domingo: Después del culto</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contactar por WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-white shadow-xl">
              <CardContent className="p-0">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-church-gold mx-auto mb-4" />
                    <p className="text-gray-600">Mapa de Ubicación</p>
                    <p className="text-sm text-gray-500">Google Maps se integrará aquí</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
