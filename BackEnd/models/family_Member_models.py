from fastapi import models

class FamilyMember(models.BaseModel):
    id: int
    userId: int
    nome: str
    telefone: str
    email: str
    grau_parentesco: str
    observacoes: str