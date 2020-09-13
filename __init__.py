import datetime
from flask import Flask, request, render_template, url_for
from json import dumps
from time import time

app = Flask(__name__,
            static_url_path='/public/',
            static_folder='frontend/static/',
            template_folder='frontend/templates/')
app.permanent_session_lifetime = datetime.timedelta(days=30)


LOGIN, PASSWORD = 'admin', 'admin'


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@app.route('/main', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        login = request.form['login']
        password = request.form['password']
        if login == LOGIN and password == PASSWORD:
            return render_template('index.html', title='Доска объявлений / AdPoster', path='/public/js/dashboard.js')
    return render_template('login.html')


@app.route('/dashboard', methods=['GET'])
def dashboard():
    return render_template('index.html', title='Доска объявлений / AdPoster', path='/public/js/dashboard.js')


@app.route('/library', methods=['GET'])
def library():
    return render_template('index.html', title='Библиотека фото / AdPoster', path='/public/js/library.js')


@app.route('/account', methods=['GET'])
def account():
    return render_template('index.html', title='Учетные записи / AdPoster', path='/public/js/account.js')


@app.route('/offer', methods=['GET'])
def offer():
    return render_template('offer.html')


def main():
    app.run(host='0.0.0.0', port='8000', debug=True)


if __name__ == '__main__':
    main()