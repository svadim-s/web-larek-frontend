# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура MVP

Архитектура проекта строится на базе паттерна MVP, который расшифровывается как Model-View-Presenter. Этот шаблон разбивает приложение на три основные части: модель, представление и презентер.

- Модель отвечает за работу с данными, их обработку и управление всеми бизнес-процессами, такими как получение, обновление и удаление информации.

- Представление отображает интерфейс и данные из модели для пользователя. Оно занимается отображением данных, обработкой пользовательских действий (например, нажатий кнопок), заполнением и отправкой форм, а также их валидацией.

- Презентер является связующим звеном между моделью и представлением. Он обрабатывает события и осуществляет передачу данных между моделью и видом.

## Базовый код

## Класс Component<T>

Абстрактный Базовый класс для компонентов интерфейса

Описание конструктора:

```constructor(protected readonly container: HTMLElement)```

Содержит методы:

* ```toggleClass(element: HTMLElement, className: string, force?: boolean)``` // Переключить класс.
* ```setText(element: HTMLElement, value: unknown)``` // Установить текстовое содержимое.
* ```setDisabled(element: HTMLElement, state: boolean)``` // Сменить статус блокировки.
* ```setHidden(element: HTMLElement)``` // Скрыть элемент.
* ```setVisible(element: HTMLElement)``` // Показать элемент.
* ```setImage(element: HTMLImageElement, src: string, alt?: string)``` // Установить изображение с алтернативным текстом.
* ```render(data?: Partial): HTMLElement``` // Вернуть корневой DOM-элемент.

## Класс View

Этот класс предназначен для элементов пользовательского интерфейса, которые способны создавать события. Он наследуется от класса `Component`, дополняя его полем `events`, в которое записывается брокер событий, с помощью методов которого возможно генерировать события. 

## Класс Api

Базовый класс, отвечает за взаимодействие с сервером, получение данных и отправку запросов

Содержит методы:

* ```protected handleResponse(response: Response): Promise<object>``` // обработка ответа от сервера
* ```get(uri: string)``` // получить данные с сервера
* ```post(uri: string, data: object, method: ApiPostMethods = 'POST')``` // отправить данные на сервер

## Класс EventEmiter

Базовый класс, брокер событий.

Содержит методы:

* ```on<T extends object>(eventName: EventName, callback: (event: T) => void)``` // Установить обработчик на событие
* ```off(eventName: EventName, callback: Subscriber)``` // Снять обработчик с события
* ```emit<T extends object>(eventName: string, data?: T)``` // Инициировать событие с данными
* ```onAll(callback: (event: EmitterEvent) => void)``` // Слушать все события
* ```offAll()``` // Сбросить все обработчики
* ```trigger<T extends object>(eventName: string, context?: Partial<T>)``` // Сделать коллбек триггер, генерирующий событие при вызове

# Слой представления View

Все классы представления наследуются от класса `Component` или `View`.

```
export class View<T> extends Component<T> {
  constructor(protected readonly events: IEvents, container: HTMLElement)
}
```

## Класс Card

Класс карточки товара и отображения ее данных. Название товара, описание, изображение, стоимость, категория.

Свойства:

- `protected _title: HTMLElement;`
- `protected _image?: HTMLImageElement;`
- `protected _price: HTMLElement;`
- `protected _category?: HTMLElement;`
- `protected _description?: HTMLElement;`
- `protected _button?: HTMLButtonElement;`

```
private categoryColors: Map<string, string> = new Map([
  ['софт-скил', '#83FA9D'],
  ['другое', '#FAD883'],
  ['дополнительное', '#B783FA'],
  ['кнопка', '#83DDFA'],
  ['хард-скил', '#FAA083']
]);
```

Методы:

* ```set id(value: string)``` // Установить идентификатор для элемента.
* ```get id(): string``` // Получить идентификатор элемента.
* ```set title(value: string)``` // Установить заголовок элемента.
* ```get title(): string``` // Получить заголовок элемента.
* ```set price(value: string)``` // Установить цену элемента.
* ```get price(): string``` // Получить цену элемента.
* ```set category(value: string)``` // Установить категорию элемента.
* ```get category(): string``` // Получить категорию элемента.
* ```set image(value: string)``` // Установить изображение для элемента.
* ```set description(value: string | string[])``` // Установить описание элемента.
* ```set button(value: string)``` // Установить текст для кнопки элемента.

## Класс Page

Отвечает за отображение главной страницы с каталогом товаров, а также счетчика товаров добавленных в корзину. Блокирует скролл страницы при открытии модального окна. При клике на корзину Генерирует событие `basket:open`.

Свойства:

- `protected _counter: HTMLElement;`
- `protected _catalog: HTMLElement;`
- `protected _wrapper: HTMLElement;`
- `protected _basket: HTMLElement;`

Методы:

* ```set counter(value: number)``` // Установить счетчик элемента.
* ```set catalog(items: HTMLElement[])``` // Установить каталог элемента.
* ```set locked(value: boolean)``` // Заблокировать/разблокировать элемент.

## Класс Basket

Отвечает за отображение корзины товаров. Состоит из:
Списока товаров в корзине - `items: HTMLElement[]`
Суммарной стоимости товаров - `total: number`

Свойства:

- `static template = ensureElement<HTMLTemplateElement>('#basket');`
- `protected _list: HTMLElement;`
- `protected _total: HTMLElement;`
- `protected _button: HTMLElement;`

Методы:

* ```set items(items: HTMLElement[])``` // Установить элементы.
* ```set selected(items: string[])``` // Установить выбранные элементы.
* ```set total(total: number)``` // Установить общую стоимость элементов.

## Класс Form

Отвечает за работу с формами. Обрабатывает события ввода данных в поля формы, отображет ошибки валидации и состояние активности кнопки для отправки формы, которое зависит от валидности формы. Генерирует событие отправки формы. Например `order:submit` - событие отправки формы со способом платежа и адресом. 

Свойства:

- `protected _submit: HTMLButtonElement;`
- `protected _errors: HTMLElement;`

Методы:

* ```protected onInputChange(field: keyof T, value: string)``` // Обработчик события изменения поля.
* ```set valid(value: boolean)``` // Установить статус валидности формы.
* ```set errors(value: string)``` // Установить ошибки формы.
* ```render(state: Partial<T> & IFormState)``` // Рендерить элемент.

## Класс Contacts

Наследуется от класса `Form`, упрвляет отображением полей ввода формы.

Методы:

* ```set phone(value: string)``` //Установить значение поля телефона.
* ```set email(value: string)``` // Установить значение поля электронной почты.

## Класс Order

Наследуется от класса `Form`, упрвляет отображением полей ввода формы и переключения способа оплаты.

Свойства:

- `protected _paymentCard: HTMLButtonElement;`
- `protected _paymentCash: HTMLButtonElement;`

Методы:

* ```set payment(value: PaymentMethod)``` // Установить метод оплаты.
* ```set address(value: string)``` // Установить значение поля адреса.

## Класс Modal

Отвечает за реализацию модального окна в котором находится какое-то содержимое `content: HTMLElement`. Содержит методы `open` и `close`

Свойства:

- `protected _closeButton: HTMLButtonElement;`
- `protected _content: HTMLElement;`

Методы:

* ```set content(value: HTMLElement)``` // Отобразить контент
* ```open()``` // Открыть модальное окно
* ```close()``` // Закрыть модальное окно
* ```render(data: IModalData): HTMLElement``` // Рендерить модальное окно.

## Класс Success

Отвечает за отображение содержимого модального окна успешного выполнения заказа.

Свойства:

- `protected _close: HTMLElement;`
- `protected _total: HTMLElement;`

Методы:

* ```set total(total: number)``` // Установить итоговую стоимость

# Слой данных Model

## Класс AppData

Предназначен для хранения и управления данными приложения. В контексте веб-приложения.

Свойства:

- `items` - массив с информацией о продукте
- `basket` - массив товаров добавленных в корзину
- `preview` - предпросмотр продукта
- `order` - объект с информацией о заказе
- `formErrors` - объект, содержащий ошибки формы

Методы:

* ```clearBasket()``` // Очистить корзину
* ```setItems(items: IProduct[])``` // Установить элементы продуктов.
* ```setPreview(item: IProduct)``` // Установить предпросмотр продукта в модальном окне.
* ```inBasket(item: IProduct)``` // Проверка нахождения товара в корзине
* ```addToBasket(item: IProduct)``` // Добавить товар в корзину
* ```removeFromBasket(item: IProduct)``` // Удалить товар из корзины
* ```setPaymentMethod(method: PaymentMethod)``` // Установить способ оплаты
* ```setOrderField(field: keyof OrderForm, value: string)``` // Установить значение поля заказа.
* ```validateOrder()``` // Проверить валидность заказа.

## Класс WebLarekAPI

Наследуется от класса Api и добавляет методы:
- `getProductItem(id: string): Promise<IProduct>`
- `getProductsList(): Promise<IProduct[]>`
- `orderProducts(order: IOrder): Promise<IOrderResult>`

# Презентер (Взаимодействие компонентов)

Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`. Взаимодействие осуществляется за счет событий проходящих в брокере событий  и отслеживании этих событий.

Список событий:

* `items:change` - изменение массива товаров
* `basket:change` - изменение списка товаров корзины
* `preview:change` - изменение выбранного товара в модальном окне
* `basket:open` - открытие корзины
* `order:open` - открытие формы заказа
* `order:ready` - данные форм оформления заказа валидны
* `modal:open` - открытие модального окна
* `modal:close` - закрытие модального окна
* `card:select` - открытие карточки товара в модальном окне
* `formErrors:change` - изменилось состояния ошибки валидации форм
* `^order\..*:change` - изменение данных полей формы заказа
* `^contacts\..*:change` - изменение данных полей формы контактов
* `contacts:submit` - отправка формы с контактными данными пользователя
* `order:submit` - отправка формы со способом платежа и адресом

# Описание типов данных

## Интерфейс IProduct

Описывает информацию о товаре

```
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

## Интерфейс IBasket

Описывает содержимое корзины

```
export interface IBasket {
  items: string[];
  total: number;
}
```

## Интерфейс IOrder

Описывает информацию о заказе

```
export interface IOrder {
  payment: 'cash' | 'card';
  email: string;
  phone: string;
  address: string;
  items: string[];
  total: number;
}

```

## Тип OrderForm

Описывает данные формы заказа

```
export type OrderForm = Omit<IOrder, 'total' | 'items'>;
```

## Интерфейс IOrderResult

Описывает интерфейс результата заказа

```
export interface IOrderResult {
  id: string;
  total: number;
}
```

## Тип ApiListResponse<Type>

Описывает формат ответа от API

```
export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};
```