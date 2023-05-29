from flask import Flask
from view import api_blueprint
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    with app.app_context():
        from dbconnection.db import db, migrate
        db.init_app(app)
        db.create_all()
        migrate.init_app(app, db)

    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app

app = create_app()


if __name__ == '__main__':
    app.run(use_reloader=True, port=4000)