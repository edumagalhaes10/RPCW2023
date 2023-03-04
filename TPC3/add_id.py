import json
 
def add_ID(filename):
    with open(filename) as json_file:
        data = json.load(json_file)

    people = data['pessoas']
    id = 1
    for person in people:
        person["id"] = 'p'+str(id)
        id+=1

    json_object = json.dumps(data, indent = 4,ensure_ascii=False) 


    with open(filename, 'w') as f:
        f.write(json_object)


add_ID('datasets/dataset-extra1.json')
add_ID('datasets/dataset-extra2.json')
add_ID('datasets/dataset-extra3.json')
add_ID('datasets/dataset.json')