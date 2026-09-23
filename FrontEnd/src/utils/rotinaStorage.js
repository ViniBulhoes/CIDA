const STORAGE_KEY = 'cida_rotina_calendario_v2';

// Formatar data em YYYY-MM-DD
export function formatarDataChave(date) {
  const d = new Date(date);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Rotina inicial padrão para o Seu João (idoso-1)
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

// Rotina inicial para a Dona Maria (idoso-2)
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
  return JSON.parse(salvo);
}

function salvarBanco(banco) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banco));
  window.dispatchEvent(new Event('rotina_atualizada'));
}

// Busca atividades de um idoso em uma data
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

export function getAtividadesPorData(dataObj = new Date()) {
  return getAtividadesPorIdosoEData('idoso-1', dataObj);
}

// Adiciona uma nova atividade (remédio com N dias ou lembrete em data específica)
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

// Remove uma atividade de uma data específica
export function removerAtividade(idosoId = 'idoso-1', id, dataObj = new Date()) {
  const chaveData = formatarDataChave(dataObj);
  const banco = getBancoCompleto();

  if (banco[idosoId]?.[chaveData]) {
    banco[idosoId][chaveData] = banco[idosoId][chaveData].filter(item => item.id !== id);
    salvarBanco(banco);
  }
}

// Conclui uma dose
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

// Desfaz conclusão de uma dose
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

// Próxima dose de hoje para a Home (Seu João)
export function getProximaDoseHoje() {
  const tarefasHoje = getAtividadesPorIdosoEData('idoso-1', new Date());
  return tarefasHoje.find(item => !item.concluido) || null;
}

export function concluirDoseHoje(id) {
  concluirDoseNaData(new Date(), id, 'idoso-1');
}