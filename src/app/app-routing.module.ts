import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { MainContentComponent } from './component/main-content/main-content.component';

const routes: Routes = [
    { path: 'dashboard', component: MainContentComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}