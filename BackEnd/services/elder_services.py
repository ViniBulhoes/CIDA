import BackEnd.models.elder_models as elder_models


idosos = []
contador_id = 1


def listar_idosos():
    return idosos


def criar_idoso(idoso: elder_models.ElderCreate):
    global contador_id

    novo_idoso = elder_models.Elder(
        id=contador_id,
        **idoso.model_dump()
    )

    contador_id += 1
    idosos.append(novo_idoso)
    return novo_idoso


def get_idoso_por_id(idoso_id: int):
    for idoso in idosos:
        if idoso.id == idoso_id:
            return idoso
    return None


def atualizar_idoso(
    idoso_id: int,
    idoso_atualizado: elder_models.Elder
):
    for index, idoso in enumerate(idosos):
        if idoso.id == idoso_id:
            idoso_atualizado.id = idoso_id
            idosos[index] = idoso_atualizado
            return idoso_atualizado
    return None


def deletar_idoso(idoso_id: int):
    for index, idoso in enumerate(idosos):
        if idoso.id == idoso_id:
            del idosos[index]
            return True
    return False


def medicamentos_por_idoso(idoso_id: int):
    idoso = get_idoso_por_id(idoso_id)

    if idoso:
        return idoso.medicamentos

    return None