def load_key():
    """
    Load the API key from a file.
    """
    try:
        with open("key.txt", "r") as file:
            key = file.read().strip()
        return key
    except FileNotFoundError:
        print("Key file not found. Please create a 'key.txt' file with your API key.")
        return None
    except Exception as e:
        print(f"An error occurred while loading the key: {e}")
        return None#