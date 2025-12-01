import { Component, output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  viewChange = output<string>();

  navigateTo(view: string): void {
    this.viewChange.emit(view);
  }
}
