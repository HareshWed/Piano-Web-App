import os

main_dir = "Piano Key Sounds"
files = os.listdir(main_dir)

print(files)
for f in files:
    new_name = "" 
    for letter in f:
        if letter == "#":
            new_name += "sharp" 
        else:
            new_name += letter
    os.rename(os.path.join(main_dir, f), os.path.join(main_dir,new_name))