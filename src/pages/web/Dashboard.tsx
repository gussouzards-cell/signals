import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, TrendingUp, Search } from 'lucide-react';
import { mockAlerts, mockKPI } from '@/data/mockData';
import { Alert, AlertPriority, RuleType } from '@/types';
import PriorityBadge from '@/components/PriorityBadge';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function Dashboard() {
  const [filterPriority, setFilterPriority] = useState<AlertPriority | 'all'>('all');
  const [filterType, setFilterType] = useState<RuleType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesType && matchesSearch;
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

  const getStatusLabel = (status: Alert['status']) => {
    const labels = {
      open: 'Aberto',
      resolved: 'Resolvido',
      in_progress: 'Em Progresso',
    };
    return labels[status];
  };

  return (
    <div className="space-y-fluap">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Alertas</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-fluap">
        <div className="fluap-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Alertas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockKPI.totalAlerts}</p>
            </div>
            <div className="bg-fluap-secondary p-4 rounded-fluap">
              <AlertTriangle className="text-fluap-primary" size={32} />
            </div>
          </div>
        </div>

        <div className="fluap-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tempo Médio Resolução</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockKPI.averageResolutionTime}h
              </p>
            </div>
            <div className="bg-fluap-secondary p-4 rounded-fluap">
              <Clock className="text-fluap-primary" size={32} />
            </div>
          </div>
        </div>

        <div className="fluap-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Abertos Hoje</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockKPI.openToday}</p>
            </div>
            <div className="bg-fluap-secondary p-4 rounded-fluap">
              <TrendingUp className="text-fluap-primary" size={32} />
            </div>
          </div>
        </div>

        <div className="fluap-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Por Prioridade</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600">Alta:</span>
                  <span className="font-semibold">{mockKPI.alertsByPriority.high}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-600">Média:</span>
                  <span className="font-semibold">{mockKPI.alertsByPriority.medium}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600">Baixa:</span>
                  <span className="font-semibold">{mockKPI.alertsByPriority.low}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="fluap-card">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="fluap-input pl-10"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as AlertPriority | 'all')}
              className="fluap-select"
            >
              <option value="all">Todas as Prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as RuleType | 'all')}
              className="fluap-select"
            >
              <option value="all">Todos os Tipos</option>
              <option value="patient">Paciente</option>
              <option value="stock">Estoque</option>
              <option value="financial">Financeiro</option>
              <option value="medical">Médico</option>
              <option value="other">Outro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela de Alertas Recentes */}
      <div className="fluap-card">
        <h2 className="text-xl font-semibold mb-fluap">Alertas Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Título</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Prioridade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-gray-500">{alert.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{getTypeLabel(alert.type)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <PriorityBadge priority={alert.priority} />
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm ${
                      alert.status === 'resolved' ? 'text-green-600' :
                      alert.status === 'in_progress' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {getStatusLabel(alert.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {format(alert.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/alerts/${alert.id}`}
                      className="text-fluap-primary hover:text-fluap-primary-dark font-medium text-sm"
                    >
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum alerta encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

