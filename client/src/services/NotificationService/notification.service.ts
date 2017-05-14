import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    private notificationsWrapper: HTMLElement;

    constructor () {
        this.notificationsWrapper = document.createElement("div");
        this.notificationsWrapper.classList.add("notification-wrapper");
        document.body.appendChild(this.notificationsWrapper);
    }

    error(error: string): void {
        this.showMessage_(error, "#cc0000");
    }

    note(message: string): void {
        this.showMessage_(message, "#009ee8");
    }

    showMessage_(message: string, color: string) {
        let block: HTMLElement = document.createElement("div");
        block.innerText = message;
        block.classList.add("notification-block");
        block.style.background = color;
        this.notificationsWrapper.appendChild(block);
        setTimeout(() => {
            this.notificationsWrapper.removeChild(block);
        }, 6000);
    }
}