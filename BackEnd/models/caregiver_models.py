from fastapi import models

class Caregiver(models.BaseModel):
    id: int
    userId: int
    nome: str
    telefone: str
    email: str
    vinculo: str
    especializacao: str
    observacoes: str
    rotinas: str
    