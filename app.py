from flask import Flask, render_template, request, jsonify
from therapist import Therapist

app = Flask(__name__,template_folder='templates')
therapist = Therapist()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    message = request.form['user_input']
    response = therapist.get_response(message)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)

