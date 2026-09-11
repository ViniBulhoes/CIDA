from pydantic import BaseModel
from typing import Literal
class UserRegistration(BaseModel):
    # Campos comuns
    nome: str
    email: str
    senha: str
    role: Literal ["elder", "caregiver", "family_member"]
    telefone: str

    # idoso
    data_nascimento: str | None = None

    # Cuidador
    vinculo: str | None = None
    especializacao: str | None = None
    observacoes: str | None = None
    rotinas: str | None = None