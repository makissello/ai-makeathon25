import openai

def call_model(prompt, model="gpt-4", api_key=None):
    """
    Sends a prompt to the OpenAI API and returns the response.

    Args:
        prompt (str): The prompt or message to send to the model.
        model (str): The model to use (default is "gpt-4").
        api_key (str): Your OpenAI API key. If not set, assumes it's set globally.

    Returns:
        str: The model's response.
    """
    if api_key:
        openai.api_key = api_key

    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500,
            n=1,
            stop=None,
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return None
