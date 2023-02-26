from bs4 import BeautifulSoup as bSoup

def divide_Arq():
    with open('arq.xml', 'r', encoding='iso-8859-1') as f:
        content = f.read()
    
    soup = bSoup(content,'xml')
    children = soup.find_all("ARQELEM")
    lista = soup.find_all("IDENTI")
    lista_arq = []
    for arq in lista:
        lista_arq.append(arq.text.strip())

    for i, child in enumerate(children):
        name = f"arqs_xml/arq{i+1}.xml"
        f1 = open(name, "w")
        xml1line = '<?xml version="1.0" encoding="iso-8859-1"?>\n'
        f1.write(str(xml1line))
        f1.write(str(child))
        f1.close()

    return lista_arq

def xml2html(len):
    for i in range(1):
        pass


lista_arq = divide_Arq()

xml2html(len(lista_arq))

# print(lista_arq)

pagweb = """<!DOCTYPE html>
<html>
    <head>
        <title>Arqueossítios</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Arqueossítios</h1>
        <ul>
"""

for i,arq in enumerate(lista_arq):
    pagweb += f"""
            <li><a href="{i+1}">{arq}</a></li>
    """

pagweb += """
        </ul>
    </body>
</html>
"""

with open('index.html', 'w') as f:
    f.write(pagweb)
