from fastapi import models

class User(models.BaseModel):
    id: int
    nome: str
    email: str
    email_verificado: bool
    criado_em: str
    senhaHash: str
    status: str
    ultimo_login: str
    role: str