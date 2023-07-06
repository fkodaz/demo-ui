import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  mobileFilterVisible: boolean = false;

  showFilter() {
    this.mobileFilterVisible = true;
  }

  hideFilter() {
    this.mobileFilterVisible = false;
  }
}
