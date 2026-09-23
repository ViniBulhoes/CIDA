const STORAGE_KEY = 'cida_rotina_calendario';

// Utilitário para formatar qualquer Date em 'YYYY-MM-DD'
export function formatarDataChave(date) {
  const d = new Date(date);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Modelo de rotina diária padrão
const rotinaPadrao = [
  {
    id: 1,
    horario: '08:00',
    titulo: 'Café da manhã e Insulina',
    detalhe: 'Aplicar 10 unidades antes de comer.',
    tipo: 'remedio',
    concluido: false,
  },
  {
    id: 2,
    horario: '10:00',
    titulo: 'Losartana 50mg',
    detalhe: 'Tomar com um copo cheio de água.',
    tipo: 'remedio',
    concluido: false,
  },
  {
    id: 3,
    horario: '13:00',
    titulo: 'Almoço saudável',
    detalhe: 'Evitar alimentos com muito sal.',
    tipo: 'refeicao',
    concluido: false,
  },
  {
    id: 4,
    horario: '20:00',
    titulo: 'Sinvastatina 20mg',
    detalhe: 'Tomar antes de dormir.',
    tipo: 'remedio',
    concluido: false,
  }
];

function getMapaRotinas() {
  const dados = localStorage.getItem(STORAGE_KEY);
  if (!dados) {
    const hojeChave = formatarDataChave(new Date());
    const inicial = {
      [hojeChave]: [
        { ...rotinaPadrao[0], concluido: true },
        rotinaPadrao[1],
        rotinaPadrao[2],
        rotinaPadrao[3],
      ]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
    return inicial;
  }
  return JSON.parse(dados);
}

export function getAtividadesPorData(dataObj) {
  const chave = formatarDataChave(dataObj);
  const mapa = getMapaRotinas();

  if (!mapa[chave]) {
    mapa[chave] = rotinaPadrao.map(item => ({ ...item, id: `${chave}-${item.id}` }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapa));
  }

  return mapa[chave];
}

// Marca dose como concluída
export function concluirDoseNaData(dataObj, id) {
  const chave = formatarDataChave(dataObj);
  const mapa = getMapaRotinas();

  if (mapa[chave]) {
    mapa[chave] = mapa[chave].map(item => 
      item.id === id ? { ...item, concluido: true } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapa));
    window.dispatchEvent(new Event('rotina_atualizada'));
  }
}

// Desfaz a conclusão da dose (volta para pendente)
export function desfazerDoseNaData(dataObj, id) {
  const chave = formatarDataChave(dataObj);
  const mapa = getMapaRotinas();

  if (mapa[chave]) {
    mapa[chave] = mapa[chave].map(item => 
      item.id === id ? { ...item, concluido: false } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapa));
    window.dispatchEvent(new Event('rotina_atualizada'));
  }
}

// Para a Home
export function getProximaDoseHoje() {
  const hoje = new Date();
  const tarefasHoje = getAtividadesPorData(hoje);
  const ordenadas = [...tarefasHoje].sort((a, b) => a.horario.localeCompare(b.horario));
  return ordenadas.find(item => !item.concluido) || null;
}

export function concluirDoseHoje(id) {
  concluirDoseNaData(new Date(), id);
}