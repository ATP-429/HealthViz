import pathlib
import textwrap

from key import KEY

import google.generativeai as genai

genai.configure(api_key=KEY)

model = genai.GenerativeModel('gemini-pro')

response = model.generate_content("Hello")

print(response.text)

