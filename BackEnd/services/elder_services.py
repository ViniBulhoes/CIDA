import BackEnd.models.elder_models as elder_models

elders = []
contador_id = 1

def listar_idosos():
    return elders

def criar_idoso(idoso: elder_models.ElderCreate):
    global contador_id

    novo_elder = elder_models.Elder(
        id = contador_id,
        **idoso.model_dump()
    )

    contador_id += 1
    elders.append(novo_elder)
    return novo_elder

def get_elder_por_id(elder_id: int):
    for elder in elders:
        if elder.id == elder_id:
            return elder
    return None

def atualizar_elder(elder_id: int, elder_atualizado: elder_models.Elder):
    for index, elder in enumerate(elders):
        if elder.id == elder_id:
            elder_atualizado.id = elder_id
            elders[index] = elder_atualizado
            return elder_atualizado
    return None

def deletar_elder(elder_id: int):
    for index, elder in enumerate(elders):
        if elder.id == elder_id:
            del elders[index]
            return True
    return False