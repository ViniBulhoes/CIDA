const API_URL = 'http://localhost:8000'

export async function criarUsuario(usuario) {
  const resposta = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(dados.detail || 'Erro ao criar usuário')
  }

  return dados
}