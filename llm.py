import openai
from pathlib import Path
from PyPDF2 import PdfReader

def call_model(prompt, model="gpt-4o-mini", api_key=None, pdf_path=None):
    """
    Sends a prompt (optionally prefixed with PDF content) to the OpenAI API and returns the response.

    Args:
        prompt (str): The prompt or message to send to the model.
        model (str): The model to use (default is "gpt-4-turbo").
        api_key (str): Your OpenAI API key. If not set, assumes it's set globally.
        pdf_path (str or Path, optional): Path to a PDF file to include its text at the beginning.

    Returns:
        str: The model's response.
    """
    client = openai.OpenAI(api_key=api_key)  # New: create a Client object

    if pdf_path:
        try:
            pdf_path = Path(pdf_path)
            reader = PdfReader(str(pdf_path))
            pdf_text = ""
            for page in reader.pages:
                pdf_text += page.extract_text() or ""
            # Prepend PDF content to the prompt
            prompt = f"Content from PDF:\n{pdf_text}\n\nUser prompt:\n{prompt}"
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return None

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return None
