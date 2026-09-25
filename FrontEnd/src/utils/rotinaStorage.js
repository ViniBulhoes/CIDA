const OCORRENCIAS_KEY = 'cida_ocorrencias_v1';

// Busca todas as ocorrências salvas
function getBancoOcorrencias() {
  const salvo = localStorage.getItem(OCORRENCIAS_KEY);
  return salvo ? JSON.parse(salvo) : {};
}

// Retorna as ocorrências de um idoso em uma data (padrão: hoje)
export function getOcorrenciasPorData(idosoId = 'idoso-1', dataObj = new Date()) {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoOcorrencias();
  return banco[idosoId]?.[chaveData] || [];
}

// Registra uma nova ocorrência
export function registrarOcorrencia(idosoId = 'idoso-1', tipo, descricao, gravidade = 'moderada') {
  const chaveData = formatarDataChave(new Date());
  const banco = getBancoOcorrencias();

  if (!banco[idosoId]) banco[idosoId] = {};
  if (!banco[idosoId][chaveData]) banco[idosoId][chaveData] = [];

  const agora = new Date();
  const horario = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const novaOcorrencia = {
    id: Date.now().toString(),
    horario,
    tipo,        // ex: 'Dor / Mal-estar', 'Queda', 'Tontura', etc.
    descricao,   // texto digitado
    gravidade,   // 'leve', 'moderada', 'urgente'
    criadoEm: agora.toISOString()
  };

  banco[idosoId][chaveData].unshift(novaOcorrencia); // mais recentes primeiro
  localStorage.setItem(OCORRENCIAS_KEY, JSON.stringify(banco));
  window.dispatchEvent(new Event('ocorrencias_atualizadas'));
  return novaOcorrencia;
}
