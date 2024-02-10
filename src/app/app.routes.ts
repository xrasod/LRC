import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {DebugComponent} from "./pages/debug/debug.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: 'utbildningstillfalle',
    component: DebugComponent
  },
  {
    path: 'utbildningsinstans',
    component: DebugComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
