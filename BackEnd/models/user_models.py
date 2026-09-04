from pydantic import BaseModel


class UserCreate(BaseModel):
    nome: str
    email: str
    email_verificado: bool
    criado_em: str
    senhaHash: str
    status: str
    ultimo_login: str
    role: str


class User(UserCreate):
    id: int