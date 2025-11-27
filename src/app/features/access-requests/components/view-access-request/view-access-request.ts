import { Component, inject, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewAccessRequestModule } from '../../modules/view-access-request.module';
import { AccessRequestService } from '../../services/access-request-service';
import { AccessRequestResponse } from '../../interfaces/IAccessRequests';

@Component({
  selector: 'app-view-access-request',
  imports: [ViewAccessRequestModule],
  templateUrl: './view-access-request.html',
  styleUrl: './view-access-request.scss',
})
export class ViewAccessRequest {
  private accessRequestService = inject(AccessRequestService);
  private dialogRef = inject(MatDialogRef<ViewAccessRequest>);
  private dialogData = inject(MAT_DIALOG_DATA);

  accessRequest: Signal<AccessRequestResponse | null>;

  constructor() {
    this.accessRequest = this.accessRequestService.selectedAccessRequest;
    this.accessRequestService.getAccessRequestById(this.dialogData.id).subscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
