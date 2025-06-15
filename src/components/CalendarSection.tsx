
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

const CalendarSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Cargar eventos del localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'culto': return 'bg-church-gold';
      case 'estudio': return 'bg-church-blue';
      case 'jovenes': return 'bg-green-600';
      case 'oracion': return 'bg-purple-600';
      case 'especial': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'culto': return 'Culto';
      case 'estudio': return 'Estudio Bíblico';
      case 'jovenes': return 'Jóvenes';
      case 'oracion': return 'Oración';
      case 'especial': return 'Evento Especial';
      default: return 'Evento';
    }
  };

  // Filtrar eventos del mes actual y futuro
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6); // Mostrar solo los próximos 6 eventos

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <section id="calendario" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-church-blue-dark mb-4">
            Calendario de Actividades
          </h2>
          <p className="text-xl text-gray-600">
            Mantente al día con nuestras actividades y eventos programados
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar View */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-church-blue-dark">
                    {currentMonth.toLocaleDateString('es-ES', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-600">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-church-gold" />
                  <p>Vista de calendario próximamente</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-church-blue-dark">
              Próximos Eventos
            </h3>
            
            {upcomingEvents.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No hay eventos programados</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getEventTypeColor(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-church-blue-dark mb-2">
                            {event.title}
                          </h4>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-church-gold" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-church-gold" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-church-gold" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
