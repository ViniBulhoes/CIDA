from pydantic import BaseModel

class MedicalRecordCreate(BaseModel):
    elder_id: int
    doencas: str
    alergias: str
    historico_acidentes: str
    observacoes: str

class MedicalRecord(MedicalRecordCreate):
    id: int
