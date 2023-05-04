import React, { useState } from 'react'

function Accordeon() {
  const [accordeon, setAccordeon] = useState({
    first_item: false,
    second_item: false,
    third_item: false,
    fourth_item: false,
    fifth_item: false,
  })
  return (
    <section className="faq" id="faq">
      <div className="container faq__container">
        <div className="faq__title">
          Часто задаваемые<br></br> <span>вопросы/ответы</span>
        </div>
        <hr className="hr" />
        <div className="faq__accordeon">
          <div
            className={accordeon.first_item ? 'faq__item active' : 'faq__item'}
            onClick={() => setAccordeon({ first_item: !accordeon.first_item })}
          >
            <div className="faq__item-first-block">
              <div className="faq__item-title">
                Сколько будет ехать мой заказ?
              </div>
              <div className="faq__item-arrows_block">
                <div className="faq__item-arrows"></div>
              </div>
            </div>
            <div className="faq__item-about">
              — В среднем 4 дня, в случае, если заказ отправляется напрямую с
              нашего склада в России. Если товар, который вас интересует,
              отсутствует в России, посылка доставляется со склада в Китае, в
              таком случае отправка занимает около 2х недель
            </div>
          </div>
          <div
            className={accordeon.second_item ? 'faq__item active' : 'faq__item'}
            onClick={() =>
              setAccordeon({ second_item: !accordeon.second_item })
            }
          >
            <div className="faq__item-first-block">
              <div className="faq__item-title">
                Почему у вас такие низкие цены?
              </div>
              <div className="faq__item-arrows"></div>
            </div>
            <div className="faq__item-about">
              — Мы работаем напрямую с фабриками, а также закупаем товар в
              огромных объемах, из-за чего и складываются такие цены
            </div>
          </div>
          <div
            className={accordeon.third_item ? 'faq__item active' : 'faq__item'}
            onClick={() => setAccordeon({ third_item: !accordeon.third_item })}
          >
            <div className="faq__item-first-block">
              <div className="faq__item-title">
                Что будет если я получу бракованный или нерабочий товар?
              </div>
              <div className="faq__item-arrows"></div>
            </div>
            <div className="faq__item-about">
              — Вернём полную стоимость товара. Гарантия на весь товар 3 месяца,
              кроме айфона, на него идет гарантия 1 год
            </div>
          </div>
          <div
            className={accordeon.fourth_item ? 'faq__item active' : 'faq__item'}
            onClick={() =>
              setAccordeon({ fourth_item: !accordeon.fourth_item })
            }
          >
            <div className="faq__item-first-block">
              <div className="faq__item-title">
                Какие гарантии того, что меня не обманут?
              </div>
              <div className="faq__item-arrows"></div>
            </div>
            <div className="faq__item-about">
              — Вернём полную стоимость товара. Гарантия на весь товар 3 месяца,
              кроме айфона, на него идет гарантия 1 год
            </div>
          </div>
          <div
            className={accordeon.fifth_item ? 'faq__item active' : 'faq__item'}
            onClick={() => setAccordeon({ fifth_item: !accordeon.fifth_item })}
          >
            <div className="faq__item-first-block">
              <div className="faq__item-title">Что насчет доставки?</div>
              <div className="faq__item-arrows"></div>
            </div>
            <div className="faq__item-about">
              — Весь товар отправляется Почтой России, остальной процесс описан
              в 1 вопросе
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Accordeon
