from fastapi import models

class Elder(models.BaseModel):
    id: int
    userId: int
    nome: str
    telefone: str
    email: str
    senha: str
    data_nascimento: str
    doencas: str
    alergias: str
    medicamentos: str
    historico_acidentes: str
    observacoes: str