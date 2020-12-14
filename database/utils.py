from xml.etree import ElementTree as ET


def create_node(name, value='', attr=None) -> ET.Element:
    var = ET.Element(name)
    var.text = str(value)
    if attr is not None:
        for i in attr.keys():
            var.set(i, str(attr[i]))
    return var


def write_root(root, path):
    tree = ET.tostring(root, encoding="unicode")
    with open(path, 'w') as fout:
        fout.write(f'<?xml version=\"1.0\"?>\n{tree}')
