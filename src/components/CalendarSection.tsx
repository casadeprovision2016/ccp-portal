
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const events = [
    { date: 3, title: "Culto Dominical", type: "culto" },
    { date: 5, title: "Estudio Bíblico", type: "estudio" },
    { date: 7, title: "Reunión de Jóvenes", type: "jovenes" },
    { date: 10, title: "Culto Dominical", type: "culto" },
    { date: 12, title: "Estudio Bíblico", type: "estudio" },
    { date: 14, title: "Reunión de Jóvenes", type: "jovenes" },
    { date: 17, title: "Culto Dominical", type: "culto" },
    { date: 19, title: "Estudio Bíblico", type: "estudio" },
    { date: 21, title: "Reunión de Jóvenes", type: "jovenes" },
    { date: 24, title: "Culto Dominical", type: "culto" },
    { date: 26, title: "Estudio Bíblico", type: "estudio" },
    { date: 28, title: "Reunión de Jóvenes", type: "jovenes" },
    { date: 31, title: "Culto Dominical", type: "culto" }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'culto': return 'bg-church-gold text-white';
      case 'estudio': return 'bg-church-blue text-white';
      case 'jovenes': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-20"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = events.filter(event => event.date === day);
    days.push(
      <div key={day} className="h-20 border border-gray-200 p-1 bg-white hover:bg-gray-50 transition-colors">
        <div className="text-sm font-semibold text-gray-700 mb-1">{day}</div>
        <div className="space-y-1">
          {dayEvents.slice(0, 2).map((event, index) => (
            <div 
              key={index}
              className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500">+{dayEvents.length - 2} más</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <section id="calendario" className="py-20 bg-church-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-church-blue-dark mb-6">
            Calendario de Eventos
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Mantente al día con todas nuestras actividades y reuniones
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader className="bg-church-blue text-white">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={prevMonth}
                    className="text-white hover:bg-church-blue-dark"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <CardTitle className="text-2xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={nextMonth}
                    className="text-white hover:bg-church-blue-dark"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Week headers */}
                <div className="grid grid-cols-7 bg-gray-100">
                  {weekDays.map(day => (
                    <div key={day} className="p-3 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                  {days}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legend and upcoming events */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-church-blue-dark flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-church-gold" />
                  Tipos de Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-church-gold rounded"></div>
                  <span className="text-gray-700">Cultos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-church-blue rounded"></div>
                  <span className="text-gray-700">Estudios Bíblicos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span className="text-gray-700">Reuniones de Jóvenes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-church-blue-dark">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-church-gold pl-4 py-2">
                  <h4 className="font-semibold text-church-blue-dark">Culto Dominical</h4>
                  <p className="text-gray-600">Domingo 9:00 AM</p>
                </div>
                <div className="border-l-4 border-church-blue pl-4 py-2">
                  <h4 className="font-semibold text-church-blue-dark">Estudio Bíblico</h4>
                  <p className="text-gray-600">Miércoles 7:30 PM</p>
                </div>
                <div className="border-l-4 border-green-600 pl-4 py-2">
                  <h4 className="font-semibold text-church-blue-dark">Reunión de Jóvenes</h4>
                  <p className="text-gray-600">Viernes 7:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
