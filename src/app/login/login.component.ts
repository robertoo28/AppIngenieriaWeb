import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        data => {
          this.router.navigate(['/clientes']);
        },
        error => {
          this.error = "Error de inicio de sesión" + error.error.message;
        });
  }
}

