import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RouterModule,Routes } from '@angular/router';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { VentasFiltradasComponent } from './ventas-filtradas/ventas-filtradas.component';
import { EstadisticasAdminComponent } from './estadisticas-admin/estadisticas-admin.component';
import { EstudiantesModalComponent } from './estudiantes-modal/estudiantes-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {  ReactiveFormsModule } from '@angular/forms';
import { GuardarEstCompComponent } from './estadisticas-admin/guardar-est-comp/guardar-est-comp.component';
import { ProfesoresModalComponent } from './estadisticas-admin/profesores-modal/profesores-modal.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent,canActivate: [AuthGuard]},
  {path: 'clientes/form', component: FormComponent,canActivate: [AuthGuard]},
  {path: 'clientes/form/:id', component: FormComponent,canActivate: [AuthGuard]},
  {path: 'ventas-filtradas', component: VentasFiltradasComponent,canActivate: [AuthGuard]},
  {path: 'estadisticas-admin', component: EstadisticasAdminComponent,canActivate: [AuthGuard]},
  {path: 'guardar-estudiante', component: GuardarEstCompComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    LoginComponent,
    VentasFiltradasComponent,
    EstadisticasAdminComponent,
    EstudiantesModalComponent,
    GuardarEstCompComponent,
    ProfesoresModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
