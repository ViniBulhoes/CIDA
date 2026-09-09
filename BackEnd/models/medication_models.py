from pydantic import BaseModel

class MedcationCreate(BaseModel):
    userId: int
    nome: str
    dosagem: str
    frequencia: str
    horario: str
    observacoes: str

class Medication(MedcationCreate):
    id: int