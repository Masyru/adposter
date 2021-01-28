import sys, os
sys.path.append(os.path.abspath(os.curdir))

from xml.etree import ElementTree
from database.utils import create_node, write_root
from database.__all_modules import Offer
from database.__session import create_session, global_init


root = create_node('japancarru_import_data')
root_for_part = create_node('japancarru_import_data')
SITE = 'http://45.80.70.172/'

# Dealer info
dealer = create_node('dealer')

dealer_info = {
    'name': 'ИП Филюкова Ирина Алексеевна',
    'address': 'Владивосток, улица Сабанеева 14в, 42',
    'email': 'razborka80-100@mail.ru',
}

for item in dealer_info.keys():
    dealer.append(create_node(item, str(dealer_info[item])))

root.append(dealer)
root_for_part.append(dealer)

# Connect to database

# It works only if runs in __init__ in app
global_init("database/database.db")
session = create_session()

offers = Offer.get_auto(session)
parts = Offer.get_part(session)

session.close()

# Create offers

data_list = ElementTree.SubElement(root, 'data_list')
part_list = ElementTree.SubElement(root_for_part, 'data_list')

# Offers from database

for offer in offers:
    data = ElementTree.SubElement(data_list, 'data')

    index = create_node('id', offer['id'])
    name = create_node('name', offer['title'])
    model = create_node('model', offer['model'])
    firm = create_node('firm', offer['firm'])
    description = create_node('description', offer['description'])
    used = create_node('used', 0 if offer['used'] == 'новая' else 1 if offer['used'] == 'контрактная' or
                                                                       offer['used'] == 'подержанный' else 2)
    price = create_node('price', offer['price'])
    currency = create_node('currency', 'RUB')
    s_presence = create_node('s_presence', offer['s_presence'])
    year = create_node('year', offer['year'])
    volume = create_node('volume', offer['volume'])
    fuel_type = create_node('fuel_type', offer['fuel_type'])
    transmission = create_node('transmission', offer['transmission'])
    probegrf = create_node('probegrf', offer['probegrf'])
    probeg = create_node('probeg', offer['probeg'])
    rul = create_node('rul', offer['rul'])
    privod = create_node('privod', offer['privod'])
    pts_record = create_node('pts_record', 1 if offer['pts_record'] == 'с документами' else 0)
    city = create_node('city', offer['location'])

    photos_list = create_node('photos_list')
    for i in offer['photos']:
        photo = ElementTree.SubElement(photos_list, 'photo_name')
        photo.text = SITE + 'public/uploads/' + i

    for el in [index, name, model, firm, description, used, price, currency, s_presence, year, volume, fuel_type,
               transmission, probegrf, probeg, rul, privod, pts_record, city, photos_list]:
        data.append(el)


for part in parts:
    data = ElementTree.SubElement(part_list, 'data')

    index = create_node('id', part['id'])
    name = create_node('name', offer['title'])
    model = create_node('model', part['model'])
    firm = create_node('firm', part['firm'])
    description = create_node('description', part['description'])
    used = create_node('used', 0 if part['used'] == 'новая' else 1 if part['used'] == 'контрактная' or
                                                                      part['used'] == 'подержанный' else 2)
    price = create_node('price', part['price'])
    currency = create_node('currency', 'RUB')
    s_presence = create_node('s_presence', part['s_presence'])
    kuzov = create_node('kuzov', part['kuzov'])
    engine = create_node('engine', part['engine'])
    modelnumber = create_node('modelnumber', part['dvs'])
    R_L = create_node('R_L', part['LR'])
    U_D = create_node('U_D', part['UD'])
    F_R = create_node('F_R', part['FB'])
    oem_code = create_node('oem_code', part['oem'])
    producer = create_node('producer', part['producer'])
    producer_code = create_node('producer_code', part['producer_code'])
    price_old = create_node('price_old', part['price'])

    photos_list = create_node('photos_list')
    for i in part['photos']:
        photo = ElementTree.SubElement(photos_list, 'photo_name')
        photo.text = SITE + 'public/uploads/' + i

    for el in [index, name, model, firm, description, used, price, currency, s_presence,
               kuzov, engine, modelnumber, R_L, U_D, F_R, oem_code, producer, producer_code, price_old, photos_list]:
        data.append(el)


write_root(root, 'frontend/static/service/auto.xml')
write_root(root_for_part, 'frontend/static/service/parts.xml')

