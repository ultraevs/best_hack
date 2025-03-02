# BestHack
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Python](https://img.shields.io/badge/python-%23007ACC.svg?style=for-the-badge&logo=python&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Figma](https://img.shields.io/badge/figma-%2320232a.svg?style=for-the-badge&logo=figma)


# [Ссылка на готовое решение](https://shmyaks.ru/)

### Трек: Система для онлайн-продаж лотов топлива


## Используемый стек технологий:
- [Python-Backend](https://github.com/ultraevs/best_hack/tree/main/python-backend) - Реализован с использванием [Python](https://www.python.org/) и фреймворка [FastAPI](https://fastapi.tiangolo.com/). Задачей модуля является реализация API для взаимодействия с frontend модулем, а также парсера csv файлов лотов.
- [Frontend](https://github.com/ultraevs/best_hack/tree/main/app) - Реализован с использованием [React](https://ru.legacy.reactjs.org/). Задачай является предоставление красивого и функционалоного интерфейса для пользователя.
- [Deployment](https://github.com/ultraevs/best_hack/tree/main/deployment) - Реализован с использованием [Docker-Compose](https://www.docker.com/). Задачей модуля является возможность быстрого и безошибочного развертывания приложения на любом сервере.


## Функционал решения

- Регистрация/Аутентификация пользователей.
- Unit Тесты
- Подгрузка лотов из импортируемых csv файлов
- Возможность фильтрации и поиска необохдимых лотов
- Оформление заказа и историй заказов пользователя
## Запуск решения
```sh
    cd best_hack/deployment
    docker-compose build
    docker-compose up -d
```
#### Необходимо создать .env файлы в папке python-backend, в котором должны содержаться ваши данные о базе данных и ftp доступе. Также в вашем nginx и postgresql на сервере нужно указать те же порты что и в коде(местами из .env)

##  Состав команды
 - Михаил Евсеев - Backend Developer
 - Артем Брежнев - UX/UI Designer
 - Костя Цой - Frontend Developer
 - Глеб Таланцев - Frontend Developer and Project Manager

## Итог
За 24 часа наша команда полностью реализовала поставленную задачу. Все описанные в тз условия были выполнены, а также дополнены нами. В итоговом решении сделаны: импорт лотов из csv файла; использован ftp протокол для импорта; а также реализован быстрый вариант загрузки на сервер через ручку на сайте; полностью работает поисковая строка а также мультиселекторные фильтры в главной странице; реализоавн функционал оформления заказа; для личного кабинета реализована информация о пользователе, а также история его заказов, с возможностью отменить их

## Перспективы
 - Обратная связь:
Сбор обратной связи и поддержка клиентов, с помощью бота или почты

 - Адаптивность:
Возможность пользоваться сервисом на всех устрйоствах

 - Логистика:
Подключение сервисов расчета доставки для упрощения получения топлива клиентами

## Качество кода
Для повышения читаемости и качества кода

на стороне бекенда были реализованы: 
 - логирование
 - обработка ошибок
 - соблюдение PEP8 и понятной структуры кода
 - unit тесты
   
на стороне фронтенда:
 - использовали TypeScript
 - модульная архитектура
 - понятный нейминг компонентов и файлов
 - легко расширяемая архитектура

## Мок-Структуры

#### Пример CSV файла
```csv
date,ksss_nb_code,ksss_fuel_code,start_weight,available_volume,status,lot_price,price_per_ton
2023-10-01,101,95,5000,5000,Подтвержден,2500000,500
2023-10-01,102,92,3000,3000,Подтвержден,1500000,500
2023-10-02,101,98,4000,4000,Подтвержден,2000000,500
```

#### Пример классификатора КССС кодов

```
def decode_ksss_nb_code(ksss_nb_code: int) -> str:
    nb_name_map = {
        101: "Нефтебаза_1/СПБ",
        102: "Нефтебаза_2/Москва",
    }
    return nb_name_map.get(ksss_nb_code, "Неизвестная нефтебаза")

def decode_ksss_fuel_code(ksss_fuel_code: int) -> str:
    fuel_type_map = {
        95: "АИ-95",
        92: "АИ-92",
        100: "АИ-100",
        98: "АИ-98",
        951: "АИ-95 Экто",
        921: "АИ-92 Экто",
        00: "ДТ"
    }
    return fuel_type_map.get(ksss_fuel_code, "Неизвестное топливо")
```
