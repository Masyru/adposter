import datetime
from flask import Flask, render_template, flash, redirect, url_for, request, g, make_response, abort
from database.__all_modules import Login, Cookie
from database import __session
from json import dumps
from time import time
import os

# Init app
app = Flask(__name__,
            static_url_path='/public/',
            static_folder='frontend/static/',
            template_folder='frontend/templates/')
app.permanent_session_lifetime = datetime.timedelta(days=30)

# Init db
__session.global_init("./database/database.db")
session = __session.create_session()


@app.route('/check_cookie/<string:current_session>', methods=['GET'])
def check_cookie(current_session):
    res = Cookie.check_cookie(session, current_session)
    return dumps(res)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        login = request.form['login']
        password = request.form['password']
        if Login.check_login(session, login, password):
            cookie = Cookie.create_cookie(session)
            if cookie is None:
                return redirect(url_for('index'))
            red = redirect(url_for('dashboard'))
            red.set_cookie('token', cookie, max_age=60 * 60 * 24 * 30)
            return red
    elif request.method == 'GET':
        return render_template('login.html')
    else:
        return abort(404)


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('index.html', title='Доска объявлений / AdPoster', path='/public/js/dashboard.js')


@app.route('/library', methods=['GET'])
def library():
    return render_template('index.html', title='Библиотека фото / AdPoster', path='/public/js/library.js')


@app.route('/account', methods=['GET'])
def account():
    return render_template('index.html', title='Учетные записи / AdPoster', path='/public/js/account.js')


@app.route('/offer/<string:cookie>', methods=['GET'])
def offer(cookie):
    if request.method == 'GET':
        existed = Cookie.check_cookie(session, cookie)
        if not existed:
            return redirect(url_for('index'))
        return render_template('offer.html')


def main():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)


if __name__ == '__main__':
    main()
