from fastapi import APIRouter, HTTPException, status
from schemas import user_schemas
from services import user_services

router = APIRouter()

@router.post("/users", status_code = status.HTTP_201_CREATED)
def criar_usuario(registro: user_schemas.UserRegistration):
    try:
        return user_services.criar_usuario(registro)
    except ValueError as error:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = str(error),
        ) from error

@router.get("/users")
def listar_usuarios():
    return user_services.listar_usuarios()

@router.delete("/users/{usuario_id}")
def deletar_usuario(usuario_id: int):
    return user_services.deletar_usuario(usuario_id)