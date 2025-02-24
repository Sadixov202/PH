import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'PH';

  selectedLogoFrame!: string;

  navigationItems = [
    { id: 'p1', img: 'assets/images/path/path-1.svg' },
    { id: 'p7', img: 'assets/images/path/path-2.svg' },
    { id: 'p9', img: 'assets/images/path/path-3.svg' },
    { id: 'p4', img: 'assets/images/path/path-4.svg' },
    { id: 'p10', img: 'assets/images/path/path-5.svg' },
    { id: 'p11', img: 'assets/images/path/path-6.svg' },
    { id: 'p8', img: 'assets/images/path/path-7.svg' },
    { id: 'p12', img: 'assets/images/path/path-8.svg' },
    { id: 'p13', img: 'assets/images/path/path-9.svg' },
    { id: 'p6', img: 'assets/images/path/path-10.svg' },
    { id: 'p3', img: 'assets/images/path/path-11.svg' },
    { id: 'p14', img: 'assets/images/path/path-12.svg' },
    { id: 'p15', img: 'assets/images/path/path-13.svg' },
    { id: 'p2', img: 'assets/images/path/path-14.svg' },
    { id: 'p5', img: 'assets/images/path/path-15.svg' },
  ];


  shuffledItems: any[] = [...this.navigationItems]; // Копируем массив для перемешивания
  correctCounter = 0;

  ngOnInit(): void {
    this.shuffleItems();
  }

  shuffleItems() {
    const array = [...this.navigationItems]; // Копируем исходный массив
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Меняем местами элементы
    }
    this.shuffledItems = array; // Обновляем порядок
  }

  logoPartClick(event: any) {
    this.selectedLogoFrame = event.target.id;

    document.querySelectorAll('svg path').forEach((path) => {
      if (path.getAttribute('fill-opacity') != '1') {
        path.setAttribute('fill-opacity', '0');
      }
    });
    if (event.target.getAttribute('fill-opacity') != '1') {
      event.target.setAttribute('fill-opacity', '0.2');
    }
  }

  onSelectPart(part: any) {
    const selectedPartId = part.target.getAttribute('data-id');
    const selectedPart = part.target as HTMLAnchorElement;
    const modal = document.getElementById('modal');
    if (this.selectedLogoFrame) {
      if (this.selectedLogoFrame == selectedPartId) {
        const correct = document.getElementById(this.selectedLogoFrame);
        correct?.setAttribute('fill-opacity', '1');
        selectedPart.classList.add('hidden');
        this.selectedLogoFrame = '';
        this.correctCounter++;
        
        if (this.correctCounter == 8) {
          modal?.classList.add('open');
        }
      } else {
        // selectedPart.classList.remove('hidden');
        selectedPart.classList.add('shake');
        // Через 1 секунду (1000 миллисекунд) удаляем класс
        setTimeout(() => {
          selectedPart.classList.remove('shake');
        }, 500);
      }
    }
  }

  closeModal () {
    const modal = document.getElementById('modal');
    modal?.classList.remove('open');
    window.location.reload();
  }

}
