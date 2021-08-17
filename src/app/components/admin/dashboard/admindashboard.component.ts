import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1, content: "Content will be populated here." },
          { title: 'Card 2', cols: 1, rows: 1, content: "Content will be populated here." },
          { title: 'Card 3', cols: 1, rows: 1, content: "Content will be populated here." },
          { title: 'Card 4', cols: 1, rows: 1, content: "Content will be populated here." }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1, content: "Content will be populated here."  },
        { title: 'Card 2', cols: 1, rows: 1, content: "Content will be populated here."  },
        { title: 'Card 3', cols: 1, rows: 2, content: "Content will be populated here."  },
        { title: 'Card 4', cols: 1, rows: 1, content: "Content will be populated here."  }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
