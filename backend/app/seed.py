import asyncio
import os
import sys

from app.database import connect_db, disconnect_db, db
from app.security import hash_password


async def main() -> None:
    email = os.getenv("SEED_ADMIN_EMAIL", "admin@dynamuscapital.com.br")
    senha = os.getenv("SEED_ADMIN_PASSWORD")
    nome = os.getenv("SEED_ADMIN_NOME", "Administrador")

    if not senha:
        print("Defina SEED_ADMIN_PASSWORD no ambiente antes de rodar o seed.")
        sys.exit(1)

    await connect_db()
    try:
        existing = await db.admin.find_unique(where={"email": email})
        if existing:
            print(f"Admin {email} já existe.")
        else:
            await db.admin.create(data={"email": email, "senha": hash_password(senha), "nome": nome})
            print(f"Admin {email} criado com sucesso.")
    finally:
        await disconnect_db()


if __name__ == "__main__":
    asyncio.run(main())
