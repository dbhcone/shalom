import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './add-member.component';
import { EditMemberComponent } from './edit-member.component';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'surname',
    'firstName',
    'otherNames',
    'gender',
    'primaryMobileNumber',
    'edit',
    'delete',
  ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource: MatTableDataSource<any>;
  subscription?: Subscription;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private auth: AuthService) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // const us: any[] | undefined = [];
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    this.dataSource = new MatTableDataSource();
    this.fetchMembersList();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    // this.auth.getMembersList().subscribe((res: any)=> {
    //   console.log(res);
    //   this.dataSource.data = res.data;
    //   // return res
    // });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchMembersList(): void {
    this.auth.getMembersList().subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res.data;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px',
      disableClose: true,
    });
    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog closed', result);
      this.fetchMembersList();
    });
  }

  openEditMemberDialog(data: any) : void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px',
      disableClose: true,
      data
    });
    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog closed', result);
      this.fetchMembersList();
    });
  }

  editMember(member: any) {
    console.log("Editting...", member)
  }

  deleteMember(member: any) {
    console.log("Deleting...", member);
    this.triggerDelete();
  }

  triggerDelete () {
    Swal.fire ({
      title: 'Are you sure?',
      text: `You will not be able to recover user's data!`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
    .then(() => {
      Swal.fire(
        'Deleted!',
        'User details has been deleted.',
        'success'
      )
    }, (dismiss) =>{
      console.log("dismiss", dismiss)
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
