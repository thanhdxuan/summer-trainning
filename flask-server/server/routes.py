from server import app


@app.route("/")
@app.route("/home")
def home():
    return {"name": "Thanh"}
