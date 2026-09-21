import { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

export function ConfigProvider({ children }) {
  // Lê do localStorage ao iniciar ou carrega os padrões
  const [config, setConfig] = useState(() => {
    const salvo = localStorage.getItem('@cida:config');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        // Fallback caso o dado esteja corrompido
      }
    }
    return {
      escalaTexto: 2, // 1: Normal, 2: Médio, 3: Grande, 4: Muito Grande
      notificacoes: true,
      alarmeAlto: true,
      localizacaoSOS: true,
      relatorioSemanal: true,
    };
  });

  // Salva automaticamente no localStorage sempre que houver alteração
  useEffect(() => {
    localStorage.setItem('@cida:config', JSON.stringify(config));
  }, [config]);

  // Função para atualizar uma chave específica
  const updateConfig = (chave, valor) => {
    setConfig((prev) => ({ ...prev, [chave]: valor }));
  };

  // Mapeamento de tamanho base de fonte
  const textScaleClasses = {
    1: 'text-[14px]',
    2: 'text-[16px]',
    3: 'text-[18px]',
    4: 'text-[20px]',
  };

  return (
    <ConfigContext.Provider 
      value={{ 
        config, 
        updateConfig, 
        textScaleClass: textScaleClasses[config.escalaTexto] || 'text-[16px]' 
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

// Hook de acesso fácil para qualquer página
export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig deve ser usado dentro de ConfigProvider');
  }
  return context;
}