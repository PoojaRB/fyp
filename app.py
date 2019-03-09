from flask import Flask, render_template, request, jsonify
#import speechSynthesizer as ss
import pyttsx3


app = Flask(__name__)
def synthesize(toSpeak):
	engine = pyttsx3.init()
	en_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\MSTTS_V110_enIN_HeeraM"
	engine.setProperty('voice',en_voice_id)
	engine.setProperty('rate',220)
	engine.say(toSpeak)
	engine.runAndWait()

@app.route('/')
def hello():
	toSpeak = "Hello welcome"
	return render_template('chat.html',toSpeak=toSpeak)

@app.route("/ask", methods=['POST','GET'])
def ask():
	if request.method == 'POST':
		message = request.data.decode('utf-8')
		print(message)
		synthesize("you said "+message)
		return jsonify({'status':'OK','answer':"you said "+message})


if __name__ == '__main__':
    app.run(debug=True)