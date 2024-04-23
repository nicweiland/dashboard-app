import { Component } from '@angular/core';
import { DataVisualizationComponent } from '../data-visualization/data-visualization.component';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [DataVisualizationComponent, RecentActivitiesComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
