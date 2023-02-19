from colorsys import ONE_SIXTH
from ctypes.wintypes import OLESTR
import json
from pydoc import pager
from re import L

def ordCidade(c):
    return c['nome']

def codToNomeCidade(c):
    cod = c['destino']
    return nomesCidades[cod]

f = open("mapa.json")

data = json.load(f)

cidades = data['cidades']
cidades.sort(key=ordCidade)

ligacoes = data['ligações']
dic = {}

for l in ligacoes:
    dic.setdefault(l['origem'], []).append(l)

# print(sorted(dic.keys()))
# print(len(dic.keys()))

pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%" valign="top">
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <!-- Lista com o índice -->
                    <ul>
"""

nomesCidades = {}
for c in cidades:
    nomesCidades[c['id']] = c['nome']
    #print(c['nome'])
    pagWeb += f"""
            <li> 
                <a href="#{c['id']}">{c['nome']}</a> 
            </li>
    """

#print(nomesCidades)

pagWeb += """
</ul>     
                </td>
                <td width="70%">
                <!-- Info das Cidades -->

"""

for c in cidades:
    ligs = {}
    # print("-------------------")
    # print(len(nomesCidades.keys()))
    # print("id = "+c['id'])
    # print("-------------------")

    if c['id'] in dic.keys():
        ligs = dic[c['id']]
    else:
        ligs = []

    # print(ligs.items())  
    ligs.sort(key=codToNomeCidade)
    # print(ligs)
    # sorted_ligs = sorted(ligs.keys(), key=lambda x:nomesCidades[x[1]])
    # print(sorted_ligs)

    # ORDEAR POR ORDEM ALFABÉTICA
    pagWeb += f"""
            <a name="{c['id']}"/>
            <h3>{c['nome']}</h3> 
            <p> <b>População:</b> {c['população']} </p>
            <p> <b>Descrição:</b> {c['descrição']} </p>
            <p> <b>Distrito:</b> {c['distrito']} </p>
            <p> <b>Ligações:</b> </p>
            <ul> 
    """
    for l in ligs:
        pagWeb += f"""
                <li> 
                    <p> <a href="#{l['destino']}">{nomesCidades[l['destino']]} </a> -> Distância: {l['distância']} </p>
                </li> 
        """
    
    pagWeb += """
            </ul>
            <a href="#indice"> [Voltar ao Índice]</a>
            <a href="#indice"/>
            """

pagWeb += """
            <address>[<a href="#indice"> Voltar ao Índice</a>]</address>
            <center>
                <hr width="80%"/>
            </center>
    """


pagWeb += """
</td> 
            </tr>
        </table>
    </body>
</html>
"""

print(pagWeb)

f.close()


"""
Continuar o ex
Para cada cidade, haver secçao chamada ligaçoes que nos dá as ligaçoes que a cidade tem com as outras

Ligaçoes 
    . nome cidade(Link): distancia
    .
""" 
