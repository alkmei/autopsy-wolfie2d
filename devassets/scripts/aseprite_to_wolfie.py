#!/usr/bin/python3
import json
import os.path
import sys


class Spritesheet:
    def __init__(self):
        self.name = ""
        self.spriteSheetImage = ""
        self.spriteWidth = 0
        self.spriteHeight = 0
        self.columns = 0
        self.rows = 0
        self.animations = []


class AnimationData:
    def __init__(self):
        self.name = ""
        self.frames = []


class Frame:
    def __init__(self, index, duration, x, y, w, h):
        self.index = index
        self.duration = duration
        self.x = x
        self.y = y
        self.w = w
        self.h = h


def from_aseprite(sheet, name, scale):
    sprite_sheet = Spritesheet()
    sprite_sheet.name = name
    sprite_sheet.spriteSheetImage = sheet["meta"]["image"]
    # sprite_sheet.spriteWidth = sheet['frames'][0]['frame']['w']
    # sprite_sheet.spriteHeight = sheet['frames'][0]['frame']['h']

    # max_x = 0
    # max_y = 0

    # for f in sheet['frames']:
    #     max_x = max(max_x, f['frame']['x'] + f['frame']['w'])
    #     max_y = max(max_y, f['frame']['y'] + f['frame']['h'])

    # sprite_sheet.columns = -(-max_x // sprite_sheet.spriteWidth)
    # sprite_sheet.rows = -(-max_y // sprite_sheet.spriteHeight)

    sprite_sheet.animations = []

    for value in sheet["meta"]["frameTags"]:
        animation = AnimationData()
        animation.name = value["name"]
        animation.frames = []

        for i in range(value["from"], value["to"] + 1):
            frame = Frame(
                i,
                sheet["frames"][i]["duration"] / 10,
                sheet["frames"][i]["frame"]["x"] * scale,
                sheet["frames"][i]["frame"]["y"] * scale,
                sheet["frames"][i]["frame"]["w"] * scale,
                sheet["frames"][i]["frame"]["h"] * scale,
            )
            animation.frames.append(frame)

        sprite_sheet.animations.append(animation)

    return sprite_sheet


def write_json_file(data, file_path):
    try:
        with open(file_path, "w") as json_file:
            json.dump(data, json_file, indent=4, default=vars)
        print(f"JSON data written to '{file_path}' successfully.")
    except Exception as e:
        print(f"Error occurred while writing JSON data to '{file_path}': {e}")


def read_json_file(file_path):
    try:
        with open(file_path, "r") as json_file:
            data = json.load(json_file)
            return data
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except json.JSONDecodeError:
        print(f"Error: '{file_path}' is not a valid JSON file.")


def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <json_file> <scale>")
    else:
        file_path = sys.argv[1]
        scale = sys.argv[2] if sys.argv[2] else "1"
        file_name = os.path.basename(file_path)
        json_data = read_json_file(file_path)
        if json_data:
            write_json_file(
                from_aseprite(json_data, file_name, int(scale)), "output.json"
            )


if __name__ == "__main__":
    main()
