import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-modal-container',
  styleUrls: ['./modal.component.scss'],
  template: '',
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnDestroy {
  destroy = new Subject<number>();
  currentDialog = null;

  constructor(
    private modal: NzModalService,
    route: ActivatedRoute,
    router: Router
  ) {
    route.data.pipe(takeUntil(this.destroy)).subscribe((data: any) => {
      const modal = this.modal.create({
        nzContent: data.component,
        nzFooter: null,
        nzWidth: 'auto',
        nzClassName: data.className
      });
      modal.afterClose.subscribe(result => {
        router.navigate(['/'])
      });

    });
  }

  ngOnDestroy() {
    this.destroy.next(0);
  }
}
