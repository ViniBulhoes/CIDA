import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarUsuario } from '../services/api';
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [role, setRole] = useState('elder');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const [vinculo, setVinculo] = useState('');
  const [especializacao, setEspecializacao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [rotinas, setRotinas] = useState('');

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagemErro('');

    if (!nome.trim()) {
      setMensagemErro('Informe seu nome completo.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setMensagemErro('Informe um e-mail válido.');
      return;
    }

    if (!telefone.trim()) {
      setMensagemErro('Informe seu telefone.');
      return;
    }

    if (!senha || senha.length < 6) {
      setMensagemErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagemErro('As senhas não coincidem.');
      return;
    }

    if (role === 'elder' && !dataNascimento) {
      setMensagemErro('Informe a data de nascimento do idoso.');
      return;
    }

    const payload = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha,
      role,
      telefone: telefone.trim(),
      data_nascimento: dataNascimento || null,
      vinculo: vinculo.trim() || null,
      especializacao: especializacao.trim() || null,
      observacoes: observacoes.trim() || null,
      rotinas: rotinas.trim() || null,
    };

    try {
      setCarregando(true);

      console.log('Dados enviados para a API:', payload);

      await criarUsuario(payload);

      setSucesso(true);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setMensagemErro(
        error.message || 'Não foi possível criar a conta.',
      );
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
        <div className="w-full max-w-[420px] rounded-[32px] bg-slate-100 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check className="h-9 w-9 stroke-[3]" />
          </div>

          <h1 className="text-2xl font-black text-slate-900">
            Cadastro realizado!
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Sua conta foi criada com sucesso.
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 w-full rounded-2xl bg-emerald-600 px-4 py-3 font-extrabold text-white hover:bg-emerald-700"
          >
            Ir para o login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-0 sm:p-4">
      <div className="flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-slate-100 shadow-2xl sm:h-auto sm:min-h-[844px] sm:rounded-[44px] sm:border sm:border-slate-300">
        <header className="shrink-0 rounded-b-[36px] bg-[#15284B] px-6 pb-6 pt-8 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white hover:bg-white/20"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-emerald-400" />
              <span className="text-2xl font-black tracking-wider text-white">
                CIDA
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Criar sua conta
          </h1>

          <p className="text-sm font-medium text-slate-300">
            Preencha os campos abaixo para começar
          </p>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-5">
          <form className="space-y-3" onSubmit={handleSubmit}>
            {mensagemErro && (
              <div className="flex items-center gap-2 rounded-2xl border-2 border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{mensagemErro}</span>
              </div>
            )}

            <label className="block text-sm font-bold text-slate-800">
              Tipo de usuário
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="mt-1 w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                <option value="elder">Idoso</option>
                <option value="caregiver">Cuidador</option>
                <option value="family">Familiar</option>
              </select>
            </label>

            <label className="block text-sm font-bold text-slate-800">
              Nome completo
              <div className="relative mt-1">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 pl-12 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
            </label>

            <label className="block text-sm font-bold text-slate-800">
              E-mail
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 pl-12 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
            </label>

            <label className="block text-sm font-bold text-slate-800">
              Telefone
              <div className="relative mt-1">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 pl-12 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
            </label>

            <label className="block text-sm font-bold text-slate-800">
              Data de nascimento
              <div className="relative mt-1">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(event) =>
                    setDataNascimento(event.target.value)
                  }
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 pl-12 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
            </label>

            {(role === 'caregiver' || role === 'family') && (
              <>
                <input
                  type="text"
                  value={vinculo}
                  onChange={(event) => setVinculo(event.target.value)}
                  placeholder="Vínculo"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />

                <input
                  type="text"
                  value={especializacao}
                  onChange={(event) =>
                    setEspecializacao(event.target.value)
                  }
                  placeholder="Especialização"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />

                <textarea
                  value={observacoes}
                  onChange={(event) => setObservacoes(event.target.value)}
                  placeholder="Observações"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />

                <textarea
                  value={rotinas}
                  onChange={(event) => setRotinas(event.target.value)}
                  placeholder="Rotinas"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </>
            )}

            <label className="block text-sm font-bold text-slate-800">
              Senha
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input
                  type={showSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 pl-12 pr-12 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center text-slate-500"
                >
                  {showSenha ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            <label className="block text-sm font-bold text-slate-800">
              Confirmar senha
              <div className="relative mt-1">
                <CheckCircle className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input
                  type={showConfirmarSenha ? 'text' : 'password'}
                  value={confirmarSenha}
                  onChange={(event) =>
                    setConfirmarSenha(event.target.value)
                  }
                  placeholder="Digite a mesma senha"
                  className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 pl-12 pr-12 font-bold text-slate-900 outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmarSenha(!showConfirmarSenha)
                  }
                  className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center text-slate-500"
                >
                  {showConfirmarSenha ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={carregando}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {carregando ? 'Cadastrando...' : 'Concluir cadastro'}
              </span>
              {!carregando && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>
        </main>

        <footer className="shrink-0 border-t border-slate-200/80 bg-slate-50/50 p-4 text-center">
          <span className="text-xs font-medium text-slate-600">
            Já tem uma conta cadastrada?{' '}
          </span>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs font-bold text-blue-700 underline"
          >
            Entrar agora
          </button>
        </footer>
      </div>
    </div>
  );
}