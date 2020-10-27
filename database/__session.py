import sqlalchemy as sa
import sqlalchemy.orm as orm
from sqlalchemy.orm import Session
import sqlalchemy.ext.declarative as dec
import sqlite3 as sq
import os

SqlAlchemyBase = dec.declarative_base()

__factory = None


def create_session() -> Session:
    global __factory
    return __factory()


def global_init(db_file):
    global __factory

    if __factory:
        return

    if not db_file or not db_file.strip():
        raise Exception("Необходимо указать файл базы данных.")
    if not os.path.exists(db_file):
        file = open(db_file, 'w')
        file.close()
        conn = sq.connect(db_file)
        cur = conn.cursor()
        cur.execute("""CREATE TABLE cookies (
                        id     INTEGER PRIMARY KEY AUTOINCREMENT
                                       UNIQUE,
                        cookie STRING  UNIQUE,
                        date   STRING
                    );""")
        cur.execute("""CREATE TABLE logins (
                        id              INTEGER PRIMARY KEY AUTOINCREMENT
                                                UNIQUE,
                        login           STRING  UNIQUE,
                        hashed_password STRING,
                        date            STRING
                    );""")
        cur.execute("""CREATE TABLE offers (
                        id           INTEGER NOT NULL,
                        firm         STRING  DEFAULT NULL,
                        model        STRING  DEFAULT NULL,
                        year         STRING  DEFAULT NULL,
                        title        STRING  DEFAULT NULL,
                        description  TEXT    DEFAULT NULL,
                        type_offer   INT,
                        rul          STRING  DEFAULT NULL,
                        volume       INT     DEFAULT NULL,
                        fuel_type    STRING  DEFAULT NULL,
                        transmission STRING  DEFAULT NULL,
                        probegrf     INT     DEFAULT (0),
                        probeg       INT     DEFAULT (0),
                        privod       STRING  DEFAULT NULL,
                        pts_record   STRING  DEFAULT NULL,
                        used         STRING  DEFAULT NULL,
                        price        INT     DEFAULT (0),
                        currency     STRING  DEFAULT ('RUB'),
                        s_presence   STRING  DEFAULT ('в наличии'),
                        location     STRING  DEFAULT ('Владивосток'),
                        photos       STRING  DEFAULT NULL,
                        date         STRING,
                        PRIMARY KEY (
                            id
                        ),
                        UNIQUE (
                            id
                        )
                    );""")
        conn.commit()
        conn.close()


    conn_str = f'sqlite:///{db_file.strip()}?check_same_thread=False'
    print(f"Подключение к базе данных по адресу {conn_str}")

    engine = sa.create_engine(conn_str, echo=False)
    __factory = orm.sessionmaker(bind=engine)

    SqlAlchemyBase.metadata.create_all(engine)
    print("Connection was reached")
