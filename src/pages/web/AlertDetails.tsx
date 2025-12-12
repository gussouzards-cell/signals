import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageSquare } from 'lucide-react';
import { mockAlerts } from '@/data/mockData';
import PriorityBadge from '@/components/PriorityBadge';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function AlertDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const alert = mockAlerts.find(a => a.id === id);
  const [resolutionComment, setResolutionComment] = useState('');
  const [isResolved, setIsResolved] = useState(alert?.status === 'resolved');

  if (!alert) {
    return (
      <div className="fluap-card text-center py-8">
        <p className="text-gray-500">Alerta não encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="fluap-button-primary mt-4"
        >
          Voltar
        </button>
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
    // navigate('/');
  };

  return (
    <div className="space-y-fluap">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-fluap"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Detalhes do Alerta</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-fluap">
        <div className="lg:col-span-2 space-y-fluap">
          {/* Card Principal */}
          <div className="fluap-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{alert.title}</h2>
                <div className="flex items-center space-x-3">
                  <PriorityBadge priority={alert.priority} />
                  <span className="text-sm text-gray-600">
                    {getTypeLabel(alert.type)}
                  </span>
                </div>
              </div>
            </div>

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
                <div className="bg-gray-50 rounded-fluap p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
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
                  <span>Marcar como Resolvido</span>
                </button>
              </div>
            </div>
          )}

          {isResolved && (
            <div className="fluap-card bg-green-50 border-green-200">
              <div className="flex items-center space-x-2 text-green-700">
                <CheckCircle size={20} />
                <span className="font-semibold">Alerta Resolvido</span>
              </div>
              {resolutionComment && (
                <p className="mt-2 text-green-600">{resolutionComment}</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-fluap">
          <div className="fluap-card">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Informações</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Status:</span>
                <span className={`ml-2 font-medium ${
                  alert.status === 'resolved' ? 'text-green-600' :
                  alert.status === 'in_progress' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {alert.status === 'resolved' ? 'Resolvido' :
                   alert.status === 'in_progress' ? 'Em Progresso' :
                   'Aberto'}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Criado em:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {format(alert.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
              {alert.resolvedAt && (
                <div>
                  <span className="text-gray-500">Resolvido em:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {format(alert.resolvedAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </span>
                </div>
              )}
              {alert.resolvedBy && (
                <div>
                  <span className="text-gray-500">Resolvido por:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {alert.resolvedBy}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

