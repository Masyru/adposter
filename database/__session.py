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
                        type_offer   INTEGER,
                        title        VARCHAR,
                        firm         VARCHAR,
                        model        VARCHAR,
                        description  TEXT,
                        year         INTEGER,
                        volume       INTEGER,
                        fuel_type    VARCHAR,
                        transmission VARCHAR,
                        probegrf     INTEGER,
                        probeg       INTEGER,
                        rul          VARCHAR,
                        privod       VARCHAR,
                        pts_record   VARCHAR,
                        used         VARCHAR,
                        price        INTEGER,
                        currency     VARCHAR,
                        s_presence   VARCHAR,
                        location     VARCHAR,
                        photos       VARCHAR,
                        date         VARCHAR,
                        dvs          STRING  DEFAULT NULL,
                        UD           STRING  DEFAULT NULL,
                        FB           STRING  DEFAULT NULL,
                        LR           STRING  DEFAULT NULL,
                        kuzov        STRING  DEFAULT NULL,
                        oem          STRING  DEFAULT NULL,
                        producer     STRING  DEFAULT NULL,
                        engine       STRING  DEFAULT NULL,
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
