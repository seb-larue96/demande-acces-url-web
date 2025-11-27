import { Component, computed, inject, signal } from '@angular/core';
import { AddAccessRequestModule } from '../../modules/add-access-request.module';
import { AccessRequestService } from '../../services/access-request-service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccessRequestRequest } from '../../interfaces/IAccessRequests';

@Component({
  selector: 'app-add-access-request',
  imports: [AddAccessRequestModule],
  templateUrl: './add-access-request.html',
  styleUrl: './add-access-request.scss',
})
export class AddAccessRequest {
  private accessRequestService = inject(AccessRequestService);
  private dialogRef = inject(MatDialogRef<AddAccessRequest>);
  private toastr = inject(ToastrService);

  accessRequestForm = signal<AccessRequestRequest>({
    url: '',
    reasonToRequest: '',
  });

  saveNewAccessRequest() {
    if(!this.isFormValid()) {
      this.showValidationError();
      return;
    }

    this.accessRequestService.addAccessRequest(this.accessRequestForm()).subscribe({
      next: newAccessRequest => {
        this.toastr.success(`Nouvelle demande d'accès: ${newAccessRequest.data.requestNumber} a été crée`, 'Succès');
      }
    });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private isFormValid = computed(() => {
    const form = this.accessRequestForm();
    return (
      form.url.trim() !== '' &&
      form.reasonToRequest.trim() !== ''
    );
  });

  private showValidationError() {
    this.toastr.error("Veuillez remplir tous les champs obligatoires.", "Erreur de validation");
  }
}
