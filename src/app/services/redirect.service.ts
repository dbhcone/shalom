import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }

  to(path?: string) : void{
    this.router.navigate([path ? path : '/']);
  }
}
