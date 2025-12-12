import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { mockAlerts } from '@/data/mockData';
import { Alert, RuleType } from '@/types';
import PriorityBadge from '@/components/PriorityBadge';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function MobileAlertsList() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<RuleType | 'all'>('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    return filterType === 'all' || alert.type === filterType;
  });

  const getTypeLabel = (type: RuleType) => {
    const labels = {
      patient: 'Paciente',
      stock: 'Estoque',
      financial: 'Financeiro',
      medical: 'Médico',
      other: 'Outro',
    };
    return labels[type];
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    const colors = {
      high: 'border-l-4 border-red-500 bg-red-50',
      medium: 'border-l-4 border-yellow-500 bg-yellow-50',
      low: 'border-l-4 border-blue-500 bg-blue-50',
    };
    return colors[priority];
  };

  const alertsByPriority = {
    high: filteredAlerts.filter(a => a.priority === 'high'),
    medium: filteredAlerts.filter(a => a.priority === 'medium'),
    low: filteredAlerts.filter(a => a.priority === 'low'),
  };

  return (
    <div className="pb-4">
      {/* Filtro */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <Filter size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filtrar por tipo</span>
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as RuleType | 'all')}
          className="w-full px-4 py-2 rounded-fluap border border-gray-300 bg-white"
        >
          <option value="all">Todos os Tipos</option>
          <option value="patient">Paciente</option>
          <option value="stock">Estoque</option>
          <option value="financial">Financeiro</option>
          <option value="medical">Médico</option>
          <option value="other">Outro</option>
        </select>
      </div>

      {/* Alertas por Prioridade */}
      <div className="space-y-4 p-4">
        {/* Alta Prioridade */}
        {alertsByPriority.high.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-red-600 mb-3">Alta Prioridade</h2>
            <div className="space-y-3">
              {alertsByPriority.high.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => navigate(`/mobile/alerts/${alert.id}`)}
                  className={`fluap-card ${getPriorityColor(alert.priority)} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 flex-1">{alert.title}</h3>
                    <PriorityBadge priority={alert.priority} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{getTypeLabel(alert.type)}</span>
                    <span>{format(alert.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Média Prioridade */}
        {alertsByPriority.medium.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-yellow-600 mb-3">Média Prioridade</h2>
            <div className="space-y-3">
              {alertsByPriority.medium.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => navigate(`/mobile/alerts/${alert.id}`)}
                  className={`fluap-card ${getPriorityColor(alert.priority)} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 flex-1">{alert.title}</h3>
                    <PriorityBadge priority={alert.priority} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{getTypeLabel(alert.type)}</span>
                    <span>{format(alert.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Baixa Prioridade */}
        {alertsByPriority.low.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-3">Baixa Prioridade</h2>
            <div className="space-y-3">
              {alertsByPriority.low.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => navigate(`/mobile/alerts/${alert.id}`)}
                  className={`fluap-card ${getPriorityColor(alert.priority)} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 flex-1">{alert.title}</h3>
                    <PriorityBadge priority={alert.priority} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{getTypeLabel(alert.type)}</span>
                    <span>{format(alert.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum alerta encontrado
          </div>
        )}
      </div>
    </div>
  );
}

