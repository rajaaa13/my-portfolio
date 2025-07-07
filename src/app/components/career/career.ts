import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-career',
  imports: [CommonModule],
  templateUrl: './career.html',
  styleUrl: './career.css',
})
export class Career implements AfterViewInit {
  careerList = [
    {
      role: 'IT Analyst (C2)',
      company: 'Tata Consultancy Services',
      period: '2023 – Present',
      points: [
        'Worked for european banking clients',
        'Developed finance applications',
        'migrated legacy systems to Angular',
      ]
    },
    {
      role: 'Senior Analyst',
      company: 'Accenture',
      period: '2021 – 2023',
      points: [
        'Developed Industry standard Enterprise applications',
        'which monitors the health of the plant, can manage assets',
        'can able to create KPI dashboards, to check standard of performance',
      ]
    },
    {
      role: 'Senior Systems Engineer',
      company: 'Infosys Limited',
      period: '2018 – 2021',
      points: [
        'Worked for Japanese construction company',
        'developed internal applications, to design and manage construction projects',
        'to log & maintain data related to contruction projects'
      ]
    }
  ];

  visibleIndex = -1;

  ngAfterViewInit() {
    let index = 0;
    const reveal = () => {
      if (index < this.careerList.length) {
        this.visibleIndex = index;
        index++;
        setTimeout(reveal, 400); // Delay between items
      }
    };
    reveal();
  }
}
