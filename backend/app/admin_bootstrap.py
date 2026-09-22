"""Cria/sincroniza o admin na subida da API.

Existe porque os planos sem Shell e sem Pre-Deploy Command nao tem onde rodar
`python -m app.seed`: rodar o seed como processo separado no Start Command sobe
um segundo query engine do Prisma e estoura a memoria da instancia free. Aqui
reaproveitamos a conexao que a API ja abriu no lifespan.
"""

import logging
import os

from app.database import db
from app.security import hash_password

logger = logging.getLogger("uvicorn.error")


async def sync_admin_from_env() -> None:
    email = (os.getenv("SEED_ADMIN_EMAIL") or "").strip().lower()
    senha = os.getenv("SEED_ADMIN_PASSWORD")
    nome = os.getenv("SEED_ADMIN_NOME", "Administrador")

    if not email or not senha:
        return

    try:
        # Busca sem diferenciar maiusculas: um registro gravado com outra grafia
        # seria invisivel para find_unique e quebraria o create (email e unico).
        existing = next(
            (a for a in await db.admin.find_many() if a.email.strip().lower() == email),
            None,
        )
        if existing:
            await db.admin.update(
                where={"email": existing.email},
                data={"email": email, "senha": hash_password(senha), "nome": nome},
            )
            logger.info("Admin %s atualizado a partir de SEED_ADMIN_*.", email)
        else:
            await db.admin.create(data={"email": email, "senha": hash_password(senha), "nome": nome})
            logger.info("Admin %s criado a partir de SEED_ADMIN_*.", email)
    except Exception:
        # Um problema aqui nao pode impedir a API de subir.
        logger.exception("Falha ao sincronizar o admin a partir de SEED_ADMIN_*.")
