# backend-bootstrap

- Express с разными middleware для CSP, логгирования, сессий.
- Postgres (knex как сборщик запросов, sequelize как ORM).
- Авторизация на Passport + социальная авторизация через Google.

Развертка на Heroku:
1. Добавить репозиторий.
2. Добавить Postgres, убедиться, что в Config Vars добавился DATABASE_URL.
3. TESTING_MODE = TRUE добавляет доп. проверки, выводы в консоль, что всё подключилось и всё норм.
4. Конфигурируем переменные окружения SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL.
5. Зайти и запустить файлы миграции из папки ./build/src/migrations/ по порядку (кроме build-*).

Развертка для дева:
1. Склонировать, npm install.
2. Скопировать configs/development.example.env в configs/development.env
3. Запустить миграции из src/migrations/

#### Разработка
- **npm run dev** -- запускает дев .
- **npm run build** -- запускает build:backend && build:frontend.
- **npm run start** -- запускает собранный бэк.

#### Конфиг
В /config/ есть конфиги, они коммитятся, в них можно добавлять разные несекретные настройки. Секретные это db credentials, google auth id, etc.

- Дев: добавляем в /config/development.env.
- Prod: добавляем в переменные окружения.
