import asyncio
import os
import sys

from app.database import connect_db, disconnect_db, db
from app.security import hash_password


async def main() -> None:
    email = os.getenv("SEED_ADMIN_EMAIL", "admin@dynamuscapital.com.br").strip().lower()
    senha = os.getenv("SEED_ADMIN_PASSWORD")
    nome = os.getenv("SEED_ADMIN_NOME", "Administrador")

    if not senha:
        print("Defina SEED_ADMIN_PASSWORD no ambiente antes de rodar o seed.")
        sys.exit(1)

    await connect_db()
    try:
        # Busca sem diferenciar maiusculas: um registro antigo gravado com outra
        # grafia seria invisivel para find_unique e quebraria o create (email e unico).
        existing = next(
            (a for a in await db.admin.find_many() if a.email.strip().lower() == email),
            None,
        )
        if existing:
            # Sincroniza a senha com a variavel de ambiente: sem isso, trocar
            # SEED_ADMIN_PASSWORD nao tem efeito e o login fica com a senha antiga.
            await db.admin.update(
                where={"email": existing.email},
                data={"email": email, "senha": hash_password(senha), "nome": nome},
            )
            print(f"Admin {email} atualizado (senha sincronizada com SEED_ADMIN_PASSWORD).")
        else:
            await db.admin.create(data={"email": email, "senha": hash_password(senha), "nome": nome})
            print(f"Admin {email} criado com sucesso.")

        todos = await db.admin.find_many()
        print("Admins no banco:", ", ".join(a.email for a in todos))
    finally:
        await disconnect_db()


if __name__ == "__main__":
    asyncio.run(main())
