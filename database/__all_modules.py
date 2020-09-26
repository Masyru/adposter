import datetime
import sqlalchemy
from sqlalchemy.orm.session import Session
from .__session import SqlAlchemyBase
from hashlib import sha256
from werkzeug.security import check_password_hash, generate_password_hash
from time import time


class Login(SqlAlchemyBase):
    __tablename__ = 'logins'
    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True, unique=True)
    login = sqlalchemy.Column(sqlalchemy.String, unique=True)
    hashed_password = sqlalchemy.Column(sqlalchemy.String)
    date = sqlalchemy.Column(sqlalchemy.String, default=datetime.datetime.now)

    @staticmethod
    def check_login(session: Session, login, password) -> bool:
        account = session.query(Login).filter(Login.login == login).first()
        return check_password_hash(account.hashed_password, password)


class Cookie(SqlAlchemyBase):
    __tablename__ = 'cookies'
    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True, unique=True)
    cookie = sqlalchemy.Column(sqlalchemy.String, unique=True)
    date = sqlalchemy.Column(sqlalchemy.String, default=datetime.datetime.now)

    @staticmethod
    def get_by_cookie(session: Session, find_cookie) -> object:
        found = session.query(Cookie).filter(Cookie.cookie == find_cookie).first()
        return {
            'id': found.id,
            'cookie': found.cookie,
            'date': found.date
        }

    @staticmethod
    def create_cookie(session: Session):
        try:
            cookie = Cookie()
            cookie.cookie = str(sha256(str(time()).split('.')[0].encode('utf-8')).hexdigest())[:12]
            session.add(cookie)
            session.commit()
            return cookie.cookie
        except Exception as err:
            return None

    @staticmethod
    def check_cookie(session: Session, hash_string) -> bool:
        c = session.query(Cookie).filter(Cookie.cookie == hash_string).first()
        if c is None:
            return False
        return True

    @staticmethod
    def delete_cookie(session: Session, hash_string) -> bool:
        c = session.query(Cookie).filter(Cookie.cookie == hash_string).first()
        if c is None:
            return False
        session.delete(c)
        session.commit()
        return True




