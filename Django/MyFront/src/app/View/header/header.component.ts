import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import Timeline from 'gsap';
import gsap from 'gsap';
import { AuthService } from 'src/app/Controller/auth/auth.service';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  isLog: boolean = false

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    var fm_opts = { delay: 0.5 },
      fm_fromOpts = { drawSVG: '0' },
      fm_toOpts = { drawSVG: '100% 0', 'visibility': 'visible' },
      // fmtl        = new Timeline(fm_opts),
      fmtl = gsap.timeline({ fm_opts }),
      fm_path = document.querySelectorAll('.fm-logo path'),
      fm_circle = document.querySelectorAll('.fm-logo circle');

    fmtl.fromTo(fm_path, { duration: 0.375, ...fm_fromOpts }, { duration: 0.375, ...fm_toOpts })
      .to(fm_circle, { duration: 1, fill: '#E0D252' });

    this._authService.user.subscribe(data => {
      if (data)
        this.isLog = true
      else
        this.isLog = false
    })
  }

  Logout() {
    this._authService.logout()
    this.router.navigateByUrl('/login')
  }
}







