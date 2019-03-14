import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { HeaderService } from '@shared/services/header.service';
import {AuthService} from './auth/services/auth.service';
import {Subscription} from 'rxjs';
import {SpinnerService} from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  headerItems: any[];
  isLoggedIn: boolean;
  private isLoggedIn$: Subscription;
  public showSpinner: boolean;

  constructor(private headerService: HeaderService,
              private authService: AuthService,
              private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.initUser();
    this.headerService.getMenuItems().subscribe(data => {
      this.headerItems = data;
    });
    this.spinnerService.showSpinner.subscribe((value) => {
      this.showSpinner = value;
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.isLoggedIn$.unsubscribe();
  }
}
