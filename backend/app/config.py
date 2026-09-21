from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str
    jwt_secret: str
    jwt_expire_minutes: int = 480
    cors_origins: str = "http://localhost:3000"

    cpf_lookup_url: str | None = None
    cpf_lookup_api_key: str | None = None
    # CNPJ funciona sem contratar nada (BrasilAPI); só troque se quiser outro provedor
    cnpj_lookup_url: str = "https://brasilapi.com.br/api/cnpj/v1"
    placa_lookup_url: str | None = None
    placa_lookup_api_key: str | None = None

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
