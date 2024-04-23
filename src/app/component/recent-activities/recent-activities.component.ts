import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Activity {
  time: string;
  description: string;
}

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class RecentActivitiesComponent implements OnInit {
  activities: Activity[];

  constructor() {
    this.activities = [
      { time: '10:30 AM', description: 'Logged in' },
      { time: '11:00 AM', description: 'Created a new project' },
      { time: '12:15 PM', description: 'Updated a report' },
      { time: '2:00 PM', description: 'Logged out' },
    ];
  }

  ngOnInit(): void {
  }
}