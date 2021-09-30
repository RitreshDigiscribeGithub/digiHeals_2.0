import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService, NzMessageDataOptions } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  public title = new BehaviorSubject('Welcome Dr./ Clinic');

  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  setTitle(title) {
    this.title.next(title);
  }

  createMessage(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string,
    content?: string,
    options?: NzMessageDataOptions
  ): void {
    this.message.create(type, content, options);
  }

  createNotification(
    type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
    title?: string,
    content?: string
  ): void {
    this.notification.create(
      type,
      title ? title : type.toLocaleUpperCase(),
      content
    );
  }

  showConfirm(
    callback = () => {},
    title: string = 'Do you Want to delete these items?',
    content?: string
  ): NzModalRef {
    return this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () => {
        callback();
      },
    });
  }
}
