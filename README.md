# backend-bootstrap

Развертка на Heroku:
1. Добавить репозиторий.
2. Добавить Postgres, убедиться, что в Config Vars добавился DATABASE_URL.
3. TESTING_MODE = TRUE добавляет доп. проверки, выводы в консоль, что всё подключилось и всё норм.
4. Конфигурируем SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL.