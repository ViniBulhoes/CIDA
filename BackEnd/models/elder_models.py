from fastapi import models

class ElderCreate(models.BaseModel):
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

class Elder(ElderCreate):
    id: int