import requests

# This module is for personal use. The mapping is to be cached later on.
def save_coingecko_mapping():
    url = "https://api.coingecko.com/api/v3/coins/list"
    response = requests.get(url)
    response.raise_for_status()
    coins = response.json()

    # Create mapping: TICKER -> CoinGecko ID
    mapping = {}
    for coin in coins:
        symbol = coin["symbol"].upper()
        if symbol not in mapping:
            mapping[symbol] = coin["id"]  # take the first one (can be ambiguous)

    # Write to a Python file
    with open("coingecko_mapping.py", "w", encoding="utf-8") as f:
        f.write("# Auto-generated CoinGecko mapping\n")
        f.write("COINGECKO_MAPPING = ")
        f.write(repr(mapping))

    print("Mapping saved to coingecko_mapping.py")
    
if __name__ == "__main__":
    save_coingecko_mapping()