from google.cloud import texttospeech
import os
import base64


google_key = {
  "type": "service_account",
  "project_id": "tts-and-stt-308605",
  "private_key_id": "f25ba78fea3ad093d47a7c211d43cc4866f10bca",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYRVgsvKGUNDwA\nyukSTS930grhBHNncjUnF6GO6EHhjo4zDCXFHkmtvRlUOpLZOht4w89KjWcxG7nm\nCFvAZWSF9oywL2EVgfJR1egyXo7wQA/BAMXyutuFEToQx1U+lSY0jYDDtX0VMmjl\n4LmvG6bDiSfTitjAUHReI/XL8K+7C+EDL9ptIGewxcSmiMF//p0ciZKjm6k87X7g\nEa4SvESO2XRTRD+KE12qKi19smXRpWwjQC2GRQGfq+p9m+FrgtT91XHWEf0OwLyx\nAw6j/RN6DHLTQqoFpUvmxOCoLIpOTwL3bGbM8+k2VIY8ZmRyCc9dcIUCqrfQZX3B\nbFpnPZ0rAgMBAAECggEADdCTcIedRIln/OMWjzWtKKVH8w9I0Gn7qYl1e7YrAqWW\nKsp02Mk9LQPleuSk3bbDDEtTkLN7LmjnY5fUNISJFgr+y53uJG85hrQt+0055vvL\nkhqZsEJvV8du1Fveqi1fnc/4Dol2M4idx2atN1ZTub9v+2Ydm8u7gFj/MVqrpCq1\nZyBWTtmAA4FzTbRZTa/xAhiunYZ8Mw19HY2WmxvQe+0Wud/nm568SPjgIbHgWdnq\n5T2gYpWlW5anPEWv4/6MG/eCCTQ4umYg1Hq9mEgD50EeZt5lBJMytnmwUaEIoTxw\noRWduLkBExmT+M3YEjNZIoc8ZBu0zd2GDP34IQy/dQKBgQDIlPflaalzS23mBcNX\n4R00a5YJ+4+f7WkujoriqcKR3S0K5H+qtr70+IlsP0maYM49NtKhefqtBQDlW5Mq\nA2GiZTMHWF6FKUpg9Ex6GvN5iUWy1vBQMcqvROrqRlyWuxV7qeWgJ7tPI2n6TPRj\nA4Pj3Bh6iDj/Gne7CC6UDnHNXQKBgQDCV14Mr5ng4mYqQVjDFLg7gMOgJ93r7HeR\nvUGyvsYXmShRkTa29c1iXsD6MiGM6iMxr8a87aQJ76Mn2maDQHFGsf8FUO8U16BQ\nKGYXmiAwtXPKNjm+EaS5DGkWWfJbHJNThxhj7v5xWne3Apdj4+cWsBuLYN9Qx3PY\nh8xtJHtkJwKBgBKw5wTGutaWkdAce16GCK2o1NtrSK/zdJi1CbYjcZEcFiVss4TZ\n8KNtQYkHwLkVCkLkB+6qKjTTQYkd5nHEzOVQHtgxYOVxuo+cVEAQoN2TcB5BLzWZ\n3jRE7MsV8WzOVCso4s/ww+CVATwkzaUoX7LtAI7ygLUs5zlTgtujGPG1AoGAZxN/\nxqq8qxJpra/LLG0o6iZ5m9CJXECnip0e43dcCdgqElk68/+bV7l6ETnVoa/tysS4\nXCyO/NYla1XjWWosqppt8JvksuFLHjjPLWWJ/UvAhlgMeEtTWvLCKiC68qhNW9gj\nj52LRwP8ywyMz2ZpgxcVBO/0ghvHzej4/EqFR7ECgYAAk9qTjq3EoDN2rv4M6EHE\nU2eiVfPGRaE4KXHGfgryMnIjHfVN7b2zj9iEVnlce/U5+yohtq/g65cPECHrnlYp\ngmIAwwY9smdote9gkd66uH2PsVqarqe+hh14J5ipYWLWA6jWcFelZ3zud9G9d4on\n7MOFlO+k2r6ppqBhkOtPhw==\n-----END PRIVATE KEY-----\n",
  "client_email": "stts-361@tts-and-stt-308605.iam.gserviceaccount.com",
  "client_id": "116065217992135964912",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/stts-361%40tts-and-stt-308605.iam.gserviceaccount.com"
}


os.environ['GOOGLE_APPLICATION_CREDENTIALS']="./apikey.json"


def TextToSpeech(words, language):    
    client = texttospeech.TextToSpeechClient()

    # request에서 받은 문자 넣기
    synthesis_input = texttospeech.SynthesisInput(text=words)

    # 설정에서 정한 언어로 바꾸기
    voice = texttospeech.VoiceSelectionParams(
        language_code=language, ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    # print(voice)
    # print(audio_config)
    # print(response.audio_content)

    with open("output.mp3", "wb") as out:
        audio=base64.b64encode(response.audio_content)
        out.write(response.audio_content)
    audio=audio.decode("utf-8")
    # print(audio)
    context = {
        'audio': audio,
    }
    return context


def encode_audio(audio):
  audio_content = audio.read()
  return base64.b64encode(audio_content)