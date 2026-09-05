import BackEnd.models.user_models as user_models

def home ():
    return {"message": "API em funcionamento!"} 

usuarios = []
contador_id = 1

def listar_usuarios():
    return usuarios

def criar_usuario(usuario: user_models.UserCreate):
    global contador_id

    novo_usuario = user_models.User(
        id = contador_id,
        **usuario.model_dump()
    )

    contador_id += 1
    usuarios.append(novo_usuario)
    return novo_usuario

def get_usuario_por_id(usuario_id: int):
    for usuario in usuarios:
        if usuario.id == usuario_id:
            return usuario
    return None

def atualizar_usuario(usuario_id: int, usuario_atualizado: user_models.User):
    for index, usuario in enumerate(usuarios):
        if usuario.id == usuario_id:
            usuario_atualizado.id = usuario_id
            usuarios[index] = usuario_atualizado
            return usuario_atualizado
    return None

def deletar_usuario(usuario_id: int):
    for index, usuario in enumerate(usuarios):
        if usuario.id == usuario_id:
            del usuarios[index]
            return True
    return False

