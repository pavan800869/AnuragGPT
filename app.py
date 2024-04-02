from flask import Flask, render_template, request, url_for, jsonify
import requests
from openai import OpenAI

app = Flask(__name__)
client = OpenAI(api_key='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')
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/chat", methods=['POST', 'GET'])
def chat():
    user_message = request.form['message']
    bot_response = get_bot_response(user_message)
    return jsonify({'message': bot_response})

def get_bot_response(user_message):
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": user_message},
    ]
    )
    return response.choices[0].message.content
if __name__=="__main__":
    app.run(debug=True)