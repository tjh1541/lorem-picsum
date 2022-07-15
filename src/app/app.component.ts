import { Component } from '@angular/core';

interface Data {
  id: string;
  author: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lorem-picsum';
  data = new Array<Data>();
  filteredImages = new Array<Data>();
  numImages = 0;
  filterText = '';
  dataLoading = false;

  validateKey(e: KeyboardEvent) {
    if (e.key == '-' || e.key == '.') {
      e.preventDefault();
    }
  }

  loadImages() {
    if (this.dataLoading) return;

    this.filteredImages = new Array();
    this.filterText = '';
    this.dataLoading = true;

    fetch(`https://picsum.photos/v2/list?limit=${this.numImages}`)
    .then(response => response.json())
    .then(d => {
      console.log(d);
      this.data = d;
      this.filteredImages = d;

      this.dataLoading = false;
    });
  }

  filter() {
    this.filteredImages = new Array();

    this.data.filter( (d:Data) => {
      if (d.id.toUpperCase().includes(this.filterText.toUpperCase()) || d.author.toUpperCase().includes(this.filterText.toUpperCase())) {
        this.filteredImages.push(d);
      }
    });
  }
}
