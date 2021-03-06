import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

// services
import {UsuarioService} from 'src/app/core/services/usuario.service';
import {HeaderService} from '../../../core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showBackLoginBtn: boolean = false;
  public showDashboard: boolean = false;
  items: MenuItem[];
  changeColor = true;
  classTopBar: string;

  constructor(
    private headerService: HeaderService,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
  }

  topbar() {
    if (this.showDashboard) {
      this.classTopBar = 'topbar';
    } else {
      this.classTopBar = 'header';
    }
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Mi perfil',
        icon: 'pi pi-user',
        routerLink: '/perfil',

      },
      {
        separator: true,
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-power-off',
        command: () => {
          this.logout();
        }
      },];

    this.headerService.showLoginBtn.subscribe((showBtn) => {
      this.showBackLoginBtn = showBtn;
      this.topbar();
    });

    this.headerService.dashBoardLogin.subscribe((showDashboard) => {
      this.showDashboard = showDashboard;
      this.topbar();
    });
  }


  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  update() {
    this.changeColor = !this.changeColor;
  }
}
