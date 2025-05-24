
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, CreditCard, Smartphone, Shield, Gift } from 'lucide-react';

const DonationsSection = () => {
  return (
    <section id="donaciones" className="py-20 bg-church-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-church-blue-dark mb-6">
            Donaciones
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Tu generosidad nos permite continuar con la obra de Dios y bendecir a nuestra comunidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-church-blue-dark mb-6">
              ¿Por qué donamos?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-church-blue-dark mb-2">Por amor a Dios</h4>
                  <p className="text-gray-600">Expresamos nuestra gratitud y amor hacia Dios a través de la ofrenda voluntaria.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Gift className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-church-blue-dark mb-2">Para la obra del Reino</h4>
                  <p className="text-gray-600">Apoyamos los ministerios, programas sociales y el crecimiento de nuestra iglesia.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-church-gold mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-church-blue-dark mb-2">Con responsabilidad</h4>
                  <p className="text-gray-600">Manejamos cada donación con transparencia y responsabilidad ante Dios y la congregación.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop" 
              alt="Manos dando"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-church-blue/20 rounded-lg"></div>
          </div>
        </div>

        {/* Donation Methods */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-xl border-t-4 border-church-gold">
            <CardHeader className="text-center">
              <Smartphone className="h-12 w-12 text-church-gold mx-auto mb-4" />
              <CardTitle className="text-2xl text-church-blue-dark">PIX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Dona de forma rápida y segura usando PIX</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-mono text-lg text-church-blue-dark">
                    igreja@casadeprovision.org
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Centro Cristiano Casa de Provisión
                </p>
              </div>
              <Button 
                className="w-full bg-church-gold hover:bg-church-gold-dark text-white font-semibold text-lg py-3"
                size="lg"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Donar via PIX
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-t-4 border-church-blue">
            <CardHeader className="text-center">
              <CreditCard className="h-12 w-12 text-church-blue mx-auto mb-4" />
              <CardTitle className="text-2xl text-church-blue-dark">PagSeguro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Dona usando tarjeta de crédito o débito</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Transacción segura</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Todos los métodos de pago</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full bg-church-blue hover:bg-church-blue-dark text-white font-semibold text-lg py-3"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Donar via PagSeguro
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-church-cream border-church-gold border-2 inline-block">
            <CardContent className="p-6">
              <p className="text-church-blue-dark font-semibold text-lg">
                "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, 
                porque Dios ama al dador alegre."
              </p>
              <p className="text-church-gold font-semibold mt-2">2 Corintios 9:7</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationsSection;
