import {Component} from "./base/Component";
import {IProduct} from "../types";
import {ensureElement} from "../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category?: HTMLElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;

    private categoryColors: Map<string, string> = new Map([
      ['софт-скил', '#83FA9D'],
      ['другое', '#FAD883'],
      ['дополнительное', '#B783FA'],
      ['кнопка', '#83DDFA'],
      ['хард-скил', '#FAA083']
    ]);

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._price = ensureElement<HTMLImageElement>(`.card__price`, container);

        this._image = container.querySelector(`.card__image`)
        this._category = container.querySelector(`.card__category`)
        this._button = container.querySelector(`.card__button`);
        this._description = container.querySelector(`.card__description`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set price(value: string) {
      this.setText(this._price, value);
      if (this._button) {
        this._button.disabled = !value;
      }
    }

    get price(): string {
        return this._price.textContent || '';
    }

    set category(value: string) {
      this.setText(this._category, value);

      if (this._category) {
        const colorCategory = this.categoryColors.get(value.toLowerCase());

        if (colorCategory) {
            this._category.style.backgroundColor = colorCategory;
        }
      }
    }

    get category(): string {
        return this._category.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string | string[]) {
        this.setText(this._description, value);
    }

    set button(value: string) {
      this.setText(this._button, value);
    }
}