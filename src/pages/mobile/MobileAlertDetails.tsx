import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageSquare } from 'lucide-react';
import { mockAlerts } from '@/data/mockData';
import PriorityBadge from '@/components/PriorityBadge';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function MobileAlertDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const alert = mockAlerts.find(a => a.id === id);
  const [resolutionComment, setResolutionComment] = useState('');
  const [isResolved, setIsResolved] = useState(alert?.status === 'resolved');

  if (!alert) {
    return (
      <div className="p-4">
        <div className="fluap-card text-center py-8">
          <p className="text-gray-500">Alerta não encontrado</p>
          <button
            onClick={() => navigate('/mobile')}
            className="fluap-button-primary mt-4"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      patient: 'Paciente',
      stock: 'Estoque',
      financial: 'Financeiro',
      medical: 'Médico',
      other: 'Outro',
    };
    return labels[type] || type;
  };

  const handleResolve = () => {
    // Aqui você faria a chamada à API
    console.log('Resolvendo alerta:', { id: alert.id, comment: resolutionComment });
    setIsResolved(true);
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={() => navigate('/mobile')}
            className="p-2 -ml-2"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 flex-1">Detalhes do Alerta</h1>
        </div>
        <div className="flex items-center space-x-2">
          <PriorityBadge priority={alert.priority} />
          <span className="text-sm text-gray-600">{getTypeLabel(alert.type)}</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Card Principal */}
        <div className="fluap-card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{alert.title}</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Descrição</h3>
              <p className="text-gray-600">{alert.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Contexto</h3>
              <p className="text-gray-600">{alert.context}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Dados do Evento</h3>
              <div className="bg-gray-50 rounded-fluap p-3">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(alert.eventData, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Ação Sugerida</h3>
              <p className="text-gray-600">{alert.suggestedAction}</p>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="fluap-card">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Informações</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`font-medium ${
                alert.status === 'resolved' ? 'text-green-600' :
                alert.status === 'in_progress' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {alert.status === 'resolved' ? 'Resolvido' :
                 alert.status === 'in_progress' ? 'Em Progresso' :
                 'Aberto'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Criado em:</span>
              <span className="font-medium text-gray-900">
                {format(alert.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </span>
            </div>
            {alert.resolvedAt && (
              <div className="flex justify-between">
                <span className="text-gray-500">Resolvido em:</span>
                <span className="font-medium text-gray-900">
                  {format(alert.resolvedAt, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </span>
              </div>
            )}
            {alert.resolvedBy && (
              <div className="flex justify-between">
                <span className="text-gray-500">Resolvido por:</span>
                <span className="font-medium text-gray-900">{alert.resolvedBy}</span>
              </div>
            )}
          </div>
        </div>

        {/* Resolução */}
        {!isResolved && (
          <div className="fluap-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <MessageSquare size={20} />
              <span>Resolver Alerta</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentário (opcional)
                </label>
                <textarea
                  value={resolutionComment}
                  onChange={(e) => setResolutionComment(e.target.value)}
                  rows={4}
                  className="fluap-input"
                  placeholder="Adicione um comentário sobre a resolução..."
                />
              </div>
              <button
                onClick={handleResolve}
                className="fluap-button-primary flex items-center space-x-2 w-full justify-center"
              >
                <CheckCircle size={20} />
                <span>Resolver</span>
              </button>
            </div>
          </div>
        )}

        {isResolved && (
          <div className="fluap-card bg-green-50 border-green-200">
            <div className="flex items-center space-x-2 text-green-700 mb-2">
              <CheckCircle size={20} />
              <span className="font-semibold">Alerta Resolvido</span>
            </div>
            {resolutionComment && (
              <p className="text-green-600 text-sm">{resolutionComment}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

