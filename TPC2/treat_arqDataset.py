from bs4 import BeautifulSoup as bSoup

def divide_Arq():
    with open('arq.xml', 'r') as f:
        content = f.read()
    
    soup = bSoup(content,'lxml')
    children = soup.find_all("arqelem")
    lista = soup.find_all("identi")
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

def info_dictionary(soup):
    arqelem = soup.find('arqelem')
    children = arqelem.findChildren()
    pairList = []
    for child in children:
            # print(child)
            # print("********************************************")
            tag = child.name
            content = child.text
            # print(tag +": "+content)
            # print("********************************************")
            if tag == "tipo": 
                tag1 = soup.tipo
                content = tag1.attrs
                pairList.append((tag,content))
            elif tag == "imagem":
                tag1 = soup.imagem
                content = tag1.attrs
                pairList.append((tag,content))
            else: 
                pairList.append((tag,content))

            # print(pairList)
    return pairList

def dict2html(pairList, i):
    pair = next((p for p in pairList if p[0] == "identi"), None)

    # ident = [item for item in pairList if pairList[0] == "identi"]

    html = f"""<!DOCTYPE html>
    <html>
        <head>
            <title>{pair[1]}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>{pair[1]}</h1>
    """
    for item in pairList:
        if item[0] != "identi":
            html += f"""
                            <p><b>{item[0]}</b>: {item[1]}</p>
                    """

    html +="""
        <p> <a href="/">[Voltar ao Índice]</a></p>
        </body>
    </html>
    """

    name = f"arqs_html/arq{i+1}.html"
    f1 = open(name, "w")
    f1.write(html)
    f1.close()
    

def xml2html(len):
    for i in range(len):
        with open(f'arqs_xml/arq{i+1}.xml', 'r') as f:
            file_content = f.read()
        
        soup = bSoup(file_content,'lxml')

        pairList = info_dictionary(soup)
        # print(dictionary)
        
        dict2html(pairList, i)


        

# #             else:
# #                 if tag == "identi":
#                     html = f"""<!DOCTYPE html>
# # <html>
# #     <head>
# #         <title>{content}</title>
# #         <meta charset="utf-8"/>
# #     </head>
# #     <body>
# #         <h1>{content}</h1>
# # """    
# #                 else:
#                     html += f"""
#                             <p><b>{tag}</b>: {content}</p>
#                     """

# #         html +="""
# #                 </dl>
# #             </body>
# #         </html>
# #         """

# #         name = f"arqs_html/arq{i+1}.html"
# #         f1 = open(name, "w")
# #         f1.write(html)
# #         f1.close()

           






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
