# clone-tabnews

Implementação do https://www.tabnews.com.br para o https://curso.dev

## Infra

Subir banco de dados local (em modo detached)

```
docker compose -f infra/compose.yaml up -d
```

Para se conectar no banco de dados local:

```
psql --host=localhost --port=5432 --user=postgres
```
