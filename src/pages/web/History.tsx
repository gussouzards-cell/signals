import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Search } from 'lucide-react';
import { mockAlerts } from '@/data/mockData';
import { AlertPriority, RuleType, AlertStatus } from '@/types';
import PriorityBadge from '@/components/PriorityBadge';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function History() {
  const [filterPriority, setFilterPriority] = useState<AlertPriority | 'all'>('all');
  const [filterType, setFilterType] = useState<RuleType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<AlertStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesType && matchesStatus && matchesSearch;
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

  const getStatusLabel = (status: AlertStatus) => {
    const labels = {
      open: 'Aberto',
      resolved: 'Resolvido',
      in_progress: 'Em Progresso',
    };
    return labels[status];
  };

  const handleExport = () => {
    // Aqui você implementaria a exportação (CSV, Excel, etc.)
    const csvContent = [
      ['Título', 'Tipo', 'Prioridade', 'Status', 'Data Criação', 'Data Resolução'].join(','),
      ...filteredAlerts.map(alert => [
        alert.title,
        getTypeLabel(alert.type),
        alert.priority,
        getStatusLabel(alert.status),
        format(alert.createdAt, 'dd/MM/yyyy HH:mm'),
        alert.resolvedAt ? format(alert.resolvedAt, 'dd/MM/yyyy HH:mm') : '',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `alertas-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="space-y-fluap">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Histórico de Alertas</h1>
        <button
          onClick={handleExport}
          className="fluap-button-primary flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Exportar</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="fluap-card">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar no histórico..."
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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AlertStatus | 'all')}
              className="fluap-select"
            >
              <option value="all">Todos os Status</option>
              <option value="open">Aberto</option>
              <option value="in_progress">Em Progresso</option>
              <option value="resolved">Resolvido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="fluap-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Título</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Prioridade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Criado em</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Resolvido em</th>
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
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {alert.resolvedAt
                      ? format(alert.resolvedAt, "dd/MM/yyyy HH:mm", { locale: ptBR })
                      : '-'}
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
              Nenhum alerta encontrado no histórico
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

