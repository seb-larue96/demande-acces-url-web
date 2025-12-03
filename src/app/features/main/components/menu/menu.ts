import { Component, inject } from '@angular/core';
import { Sidenav } from '../../../../shared/layout/components/sidenav/sidenav';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { ConfirmationDialogData } from '../../../../shared/misc/interfaces/IConfirmationDialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../../shared/misc/components/confirmation-dialog/confirmation-dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  imports: [Sidenav],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  userName = this.authService.userName;

  logout() {
    const dialogData: ConfirmationDialogData = {
      dialogTitle: 'Confirmation de déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      confirmButtonLabel: 'Oui, se déconnecter'
    };
    
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.authService.logout().subscribe({
          next: () => this.toastr.success('Déconnexion réussie', 'Succès'),
        });
      }
    })
  }
}
