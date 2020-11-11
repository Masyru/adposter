import os
from settings import PATH_TO_XML
import xml.etree.ElementTree as ET


class XmlCreator:
    def __init__(self, path):
        self.path = path
        if not os.path.exists(self.path) or not len(open(self.path).read()):
            with open(self.path, 'w') as file:
                print('<?xml version="1.0"?>\n'
                      '<data></data>', file=file)

        self.parser = ET.XMLParser(encoding="utf-8")
        self.tree = ET.parse(self.path, parser=self.parser)
        self.root = self.tree.getroot()

    def save_xml(self):
        self.tree = ET.ElementTree(self.root)
        self.tree.write(self.path)


class Japancar(XmlCreator):
    def __init__(self, path):
        super(Japancar, self).__init__(path)
        self.re_init_file()
        self.tree = ET.parse(self.path, parser=self.parser)
        self.root = self.tree.getroot()

    @staticmethod
    def add_ad(_id, data):
        ad_node = ET.Element('data')
        i = ET.SubElement(ad_node, 'id')
        i.text = _id

        model = ET.SubElement(ad_node, 'model')
        model.text = data['model']

        firm = ET.SubElement(ad_node, 'firm')
        firm.text = data['firm']

        used = ET.SubElement(ad_node, 'used')
        used.text = 0 if data['used'] == 'новая' else 1 if data['used'] == 'контрактная' or data['used'] == 'подержанный' else 2

        price = ET.SubElement(ad_node, 'price')
        price.text = data['price']

        currency = ET.SubElement(ad_node, 'currency')
        currency.text = 'RUB'

        s_presence = ET.SubElement(ad_node, 's_presence')
        s_presence.text = data['s_presence']

        photos_list = ET.SubElement(ad_node, 'photos_list')
        for i in data['photos']:
            photo = ET.SubElement(photos_list, 'photo_name')
            name = PATH_TO_XML + i
            if PATH_TO_XML[-1] != '/':
                name = PATH_TO_XML + '/' + i
            photo.text = name

        if int(data['type_offer']) == 1:
            year = ET.SubElement(ad_node, 'year')
            year.text = data['year']

            volume = ET.SubElement(ad_node, 'volume')
            volume.text = data['volume']

            fuel_type = ET.SubElement(ad_node, 'fuel_type')
            fuel_type.text = data['fuel_type']

            transmission = ET.SubElement(ad_node, 'transmission')
            transmission.text = data['transmission']

            probegrf = ET.SubElement(ad_node, 'probegrf')
            probegrf.text = data['probegrf']

            probeg = ET.SubElement(ad_node, 'probeg')
            probeg.text = data['probeg']

            rul = ET.SubElement(ad_node, 'rul')
            rul.text = data['rul']

            privod = ET.SubElement(ad_node, 'privod')
            privod.text = data['privod']

            pts_record = ET.SubElement(ad_node, 'pts_record')
            pts_record.text = 1 if data['pts_record'] == 'с документами' else 0

            city = ET.SubElement(ad_node, 'city')
            city.text = data['location']

        elif int(data['type_offer']) == 2:
            kuzov = ET.SubElement(ad_node, 'kuzov')
            kuzov.text = data['kuzov']

            engine = ET.SubElement(ad_node, 'engine')
            engine.text = data['engine']

            modelnumber = ET.SubElement(ad_node, 'modelnumber')
            modelnumber.text = data['dvs']

            R_L = ET.SubElement(ad_node, 'R_L')
            R_L.text = data['LR']

            U_D = ET.SubElement(ad_node, 'U_D')
            U_D.text = data['UD']

            F_R = ET.SubElement(ad_node, 'F_R')
            F_R.text = data['FB']

            oem_code = ET.SubElement(ad_node, 'oem_code')
            oem_code.text = data['oem']

            producer = ET.SubElement(ad_node, 'producer')
            producer.text = data['producer']

            producer_code = ET.SubElement(ad_node, 'producer_code')
            producer_code.text = data['producer_code']

            price_old = ET.SubElement(ad_node, 'price_old')
            price_old.text = data['price']

        return ad_node

    def re_init_file(self):
        with open(self.path, 'w') as file:
            print('<?xml version="1.0"?>\n'
                  '<japancarru_import_data>'
                  '<dealer>'
                  '<name></name>'
                  '<address>Владивосток, улица Сабанеева 14в, 42</address>'
                  '<tel></tel>'
                  '<email>razborka80-100@mail.ru</email>'
                  '</dealer>'
                  '<data_list></data_list>'
                  '</japancarru_import_data>', file=file)

    def add_to_tree(self, offers):
        data_list = self.root.find('data_list')
        new_list = list()
        for seq in offers:
            for i in seq.keys():
                seq[i] = str(seq[i])
            new_list.append(seq)
        for offer in new_list:
            ad = self.add_ad(offer['id'], offer)
            data_list.append(ad)
        self.save_xml()


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

