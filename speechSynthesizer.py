import pyttsx3;


def synthesize(toSpeak):
    engine = pyttsx3.init();
   # voices = engine.getProperty('voices')
    #for voice in voices :
     #   print(voice.id)
    #en_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0"
    en_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\MSTTS_V110_enIN_HeeraM"
    engine.setProperty('voice', en_voice_id)
    engine.setProperty('rate', 220)
    engine.say(toSpeak);
    print("BOT: "+toSpeak)
    engine.runAndWait() ;
    
#synthesize("HELLO kalavakkam")
        

