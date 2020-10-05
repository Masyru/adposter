from flask import Flask, render_template, flash, redirect, url_for, request, g, make_response, abort
from werkzeug.utils import secure_filename
from settings import UPLOADS, ALLOWED_EXTENSIONS
from database.__all_modules import Login, Cookie
from database import __session
from database.json_worker import open_file_serialize, save_json_to_file
from json import dumps, loads
import datetime
from time import time
import os


# Init app
app = Flask(__name__,
            static_url_path='/public/',
            static_folder='frontend/static/',
            template_folder='frontend/templates/')
app.config['UPLOAD_FOLDER'] = UPLOADS
app.permanent_session_lifetime = datetime.timedelta(days=30)
global_vars = open_file_serialize()
print(global_vars)

# Init db
__session.global_init("./database/database.db")
session = __session.create_session()


# check permission to upload file
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/check_cookie', methods=['GET'])
def check_cookie(token=None):
    if token is None:
        token = request.cookies.get('token')
    res = False
    if token is not None:
        res = Cookie.check_cookie(session, token)
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
            global_vars[str(cookie)] = {}
            save_json_to_file(global_vars)
            return red
    elif request.method == 'GET':
        return render_template('login.html')
    else:
        return abort(404)


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    return render_template('index.html', title='Доска объявлений / AdPoster', path='/public/js/dashboard.js', uploader=False)


@app.route('/library', methods=['GET'])
def library():
    if global_vars[str(request.cookies.get('token'))] is not None and global_vars[str(request.cookies.get('token'))]:
        global_vars[str(request.cookies.get('token'))] = False
        save_json_to_file(global_vars)
        return render_template('index.html', title='Библиотека фото / AdPoster', path='/public/js/library.js', success=True, uploader=True)
    return render_template('index.html', title='Библиотека фото / AdPoster', path='/public/js/library.js', success=False, uploader=True)


@app.route('/account', methods=['GET'])
def account():
    return render_template('index.html', title='Учетные записи / AdPoster', path='/public/js/account.js', uploader=False)


@app.route('/offer/<string:cookie>', methods=['GET'])
def offer(cookie):
    if request.method == 'GET':
        existed = Cookie.check_cookie(session, cookie)
        if not existed:
            return redirect(url_for('index'))
        return render_template('offer.html')


@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        existed = check_cookie(request.cookies.get('token'))
        if existed:
            files = request.files.getlist("file")
            for file in files:
                print(file)
                if file and allowed_file(file.filename):
                    try:
                        filename = f"{len(os.listdir(UPLOADS)) + 1}.{file.filename.rsplit('.', 1)[1]}"
                        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                        global_vars[str(request.cookies.get('token'))] = True
                        save_json_to_file(global_vars)
                    except Exception as err:
                        print(err)
                        continue
                else:
                    return dumps(False)
            return redirect(url_for('library'))
    return abort(404)


def main():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)


if __name__ == '__main__':
    main()
