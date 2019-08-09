import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  user: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.queryParams.user;
    if (!this.user) {
      this.router.navigate(['/']);
    }
  }

}
