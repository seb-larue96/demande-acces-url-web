import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ListAccessRequestsModule } from '../../modules/list-access-requests.module';
import { AccessRequestService } from '../../services/access-request-service';
import { AccessRequestResponse } from '../../interfaces/IAccessRequests';
import { ViewAccessRequest } from '../view-access-request/view-access-request';
import { AddAccessRequest } from '../add-access-request/add-access-request';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-access-requests',
  imports: [ListAccessRequestsModule],
  templateUrl: './list-access-requests.html',
  styleUrl: './list-access-requests.scss'
})
export class ListAccessRequests implements OnInit, AfterViewInit {
  accessRequestService = inject(AccessRequestService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute)

  displayedColumns: string[] = ['requestNumber', 'url', 'requestStatus', 'actions'];
  dataSource = new MatTableDataSource<AccessRequestResponse>();
  accessRequests = this.accessRequestService.accessRequests;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.accessRequests();
    })
  }

  ngOnInit() {
    const type = this.route.snapshot.data['type'];

    if (type === 'admin') {
      this.accessRequestService.getAccessRequests();
    } else {
      this.accessRequestService.getAccessRequestsByUser();
    }
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
