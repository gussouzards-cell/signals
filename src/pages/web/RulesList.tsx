import { Link } from 'react-router-dom';
import { Plus, Edit, CheckCircle, XCircle } from 'lucide-react';
import { mockRules } from '@/data/mockData';
import { Rule, RuleType } from '@/types';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function RulesList() {
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

  const getTriggerLabel = (trigger: Rule['triggerType']) => {
    const labels = {
      event: 'Evento',
      condition: 'Condição',
      ai: 'IA',
    };
    return labels[trigger];
  };

  return (
    <div className="space-y-fluap">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Lista de Regras</h1>
        <Link to="/rules/create" className="fluap-button-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Criar Regra</span>
        </Link>
      </div>

      <div className="fluap-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome da Regra</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Trigger</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Última Atualização</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockRules.map((rule) => (
                <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium">{rule.name}</p>
                    {rule.condition && (
                      <p className="text-sm text-gray-500 mt-1">Condição: {rule.condition}</p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{getTypeLabel(rule.type)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{getTriggerLabel(rule.triggerType)}</span>
                  </td>
                  <td className="py-3 px-4">
                    {rule.status === 'active' ? (
                      <span className="flex items-center space-x-1 text-green-600">
                        <CheckCircle size={16} />
                        <span className="text-sm">Ativo</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-gray-400">
                        <XCircle size={16} />
                        <span className="text-sm">Inativo</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {format(rule.updatedAt, "dd/MM/yyyy", { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/rules/edit/${rule.id}`}
                      className="fluap-button-secondary flex items-center space-x-1 text-sm"
                    >
                      <Edit size={16} />
                      <span>Editar</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

