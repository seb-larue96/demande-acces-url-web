import { Component, effect, inject, Signal, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ListAccessRequestsModule } from '../../modules/list-access-requests.module';
import { AccessRequestService } from '../../services/access-request-service';
import { AccessRequestResponse } from '../../interfaces/IAccessRequests';
import { ViewAccessRequest } from '../view-access-request/view-access-request';
import { AddAccessRequest } from '../add-access-request/add-access-request';

@Component({
  selector: 'app-list-access-requests',
  imports: [ListAccessRequestsModule],
  templateUrl: './list-access-requests.html',
  styleUrl: './list-access-requests.scss'
})
export class ListAccessRequests {
  accessRequestService = inject(AccessRequestService);
  private dialog = inject(MatDialog)

  displayedColumns: string[] = ['requestNumber', 'url', 'requestStatus', 'actions'];
  dataSource: MatTableDataSource<AccessRequestResponse> = new MatTableDataSource<AccessRequestResponse>();
  accessRequests: Signal<AccessRequestResponse[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.accessRequests = this.accessRequestService.accessRequests;

    effect(() => {
      this.dataSource.data = this.accessRequests();
    })
  }

  ngOnInit() {
    this.accessRequestService.getAccessRequests().subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewAccesRequest(id: number) {
    this.dialog.open(ViewAccessRequest, {
      height: 'auto',
      width: '600px',
      data: {
        'id': id
      }
    });
  }

  addAccessRequest() {
    this.dialog.open(AddAccessRequest, {
      height: 'auto',
      width: '600px',
    })
  }
}
