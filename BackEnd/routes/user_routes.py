from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from BackEnd.models.user_models import User

router = APIRouter()

@router.post("/users")
async def criar_usuario(user: User):

    return JSONResponse(content={"menssagem": "User created successfully", "user": user.dict()})