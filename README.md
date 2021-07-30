# backend-bootstrap

- Express с разными middleware для CSP, логгирования, сессий, конфига.
- Postgres (knex как сборщик запросов, sequelize как ORM).
- Авторизация на Passport + социальная авторизация через Google.

Развертка на Heroku:
1. Добавить репозиторий.
2. Добавить Postgres, убедиться, что в Config Vars добавился DATABASE_URL.
3. TESTING_MODE = TRUE добавляет доп. проверки, выводы в консоль, что всё подключилось и всё норм.
4. Конфигурируем переменные окружения SESSION_SECRET (любая рандомная строка), GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL (получить тут https://console.cloud.google.com/apis/credentials).
5. Зайти и запустить файлы миграции из папки ./build/src/migrations/ по порядку (кроме build-*).

Развертка для дева:
1. Склонировать, npm install.
2. Скопировать configs/development.example.env в configs/development.env, добавить данные бд.
3. Запустить миграции из src/migrations/

#### Разработка
- **npm run dev** -- запускает дев.

- **npm run build** -- запускает build:backend && build:frontend.
- **npm run start** -- запускает собранный бэк.

#### Конфиг
В /config/ есть конфиги, их можно коммитить, в них разные несекретные настройки.

Секретные это db credentials, google auth id, etc, они добавляются:
- Дев: в /config/development.env.
- Prod: в переменные окружения.

Адрес БД: `postgresql://[user[:password]@][netloc][:port][,...][/dbname][?param1=value1&...]`