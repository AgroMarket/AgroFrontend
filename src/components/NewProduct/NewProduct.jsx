import './NewProduct.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';

// Данные для кнопки Сохранить изменения
const saveItemButton = {
  id: 'open_profile',
  name: 'Сохранить изменения',
};
// Данные для кнопки Загрузить фотографию товара
const loadItemPhotoButton = {
  id: 'open_profile',
  name: 'Загрузить фотографию товара',
};

// TODO заменить заглушку с категориями на данные с сервера
const categoryJSON = {
  'status': 200,
  'message': 'Запрос данных для главной страницы',
  'result': {
    'categories': [
      {
        'category': {
          'link': '/api/categories/1/products',
          'id': 1,
          'name': 'Мёд',
          'parent_id': 0,
          'rank': 1,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--16d037178094de185af5f65916821aceea91d27f/%D0%BC%D0%B5%D0%B4.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/2/products',
                'id': 2,
                'name': 'Мёд',
                'parent_id': 1,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/3/products',
                'id': 3,
                'name': 'Мёд в сотах',
                'parent_id': 1,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/4/products',
                'id': 4,
                'name': 'Продукты пчеловодства',
                'parent_id': 1,
                'rank': 3,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/5/products',
          'id': 5,
          'name': 'Овощи фрукты',
          'parent_id': 0,
          'rank': 2,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--06265c6f8876074f7ac336be080cbf3d2149c6aa/%D0%BE%D0%B2%D0%BE%D1%89%D0%B8.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/6/products',
                'id': 6,
                'name': 'Зелень',
                'parent_id': 5,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/7/products',
                'id': 7,
                'name': 'Овощи',
                'parent_id': 5,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/8/products',
                'id': 8,
                'name': 'Фрукты',
                'parent_id': 5,
                'rank': 3,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/9/products',
          'id': 9,
          'name': 'Орехи',
          'parent_id': 0,
          'rank': 3,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--715b9f26153c6c984fba4461b8de0536986eecd7/%D0%BE%D1%80%D0%B5%D1%85.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/10/products',
                'id': 10,
                'name': 'Орехи',
                'parent_id': 9,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/11/products',
                'id': 11,
                'name': 'Семечки',
                'parent_id': 9,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/12/products',
                'id': 12,
                'name': 'Орехи, семечки очищенные',
                'parent_id': 9,
                'rank': 3,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/13/products',
          'id': 13,
          'name': 'Молочные продукты',
          'parent_id': 0,
          'rank': 4,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3091b25dc0c3c47e562bee5e8c3a11d4c40bae3c/%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/14/products',
                'id': 14,
                'name': 'Молоко, сливки',
                'parent_id': 13,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/15/products',
                'id': 15,
                'name': 'Кефир, ряженка',
                'parent_id': 13,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/16/products',
                'id': 16,
                'name': 'Сметана',
                'parent_id': 13,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/17/products',
                'id': 17,
                'name': 'Сыр',
                'parent_id': 13,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/18/products',
                'id': 18,
                'name': 'Творог',
                'parent_id': 13,
                'rank': 5,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/19/products',
          'id': 19,
          'name': 'Крупы, Бобовые',
          'parent_id': 0,
          'rank': 5,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--57e4db3d9ea3153edca5143eb7aa5f0e8a4e6ce4/%D0%BA%D1%80%D1%83%D0%BF%D0%B0.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/20/products',
                'id': 20,
                'name': 'Гречка',
                'parent_id': 19,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/21/products',
                'id': 21,
                'name': 'Пшеница',
                'parent_id': 19,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/22/products',
                'id': 22,
                'name': 'Пшено',
                'parent_id': 19,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/23/products',
                'id': 23,
                'name': 'Горох',
                'parent_id': 19,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/24/products',
                'id': 24,
                'name': 'Фасоль',
                'parent_id': 19,
                'rank': 5,
              },
            },
            {
              'category': {
                'link': '/api/categories/25/products',
                'id': 25,
                'name': 'Соя',
                'parent_id': 19,
                'rank': 6,
              },
            },
            {
              'category': {
                'link': '/api/categories/26/products',
                'id': 26,
                'name': 'Чечевица',
                'parent_id': 19,
                'rank': 7,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/27/products',
          'id': 27,
          'name': 'Готовые продукты, заготовки',
          'parent_id': 0,
          'rank': 6,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--585a29527209da6cb4c6074e5e8ab2b0f5796ebb/%D0%B7%D0%B0%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/28/products',
                'id': 28,
                'name': 'Хлебобулочные изделия',
                'parent_id': 27,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/29/products',
                'id': 29,
                'name': 'Консервированные продукты',
                'parent_id': 27,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/30/products',
                'id': 30,
                'name': 'Мясные деликатесы',
                'parent_id': 27,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/31/products',
                'id': 31,
                'name': 'Пельмени, вареники',
                'parent_id': 27,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/32/products',
                'id': 32,
                'name': 'Соусы, специи',
                'parent_id': 27,
                'rank': 5,
              },
            },
            {
              'category': {
                'link': '/api/categories/33/products',
                'id': 33,
                'name': 'Кондитерские изделия',
                'parent_id': 27,
                'rank': 6,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/34/products',
          'id': 34,
          'name': 'Птица, Яйцо',
          'parent_id': 0,
          'rank': 7,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0bbded00f7560566de048d413425767308e82f9c/%D0%BF%D1%82%D0%B8%D1%86%D0%B0.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/35/products',
                'id': 35,
                'name': 'Курица',
                'parent_id': 34,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/36/products',
                'id': 36,
                'name': 'Индейка',
                'parent_id': 34,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/37/products',
                'id': 37,
                'name': 'Гусь',
                'parent_id': 34,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/38/products',
                'id': 38,
                'name': 'Утка',
                'parent_id': 34,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/39/products',
                'id': 39,
                'name': 'Яйцо',
                'parent_id': 34,
                'rank': 5,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/40/products',
          'id': 40,
          'name': 'Рыба, Морепродукты',
          'parent_id': 0,
          'rank': 8,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8dbc4e05bb981b3182ba4bc73160992c9cd9ae0c/%D1%80%D1%8B%D0%B1%D0%B0.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/41/products',
                'id': 41,
                'name': 'Замороженная рыба',
                'parent_id': 40,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/42/products',
                'id': 42,
                'name': 'Копченная, соленая, вяленная рыба',
                'parent_id': 40,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/43/products',
                'id': 43,
                'name': 'Свежая рыба',
                'parent_id': 40,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/44/products',
                'id': 44,
                'name': 'Икра',
                'parent_id': 40,
                'rank': 4,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/45/products',
          'id': 45,
          'name': 'Грибы, Ягоды',
          'parent_id': 0,
          'rank': 9,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--adac73f5bb0feb82e54a8344cc0d70678c140b2d/%D0%B3%D1%80%D0%B8%D0%B1.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/46/products',
                'id': 46,
                'name': 'Свежие ягоды',
                'parent_id': 45,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/47/products',
                'id': 47,
                'name': 'Замороженные ягоды',
                'parent_id': 45,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/48/products',
                'id': 48,
                'name': 'Сущеные ягоды',
                'parent_id': 45,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/49/products',
                'id': 49,
                'name': 'Свежие грибы',
                'parent_id': 45,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/50/products',
                'id': 50,
                'name': 'Замороженные грибы',
                'parent_id': 45,
                'rank': 5,
              },
            },
            {
              'category': {
                'link': '/api/categories/51/products',
                'id': 51,
                'name': 'Соленые грибы',
                'parent_id': 45,
                'rank': 6,
              },
            },
            {
              'category': {
                'link': '/api/categories/52/products',
                'id': 52,
                'name': 'Сушенные грибы',
                'parent_id': 45,
                'rank': 7,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/53/products',
          'id': 53,
          'name': 'Напитки',
          'parent_id': 0,
          'rank': 10,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--aecc59a3b2a3f16307a6a3791ec9c7ab959d77bc/%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BA.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/54/products',
                'id': 54,
                'name': 'Соки',
                'parent_id': 53,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/55/products',
                'id': 55,
                'name': 'Морс',
                'parent_id': 53,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/56/products',
                'id': 56,
                'name': 'Квас',
                'parent_id': 53,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/57/products',
                'id': 57,
                'name': 'Сиропы',
                'parent_id': 53,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/58/products',
                'id': 58,
                'name': 'Чай',
                'parent_id': 53,
                'rank': 5,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/59/products',
          'id': 59,
          'name': 'Масла, Жиры',
          'parent_id': 0,
          'rank': 11,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--09e9f87cee50153c04c52607beb057254b3a6b36/%D0%BC%D0%B0%D1%81%D0%BB%D0%BE.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/60/products',
                'id': 60,
                'name': 'Масло сливочное',
                'parent_id': 59,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/61/products',
                'id': 61,
                'name': 'Масло растительное',
                'parent_id': 59,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/62/products',
                'id': 62,
                'name': 'Жир животный',
                'parent_id': 59,
                'rank': 3,
              },
            },
          ],
        },
      },
      {
        'category': {
          'link': '/api/categories/63/products',
          'id': 63,
          'name': 'Мясо',
          'parent_id': 0,
          'rank': 12,
          'icon': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e052bd2230bbd51d0f7f00e5411369a7b6ff1748/%D0%BC%D1%8F%D1%81%D0%BE.png',
          'children': [
            {
              'category': {
                'link': '/api/categories/64/products',
                'id': 64,
                'name': 'Говядина',
                'parent_id': 63,
                'rank': 1,
              },
            },
            {
              'category': {
                'link': '/api/categories/65/products',
                'id': 65,
                'name': 'Свинина',
                'parent_id': 63,
                'rank': 2,
              },
            },
            {
              'category': {
                'link': '/api/categories/66/products',
                'id': 66,
                'name': 'Баранина',
                'parent_id': 63,
                'rank': 3,
              },
            },
            {
              'category': {
                'link': '/api/categories/67/products',
                'id': 67,
                'name': 'Крольчатина',
                'parent_id': 63,
                'rank': 4,
              },
            },
            {
              'category': {
                'link': '/api/categories/68/products',
                'id': 68,
                'name': 'Субпродукты',
                'parent_id': 63,
                'rank': 5,
              },
            },
          ],
        },
      },
    ],
  },
  'error': null,
};

/**
 * Класс NewProduct - компонент, отображающий форму создания нового продаваемого продукта на странице продавца
 */
export default class NewProduct extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      // данные профиля
      category: categoryJSON.result,
    };
  }

  render() {
    const { category } = this.state;
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Карточка товара</h2>
        </div>
        <div className="seller_profile">
          <div className="left_item_parameters">
            <input type="text" id="label_name" name="item_name" placeholder=' '/>
            <label className="item_name" htmlFor="label_name">Название товара</label>
            <select id="label_category" name="item_category">
              <option value="" disabled="">Выберите категорию товара</option>
              {
                category.categories.map( (item, idx) => {
                  return (
                    <option value={item.category.id} key={idx}>{item.category.name}</option>
                  );
                })
              }
            </select>
            <label className="item_category" htmlFor="label_category">Категория товара</label>
            <input type="text" id="label_measures" name="item_measures" placeholder=' '/>
            <label className="item_measures" htmlFor="label_measures">Единицы измерения</label>
            <input type="text" id="label_price" name="item_price" placeholder=' '/>
            <label className="item_price" htmlFor="label_price">Цена</label>
          </div>
          <div className="right_item_parameters">
            <input type="text" id="label_description" name="item_description" placeholder=' '/>
            <label className="item_description" htmlFor="label_description">Описание, состав, энергетическая ценность</label>
          </div>
          <Button
            className="load_item_photo"
            variant="text"
            color="primary"
            id={loadItemPhotoButton.id}
          >
            {loadItemPhotoButton.name}
          </Button>
          <Button
            className="save_item"
            variant="contained"
            color="primary"
            id={saveItemButton.id}
          >
            {saveItemButton.name}
          </Button>
        </div>
      </div>
    );
  }
}