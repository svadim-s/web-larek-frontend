import {Form} from "./common/Form";
import {OrderForm} from "../types";
import {EventEmitter} from "./base/Events";

export class Contacts extends Form<OrderForm> {
    constructor(events: EventEmitter, container: HTMLFormElement) {
        super(events, container);
    }

    set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}