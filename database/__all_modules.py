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
    def add_account(session: Session, login, password) -> None:
        a = Login()
        a.login = login
        a.hashed_password = generate_password_hash(password)
        session.add(a)
        session.commit()

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


class Offer(SqlAlchemyBase):
    __tablename__ = 'offers'
    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True, unique=True)
    type_offer = sqlalchemy.Column(sqlalchemy.Integer, default=None)
    title = sqlalchemy.Column(sqlalchemy.String, default='')
    firm = sqlalchemy.Column(sqlalchemy.String, default='')
    model = sqlalchemy.Column(sqlalchemy.String, default='')
    description = sqlalchemy.Column(sqlalchemy.Text, default='')
    year = sqlalchemy.Column(sqlalchemy.Integer, default=None)
    volume = sqlalchemy.Column(sqlalchemy.Integer, default=None)
    fuel_type = sqlalchemy.Column(sqlalchemy.String, default='бенз.')
    transmission = sqlalchemy.Column(sqlalchemy.String, default='авт.')
    probegrf = sqlalchemy.Column(sqlalchemy.Integer, default=0)
    probeg = sqlalchemy.Column(sqlalchemy.Integer, default=0)
    rul = sqlalchemy.Column(sqlalchemy.String, default='Прав.')
    privod = sqlalchemy.Column(sqlalchemy.String, default='передний')
    pts_record = sqlalchemy.Column(sqlalchemy.String, default='с документами')
    used = sqlalchemy.Column(sqlalchemy.String, default='подержанный')
    price = sqlalchemy.Column(sqlalchemy.Integer, default=0)
    currency = sqlalchemy.Column(sqlalchemy.String, default='RUB')
    s_presence = sqlalchemy.Column(sqlalchemy.String, default='в наличии')
    location = sqlalchemy.Column(sqlalchemy.String, default='Владивосток')
    photos = sqlalchemy.Column(sqlalchemy.String, default='')
    date = sqlalchemy.Column(sqlalchemy.String, default=time)

    @staticmethod
    def add_auto(session, data):
        try:
            o = Offer()
            o.type_offer = 1 if data['auto_type'] == 'автомобиль' else 2
            o.title = data['title']
            o.description = data['description']
            o.firm = data['firm']
            o.model = data['model']
            o.year = int(data['year'])
            o.volume = int(data['volume'])
            o.fuel_type = data['fuel_type']
            o.transmission = data['transmission']
            o.probegrf = int(data['probegrf'])
            o.probeg = int(data['probeg'])
            o.rul = data['rul']
            o.privod = data['privod']
            o.pts_record = data['pts_record']
            o.used = data['used']
            o.price = int(data['price'])
            o.location = data['location']
            o.photos = ', '.join(data['photos'])
            session.add(o)
            session.commit()
            return True
        except Exception as err:
            print(err)
            return False

    @staticmethod
    def get_auto(session):
        o = session.query(Offer).filter(Offer.type_offer == 1).all()
        if o is None:
            return []
        resp = []
        for obj in o:
            resp.append({
                'title': obj.title,
                'type_offer': obj.type_offer,
                'description': obj.description,
                'firm': obj.firm,
                'model': obj.model,
                'year': obj.year,
                'volume': obj.volume,
                'fuel_type': obj.fuel_type,
                'transmission': obj.transmission,
                'probegrf': obj.probegrf,
                'probeg': obj.probeg,
                'rul': obj.rul,
                'privod': obj.privod,
                'pts_record': obj.pts_record,
                'used': obj.used,
                'price': obj.price,
                'location': obj.location,
                'photos': [] if len(obj.photos.split(',')) else obj.photos.split(','),
                'created_date': obj.date
            })
        resp.sort(key=lambda x: int(x['created_date']))
        return list(resp)

    @staticmethod
    def get_titles_via_image(session, image):
        o = session.query(Offer).filter(image in str(Offer.photos).split(',')).all()
        if o is None:
            return []
        resp = [obj.title for obj in o]
        return resp

    @staticmethod
    def delete_offer(session, _id):
        o = session.query(Offer).filter(Offer.id == _id).first()
        if o is None:
            return False
        session.delete(o)
        session.commit()
        return True

