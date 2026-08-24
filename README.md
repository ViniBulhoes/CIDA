# CIDA

Aplicação web responsiva (pensada para uso em celular) com backend em **Python + FastAPI** e frontend em **React + Vite**.

---

## Sumário

- [Stack e decisões](#stack-e-decisões)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Rodando o projeto do zero](#rodando-o-projeto-do-zero)
- [Portas e endereços](#portas-e-endereços)
- [Testando no celular](#testando-no-celular)
- [O que não vai para o Git](#o-que-não-vai-para-o-git)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Fluxo de trabalho em grupo](#fluxo-de-trabalho-em-grupo)
- [Problemas comuns](#problemas-comuns)

---

## Stack e decisões

| Camada | Tecnologia | Por quê |
|---|---|---|
| Backend | FastAPI + Uvicorn | API que devolve **JSON**, não telas. Menos código para chegar no mesmo lugar e documentação automática em `/docs`. |
| Frontend | React + Vite (JavaScript) | Servidor de desenvolvimento instantâneo e hot reload. JavaScript puro, sem TypeScript, para não somar aprendizado novo em cima de prazo curto. |
| Linter | ESLint | Padrão da indústria: qualquer erro tem resposta pronta na internet. |
| Repositório | Um só, com duas pastas | Um clone, um histórico, um link para entregar. Mudanças que afetam front e back cabem em um commit só. |

### Sobre "app para celular"

O projeto é uma **aplicação web responsiva**, feita mobile-first e testada no navegador do celular.

Existem três níveis possíveis, e é importante não confundir:

1. **Site responsivo** — funciona bem no celular pelo navegador. *É o que estamos fazendo.*
2. **PWA** — o mesmo site com um `manifest.json` e um ícone. Instala na tela inicial e abre sem a barra do navegador. Custa cerca de 30 minutos e vende muito bem numa apresentação. *Meta opcional se sobrar tempo.*
3. **React Native / Expo** — app nativo de verdade, gera APK. É outra tecnologia, com outro setup. *Fora do escopo da primeira sprint.*

Se um dia o grupo migrar para Expo, **a API em FastAPI não muda uma linha** e a lógica do React vai junto. O que se joga fora é só a camada visual.

---

## Estrutura do repositório

```
CIDA/
├── BackEnd/            # API em FastAPI (ver BackEnd/README.md)
│   ├── venv/           # ambiente virtual — NÃO vai para o Git
│   ├── main.py
│   ├── requirements.txt
│   └── .env            # segredos — NÃO vai para o Git
├── FrontEnd/           # React + Vite (ver FrontEnd/README.md)
│   ├── node_modules/   # dependências — NÃO vai para o Git
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── .gitignore      # criado pelo Vite
├── .gitignore          # vale para o repositório inteiro
└── README.md
```

Cada pasta tem o próprio README com as instruções detalhadas daquela parte.

---

## Rodando o projeto do zero

Depois de clonar o repositório, são **duas** instalações independentes.

### 1. Backend

```bash
cd BackEnd
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux / Mac
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend

Em **outro terminal** (o backend precisa continuar rodando):

```bash
cd FrontEnd
npm install
npm run dev
```

> **Dois terminais abertos, um em cada pasta.** É assim que se toca as duas pontas ao mesmo tempo.

---

## Portas e endereços

| O quê | Endereço | Observação |
|---|---|---|
| API | `http://localhost:8000` | Uvicorn |
| Documentação da API | `http://localhost:8000/docs` | Gerada automaticamente. Dá para testar os endpoints sem front nenhum. |
| Frontend | `http://localhost:5173` | Servidor de desenvolvimento do Vite |

### Diferença importante entre os dois servidores

O **Uvicorn** é um servidor de verdade — ele também existirá em produção, recebendo requisições e devolvendo JSON.

O servidor do **Vite** só existe na sua máquina, enquanto você programa. Ele traduz o JSX (que o navegador não entende) para JavaScript comum e vigia os arquivos para atualizar a página sozinho. Em produção, roda-se `npm run build`, o Vite gera uma pasta `dist/` com HTML/CSS/JS puros, e o servidor de desenvolvimento não é mais usado.

---

## Testando no celular

Por padrão os dois servidores escutam apenas em `localhost`, ou seja: só a própria máquina enxerga. Digitar `localhost:5173` no celular faz o celular procurar um servidor **nele mesmo** e não achar nada.

Para expor na rede local:

```bash
# Frontend
npm run dev -- --host

# Backend
uvicorn main:app --reload --host 0.0.0.0
```

O Vite vai imprimir também um endereço do tipo `http://192.168.x.x:5173`. Esse é o IP da máquina no Wi-Fi — abra **esse** endereço no navegador do celular.

**Requisitos:** celular e computador na mesma rede Wi-Fi.

**Atenção:** quando o front rodar no celular, as chamadas para a API também não podem usar `localhost` — precisam apontar para `http://192.168.x.x:8000`.

> Sobre o `--` duplo em `npm run dev -- --host`: o primeiro `--` avisa o npm que o resto dos argumentos é para o comando, não para ele.

---

## O que não vai para o Git

| Pasta / arquivo | Motivo |
|---|---|
| `venv/` | Enorme e específica da máquina. Reconstruída com `pip install -r requirements.txt`. |
| `node_modules/` | Milhares de arquivos, centenas de MB. Reconstruída com `npm install`. |
| `dist/` | Gerada pelo build, não é código-fonte. |
| `__pycache__/`, `*.pyc` | Cache do Python. |
| `.env` | **Segredos.** Senha de banco no GitHub é acidente sério. |

O que **vai** para o Git e garante que todos rodem a mesma coisa:

- `requirements.txt` — dependências do Python com versão travada
- `package.json` — dependências do Node
- `package-lock.json` — trava as versões exatas do front

> Se `node_modules` ou `venv` entrarem no histórico por acidente, remover depois dá trabalho de verdade — o Git guarda o histórico mesmo após a exclusão, e o repositório fica pesado para sempre. **Sempre confira `git status` antes do primeiro commit.**

### Por que existem vários `.gitignore`

O Git lê o `.gitignore` da raiz **e** o de cada subpasta, somando as regras. Não competem: se qualquer um mandar ignorar, está ignorado.

- **raiz** — rede de segurança do projeto todo (inclui `.env` e `__pycache__`, que nenhum outro cobre)
- **`FrontEnd/.gitignore`** — criado pelo Vite, cobre `node_modules/` e `dist/`
- **`BackEnd/venv/.gitignore`** — criado pelo Python, protege o próprio venv

O da raiz é indispensável porque o do venv está *dentro* do venv: se alguém apagar a pasta para recriar o ambiente, o guarda-costas vai junto.

---

## Variáveis de ambiente

Ainda não existem — serão criadas quando entrar banco de dados ou autenticação.

Quando chegar a hora:

1. Criar `BackEnd/.env` com os valores reais (fica só na sua máquina)
2. Criar `BackEnd/.env.example` com as chaves **vazias**, esse sim versionado
3. Quem clonar copia o `.env.example` para `.env` e preenche

O `.env` fica em `BackEnd/`, não na raiz, porque o Python procura a partir da pasta de onde o processo é executado — e o Uvicorn sobe de dentro de `BackEnd/`.

**No frontend é diferente:** variáveis do Vite ficam em `FrontEnd/.env` e precisam começar com `VITE_` (ex.: `VITE_API_URL=http://localhost:8000`). Elas acabam dentro do JavaScript que o navegador baixa, então **nunca coloque segredo ali** — só coisa pública, como a URL da API.

---

## Fluxo de trabalho em grupo

### Antes de codar: combinar o contrato dos dados

Meia hora sem código, decidindo o formato dos objetos que circulam entre front e back. Por exemplo:

```json
{ "id": 1, "nome": "...", "valor": 0, "data": "2026-08-23" }
```

Esse objeto é o **contrato**. Depois dele, cada um trabalha sozinho sem precisar perguntar nada, porque todo mundo sabe o que vai chegar e o que precisa entregar.

### Dividir por funcionalidade, não por camada

"Fulano faz o front, Beltrano faz o back" trava todo mundo: um espera o outro e ninguém consegue testar. O certo é cada pessoa pegar uma **fatia vertical** — tela + lógica + dados de uma funcionalidade — e ser dona daqueles arquivos. Menos conflito no Git e cada um consegue rodar a própria parte de ponta a ponta.

### Como levantar a lista de tarefas

Escrever o app em frases de usuário, uma linha cada: "o usuário cadastra um item", "o usuário vê a lista", "o usuário apaga um item". Cada frase vira uma tarefa. Se uma frase for grande demais para uma pessoa, é porque na verdade são duas.

Marcar quais 3 ou 4 frases fazem o app existir — essas primeiro, o resto é bônus.

### Regras práticas

- **Dados falsos desde o primeiro dia.** Um array fixo com 3 ou 4 registros. Quem faz a tela não fica esperando o banco existir.
- **Subir o FastAPI primeiro** e usar o `/docs` para ver o formato exato do JSON. Quem faz o front constrói olhando para aquilo, e não há surpresa na integração.
- **Integrar todo dia**, nunca na véspera. Integração no último dia é onde projeto de faculdade morre.
- **Rodar `pip freeze > requirements.txt`** toda vez que alguém instalar uma dependência nova, e commitar.
- **Conferir `git status`** antes de commitar.

---

## Problemas comuns

**`cd FrontEnd` diz que a pasta não existe**
Você está dentro de `BackEnd/`. Os caminhos são relativos à pasta atual. Use `cd ..\FrontEnd`.

**O terminal não aceita comandos**
O servidor (Uvicorn ou Vite) ocupa o terminal enquanto roda — o que você digita vai para ele, não para o PowerShell. Use **Ctrl+C** para derrubar, ou abra outro terminal no **+** do VS Code.

**VS Code acusa erro de import no `main.py`**
Ele não achou o interpretador. `Ctrl+Shift+P` → "Python: Select Interpreter" → escolher o de `./BackEnd/venv/`.

**Aparece `(venv)` num terminal onde você quer usar npm**
A extensão Python do VS Code ativa o venv sozinho em terminais novos. Rode `deactivate`. Não é fatal (o Node ignora), mas confunde.

**"Error refreshing packages" no VS Code**
Aviso da extensão Python, não do pip. Confira com `pip list` — se as bibliotecas estiverem lá, pode ignorar.

**As chamadas do front para a API falham sem erro claro**
É CORS. O navegador bloqueia uma página de uma origem chamar outra origem, e `:5173` e `:8000` são origens diferentes. Já está resolvido no `main.py` — veja `BackEnd/README.md`.