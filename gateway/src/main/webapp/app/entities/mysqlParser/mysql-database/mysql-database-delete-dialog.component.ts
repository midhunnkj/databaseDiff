import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMysqlDatabase } from 'app/shared/model/mysqlParser/mysql-database.model';
import { MysqlDatabaseService } from './mysql-database.service';

@Component({
    selector: 'jhi-mysql-database-delete-dialog',
    templateUrl: './mysql-database-delete-dialog.component.html'
})
export class MysqlDatabaseDeleteDialogComponent {
    mysqlDatabase: IMysqlDatabase;

    constructor(
        private mysqlDatabaseService: MysqlDatabaseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.mysqlDatabaseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mysqlDatabaseListModification',
                content: 'Deleted an mysqlDatabase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mysql-database-delete-popup',
    template: ''
})
export class MysqlDatabaseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mysqlDatabase }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MysqlDatabaseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mysqlDatabase = mysqlDatabase;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
