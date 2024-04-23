import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from "./component/main-content/main-content.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { HeaderComponent } from "./component/header/header.component";
import { RealTimeDataComponent } from './component/real-time-data/real-time-data.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MainContentComponent, SidebarComponent, HeaderComponent, RealTimeDataComponent, AnalyticsComponent]
})
export class AppComponent {
}
