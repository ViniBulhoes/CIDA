const STORAGE_KEY = 'cida_rotina_calendario_v2';
const OCORRENCIAS_KEY = 'cida_ocorrencias_v1';

// Formatar data em YYYY-MM-DD
export function formatarDataChave(date) {
  const d = new Date(date);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Rotinas iniciais padrão
const rotinaInicialJoao = [
  {
    id: 'joao-1',
    horario: '08:00',
    titulo: 'Café da manhã e Insulina',
    detalhe: 'Aplicar 10 unidades antes de comer.',
    tipo: 'remedio',
    concluido: true,
  },
  {
    id: 'joao-2',
    horario: '10:00',
    titulo: 'Losartana Potássica 50mg',
    detalhe: 'Tomar com água',
    tipo: 'remedio',
    concluido: true,
  },
  {
    id: 'joao-3',
    horario: '14:00',
    titulo: 'Metformina 850mg',
    detalhe: 'Após o almoço',
    tipo: 'remedio',
    concluido: false,
  }
];

const rotinaInicialMaria = [
  {
    id: 'maria-1',
    horario: '09:00',
    titulo: 'Cálcio + Vitamina D',
    detalhe: 'Tomar junto com suco',
    tipo: 'remedio',
    concluido: true,
  },
  {
    id: 'maria-2',
    horario: '15:30',
    titulo: 'Fisioterapia Domiciliar',
    detalhe: 'Exercícios de marcha e postura',
    tipo: 'lembrete',
    concluido: false,
  }
];

function getBancoCompleto() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (!salvo) {
    const hojeChave = formatarDataChave(new Date());
    const bancoInicial = {
      'idoso-1': {
        [hojeChave]: rotinaInicialJoao
      },
      'idoso-2': {
        [hojeChave]: rotinaInicialMaria
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bancoInicial));
    return bancoInicial;
  }
  try {
    return JSON.parse(salvo);
  } catch {
    return {};
  }
}

function salvarBanco(banco) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banco));
  window.dispatchEvent(new Event('rotina_atualizada'));
}

// Retorna tarefas de um idoso em uma data
export function getAtividadesPorIdosoEData(idosoId = 'idoso-1', dataObj = new Date()) {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoCompleto();

  if (!banco[idosoId]) {
    banco[idosoId] = {};
  }

  if (!banco[idosoId][chaveData]) {
    const base = idosoId === 'idoso-2' ? rotinaInicialMaria : rotinaInicialJoao;
    banco[idosoId][chaveData] = base.map((item, idx) => ({
      ...item,
      id: `${idosoId}-${chaveData}-${idx}`,
      concluido: false
    }));
    salvarBanco(banco);
  }

  return [...banco[idosoId][chaveData]].sort((a, b) => a.horario.localeCompare(b.horario));
}

// Atalho compatível com a tela de Rotina (Seu João)
export function getAtividadesPorData(dataObj = new Date()) {
  return getAtividadesPorIdosoEData('idoso-1', dataObj);
}

// Adiciona nova atividade com suporte a N dias
export function adicionarAtividade(idosoId = 'idoso-1', novaAtividade, dataInicio = new Date(), diasDuracao = 1) {
  const banco = getBancoCompleto();
  if (!banco[idosoId]) banco[idosoId] = {};

  const totalDias = Math.max(1, parseInt(diasDuracao, 10) || 1);
  const baseTimestamp = Date.now();

  for (let i = 0; i < totalDias; i++) {
    const dataAlvo = new Date(dataInicio);
    dataAlvo.setDate(dataAlvo.getDate() + i);
    const chaveData = formatarDataChave(dataAlvo);

    if (!banco[idosoId][chaveData]) {
      banco[idosoId][chaveData] = [];
    }

    const item = {
      id: `${baseTimestamp}-${i}`,
      horario: novaAtividade.horario,
      titulo: novaAtividade.titulo,
      detalhe: novaAtividade.detalhe,
      tipo: novaAtividade.tipo || 'remedio',
      diasTratamento: totalDias,
      concluido: false
    };

    banco[idosoId][chaveData].push(item);
    banco[idosoId][chaveData].sort((a, b) => a.horario.localeCompare(b.horario));
  }

  salvarBanco(banco);
}

// Remove atividade
export function removerAtividade(idosoId = 'idoso-1', id, dataObj = new Date()) {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoCompleto();

  if (banco[idosoId]?.[chaveData]) {
    banco[idosoId][chaveData] = banco[idosoId][chaveData].filter(item => item.id !== id);
    salvarBanco(banco);
  }
}

// Conclui dose
export function concluirDoseNaData(dataObj = new Date(), id, idosoId = 'idoso-1') {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoCompleto();

  if (banco[idosoId]?.[chaveData]) {
    banco[idosoId][chaveData] = banco[idosoId][chaveData].map(item => 
      item.id === id ? { ...item, concluido: true } : item
    );
    salvarBanco(banco);
  }
}

// Desfaz dose
export function desfazerDoseNaData(dataObj = new Date(), id, idosoId = 'idoso-1') {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoCompleto();

  if (banco[idosoId]?.[chaveData]) {
    banco[idosoId][chaveData] = banco[idosoId][chaveData].map(item => 
      item.id === id ? { ...item, concluido: false } : item
    );
    salvarBanco(banco);
  }
}

// EXPORTS EXIGIDOS PELA HOME (Seu João)
export function getProximaDoseHoje() {
  const tarefasHoje = getAtividadesPorIdosoEData('idoso-1', new Date());
  return tarefasHoje.find(item => !item.concluido) || null;
}

export function concluirDoseHoje(id) {
  concluirDoseNaData(new Date(), id, 'idoso-1');
}

// =============================
// SEÇÃO: OCORRÊNCIAS
// =============================

function getBancoOcorrencias() {
  const salvo = localStorage.getItem(OCORRENCIAS_KEY);
  try {
    return salvo ? JSON.parse(salvo) : {};
  } catch {
    return {};
  }
}

export function getOcorrenciasPorData(idosoId = 'idoso-1', dataObj = new Date()) {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoOcorrencias();
  return banco[idosoId]?.[chaveData] || [];
}

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
    tipo,
    descricao,
    gravidade,
    criadoEm: agora.toISOString()
  };

  banco[idosoId][chaveData].unshift(novaOcorrencia);
  localStorage.setItem(OCORRENCIAS_KEY, JSON.stringify(banco));
  window.dispatchEvent(new Event('ocorrencias_atualizadas'));
  return novaOcorrencia;
}
