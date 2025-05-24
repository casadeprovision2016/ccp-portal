
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Calendar, Users, Settings, Home } from 'lucide-react';
import EventsManager from '@/components/panel/EventsManager';
import MembersManager from '@/components/panel/MembersManager';
import MinistriesManager from '@/components/panel/MinistriesManager';

const Panel = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const sections = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'events', name: 'Eventos', icon: Calendar },
    { id: 'members', name: 'Miembros', icon: Users },
    { id: 'ministries', name: 'Ministerios', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'events':
        return <EventsManager />;
      case 'members':
        return <MembersManager />;
      case 'ministries':
        return <MinistriesManager />;
      default:
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-church-blue-dark">Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-church-gold">12</p>
                <p className="text-gray-600">Eventos este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-church-blue-dark">Miembros</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-church-gold">158</p>
                <p className="text-gray-600">Miembros registrados</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-church-blue-dark">Ministerios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-church-gold">8</p>
                <p className="text-gray-600">Ministerios activos</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/e0c5fe70-273d-4e8b-9066-e25340499af4.png" 
                alt="Centro Cristiano Casa de Provisión" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-semibold text-church-blue-dark">
                Panel Administrativo
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Bienvenido, {user?.name} ({user?.role})
              </span>
              <Button
                variant="outline"
                onClick={logout}
                className="border-church-blue text-church-blue hover:bg-church-blue hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeSection === section.id 
                      ? 'bg-church-gold text-white hover:bg-church-gold-dark' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="h-4 w-4 mr-2" />
                  {section.name}
                </Button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
