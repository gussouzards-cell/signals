import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { mockRules } from '@/data/mockData';
import { RuleType, TriggerType, NotificationChannel } from '@/types';

export default function EditRule() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const rule = mockRules.find(r => r.id === id);

  const [formData, setFormData] = useState({
    name: '',
    type: 'patient' as RuleType,
    triggerType: 'condition' as TriggerType,
    condition: '',
    notificationChannels: [] as NotificationChannel[],
    responsibleUsers: [] as string[],
    status: 'active' as 'active' | 'inactive',
  });

  const [newResponsible, setNewResponsible] = useState('');

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        type: rule.type,
        triggerType: rule.triggerType,
        condition: rule.condition || '',
        notificationChannels: rule.notificationChannels,
        responsibleUsers: rule.responsibleUsers,
        status: rule.status,
      });
    }
  }, [rule]);

  if (!rule) {
    return (
      <div className="fluap-card text-center py-8">
        <p className="text-gray-500">Regra não encontrada</p>
        <button
          onClick={() => navigate('/rules')}
          className="fluap-button-primary mt-4"
        >
          Voltar
        </button>
      </div>
    );
  }

  const handleChannelToggle = (channel: NotificationChannel) => {
    setFormData(prev => ({
      ...prev,
      notificationChannels: prev.notificationChannels.includes(channel)
        ? prev.notificationChannels.filter(c => c !== channel)
        : [...prev.notificationChannels, channel],
    }));
  };

  const handleAddResponsible = () => {
    if (newResponsible.trim() && !formData.responsibleUsers.includes(newResponsible.trim())) {
      setFormData(prev => ({
        ...prev,
        responsibleUsers: [...prev.responsibleUsers, newResponsible.trim()],
      }));
      setNewResponsible('');
    }
  };

  const handleRemoveResponsible = (user: string) => {
    setFormData(prev => ({
      ...prev,
      responsibleUsers: prev.responsibleUsers.filter(u => u !== user),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada à API
    console.log('Atualizando regra:', formData);
    navigate('/rules');
  };

  return (
    <div className="space-y-fluap">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/rules')}
          className="p-2 hover:bg-gray-100 rounded-fluap"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Editar Regra</h1>
      </div>

      <form onSubmit={handleSubmit} className="fluap-card space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Regra *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="fluap-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as RuleType }))}
              className="fluap-select"
            >
              <option value="patient">Paciente</option>
              <option value="stock">Estoque</option>
              <option value="financial">Financeiro</option>
              <option value="medical">Médico</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Trigger *
            </label>
            <select
              required
              value={formData.triggerType}
              onChange={(e) => setFormData(prev => ({ ...prev, triggerType: e.target.value as TriggerType }))}
              className="fluap-select"
            >
              <option value="event">Evento</option>
              <option value="condition">Condição</option>
              <option value="ai">IA</option>
            </select>
          </div>
        </div>

        {(formData.triggerType === 'condition' || formData.triggerType === 'ai') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condição {formData.triggerType === 'ai' ? '(Descrição)' : '*'}
            </label>
            <input
              type="text"
              required={formData.triggerType === 'condition'}
              value={formData.condition}
              onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
              className="fluap-input"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Canais de Notificação *
          </label>
          <div className="flex flex-wrap gap-3">
            {(['email', 'sms', 'push', 'dashboard'] as NotificationChannel[]).map((channel) => (
              <label
                key={channel}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.notificationChannels.includes(channel)}
                  onChange={() => handleChannelToggle(channel)}
                  className="w-4 h-4 text-fluap-primary border-gray-300 rounded focus:ring-fluap-primary"
                />
                <span className="text-sm text-gray-700 capitalize">{channel}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Responsáveis *
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="email"
              value={newResponsible}
              onChange={(e) => setNewResponsible(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResponsible())}
              className="fluap-input flex-1"
              placeholder="email@exemplo.com"
            />
            <button
              type="button"
              onClick={handleAddResponsible}
              className="fluap-button-secondary"
            >
              Adicionar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.responsibleUsers.map((user) => (
              <span
                key={user}
                className="inline-flex items-center space-x-1 bg-fluap-secondary text-fluap-primary px-3 py-1 rounded-fluap text-sm"
              >
                <span>{user}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveResponsible(user)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
            className="fluap-select"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate('/rules')}
            className="fluap-button-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="fluap-button-primary flex items-center space-x-2"
          >
            <Save size={20} />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
}

