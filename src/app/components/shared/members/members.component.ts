import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shared-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
      // 'username',
      'surname',
      'firstName',
      'otherNames',
      'occupation',
      'gender',
      'primaryMobileNumber'
  ];
  dataSource: MatTableDataSource<any>;
  subscription?: Subscription;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private auth: AuthService) {
      this.dataSource = new MatTableDataSource();
      this.fetchMembersList();
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  fetchMembersList(): void {
      this.auth.getMembersList().subscribe((res: any) => {
          console.log(res);

          this.dataSource.data = res.data.map((member: any) => {
              return { ...member.accountOwner };
          });
      });
  }
  applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  }

  linkToProfile (member: any) {
      return `<a routerLink="/user/profile/${member._id}">Something</a>`
  }
}
