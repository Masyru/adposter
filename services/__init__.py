import os
import xml.etree.ElementTree as ET


class XmlCreator:
    def __init__(self, path):
        self.path = path
        if not os.path.exists(self.path) or not len(open(self.path).read()):
            with open(self.path, 'w') as file:
                print('<?xml version="1.0"?>\n<data></data>', file=file)

        self.tree = ET.parse(self.path)
        self.root = self.tree.getroot()

    def save_xml(self):
        self.tree = ET.ElementTree(self.root)
        self.tree.write(self.path)


class Avito(XmlCreator):
    def __init__(self, path):
        super(Avito, self).__init__(path)
        with open(self.path, 'w') as file:
            print('<?xml version="1.0"?>\n<Ads formatVersion="3" target="Avito.ru></Ads>', file=file)

    @staticmethod
    def add_ad(_id, data):
        ad_node = ET.Element('Ad')
        i = ET.SubElement(ad_node, 'Id')
        i.text = _id
        mail = ET.SubElement(ad_node, 'AllowEmail')
        mail.text = "Да"
        contact_number = ET.SubElement(ad_node, 'ContactPhone')
        contact_number.text = data['contact_number']
        location = ET.SubElement(ad_node, 'Address')
        location.text = "Россия, Владивосток, улица Сабанеева 14в, 42"
        description = ET.SubElement(ad_node, 'Description')
        description.text = data['description']
        description = ET.SubElement(ad_node, 'Description')
        description.text = data['description']
        price = ET.SubElement(ad_node, 'Price')
        price.text = str(data['price'])
        ET.dump(ad_node)

    
if __name__ == '__main__':
    Avito.add_ad(str(1))

