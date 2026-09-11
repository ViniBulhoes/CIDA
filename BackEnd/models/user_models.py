from pydantic import BaseModel


class UserCreate(BaseModel):
    nome: str
    email: str
    senha: str
    role: str


class User(UserCreate):
    id: int