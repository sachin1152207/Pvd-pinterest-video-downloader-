import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, render_template, url_for, request

app = Flask(__name__)
app.secret_key = "7db200abe961fd8cdbcd552b543f43b9650bf253"


def get_url(url):
    for link in BeautifulSoup(
            requests.post('https://www.expertstrick.com/download.php',
                          data={
                              'url': url
                          }).text, 'html.parser').find_all('a'):
        if link['href'][0:28] == "https://v.pinimg.com/videos/":
            return link['href']


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        return render_template('index.html'), 200


@app.route('/api', methods=['GET', 'POST'])
def api():
    if request.method == "POST":
        videoUrl = request.get_json()
        link = get_url(videoUrl['videoUrl'])
        if link == None:
            return jsonify({'status': '404'})
        else:

            return jsonify({'status': '200', 'downloadlink': link}), 200


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")