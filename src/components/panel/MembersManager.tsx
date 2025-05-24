
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, User, Phone, Mail } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  ministry: string;
  status: 'active' | 'inactive';
}

const MembersManager = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    ministry: '',
    status: 'active' as const
  });

  useEffect(() => {
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    } else {
      const exampleMembers: Member[] = [
        {
          id: '1',
          name: 'María González',
          email: 'maria@email.com',
          phone: '(11) 9876-5432',
          address: 'Av. Principal 123',
          birthDate: '1985-06-15',
          ministry: 'Adoración',
          status: 'active'
        },
        {
          id: '2',
          name: 'Juan Carlos Silva',
          email: 'juan@email.com',
          phone: '(11) 8765-4321',
          address: 'Calle Secundaria 456',
          birthDate: '1980-03-22',
          ministry: 'Jóvenes',
          status: 'active'
        }
      ];
      setMembers(exampleMembers);
      localStorage.setItem('members', JSON.stringify(exampleMembers));
    }
  }, []);

  const saveMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem('members', JSON.stringify(newMembers));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMember) {
      const updatedMembers = members.map(member => 
        member.id === editingMember.id 
          ? { ...editingMember, ...formData }
          : member
      );
      saveMembers(updatedMembers);
      setEditingMember(null);
    } else {
      const newMember: Member = {
        id: Date.now().toString(),
        ...formData
      };
      saveMembers([...members, newMember]);
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      ministry: '',
      status: 'active'
    });
    setShowForm(false);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      birthDate: member.birthDate,
      ministry: member.ministry,
      status: member.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      const updatedMembers = members.filter(member => member.id !== id);
      saveMembers(updatedMembers);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.ministry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-church-blue-dark">Gestión de Miembros</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Buscar miembros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button
            onClick={() => setShowForm(true)}
            className="bg-church-gold hover:bg-church-gold-dark text-white whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Miembro
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingMember ? 'Editar Miembro' : 'Nuevo Miembro'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ministry">Ministerio</Label>
                  <select
                    id="ministry"
                    value={formData.ministry}
                    onChange={(e) => setFormData({...formData, ministry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Seleccionar ministerio</option>
                    <option value="Adoración">Adoración</option>
                    <option value="Jóvenes">Jóvenes</option>
                    <option value="Niños">Niños</option>
                    <option value="Intercesión">Intercesión</option>
                    <option value="Evangelismo">Evangelismo</option>
                    <option value="Técnico">Técnico</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-church-gold hover:bg-church-gold-dark text-white">
                  {editingMember ? 'Actualizar' : 'Crear'} Miembro
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingMember(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      address: '',
                      birthDate: '',
                      ministry: '',
                      status: 'active'
                    });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-church-gold" />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={`inline-block px-2 py-1 rounded text-xs text-white ${
                member.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
              }`}>
                {member.status === 'active' ? 'Activo' : 'Inactivo'}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-church-gold" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-church-gold" />
                <span>{member.phone}</span>
              </div>
              {member.ministry && (
                <div className="text-sm text-gray-600">
                  <strong>Ministerio:</strong> {member.ministry}
                </div>
              )}
              {member.address && (
                <div className="text-sm text-gray-600 truncate">
                  <strong>Dirección:</strong> {member.address}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron miembros que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
};

export default MembersManager;
