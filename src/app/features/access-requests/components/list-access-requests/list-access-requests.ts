import { Component, effect, inject, Signal, ViewChild } from '@angular/core';
import { ListAccessRequestsModule } from '../../modules/list-access-requests.module';
import { AccessRequestService } from '../../services/access-request-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AccessRequestResponse } from '../../interfaces/IAccessRequests';

@Component({
  selector: 'app-list-access-requests',
  imports: [ListAccessRequestsModule],
  templateUrl: './list-access-requests.html',
  styleUrl: './list-access-requests.scss'
})
export class ListAccessRequests {
  accessRequestService = inject(AccessRequestService);

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
}
