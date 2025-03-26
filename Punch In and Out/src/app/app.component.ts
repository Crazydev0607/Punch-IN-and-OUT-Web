import { Component,NgZone , Inject, PLATFORM_ID  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  template: `<router-outlet></router-outlet>`, 
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'voice-app';

  
}
