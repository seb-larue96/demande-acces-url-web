import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserResponse } from '../../interfaces/IUsers';
import { MatPaginator } from '@angular/material/paginator';
import { ListUsersModule } from '../../modules/list-users.module';

@Component({
  selector: 'app-list-users',
  imports: [ListUsersModule],
  templateUrl: './list-users.html',
  styleUrl: './list-users.scss',
})
export class ListUsers implements OnInit, AfterViewInit {
  userService = inject(UserService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<UserResponse>();
  users = this.userService.users;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      this.dataSource.data = this.users();
    })
  }

  ngOnInit() {
    this.userService.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
