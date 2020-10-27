import os
from json import loads, dump

JSON_PATH = 'global_var.json'
GLOBAL_JSON_PATH = os.path.join(os.path.abspath(os.path.curdir), JSON_PATH)


def open_file_serialize() -> dict:
    if not (os.path.exists(GLOBAL_JSON_PATH) and os.path.isfile(GLOBAL_JSON_PATH)):
        save_json_to_file({})
    with open(GLOBAL_JSON_PATH, 'r') as fin:
        data = fin.read()
    if len(data):
        return loads(data)
    return {}


def save_json_to_file(data: dict) -> None:
    with open(GLOBAL_JSON_PATH, "w") as write_file:
        dump(data, write_file)
