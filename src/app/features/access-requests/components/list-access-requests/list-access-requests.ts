import { AfterViewInit, Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ListAccessRequests implements OnInit, AfterViewInit {
  accessRequestService = inject(AccessRequestService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute)

  displayedColumns: string[] = ['requestNumber', 'url', 'requester', 'requestStatus', 'actions'];
  dataSource = new MatTableDataSource<AccessRequestResponse>();

  accessRequests = this.accessRequestService.accessRequests;
  toolbarTitle = signal<string>('');
  routeType = signal<'admin' | 'user'>('user');

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.accessRequests();
    })
  }

  ngOnInit() {
    const type = this.route.snapshot.data['type'];

    if (type === 'admin') {
      this.toolbarTitle.set("Liste de demandes d'accès URL");
      this.accessRequestService.getAccessRequests();
      this.routeType.set('admin');
    } else {
      this.toolbarTitle.set("Mes demandes d'accès URL");
      this.accessRequestService.getAccessRequestsByUser();
      this.routeType.set('user');
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
