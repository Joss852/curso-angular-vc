import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/heroes/agregar/agregar.component'
import { ListadoComponent } from './pages/heroes/listado/listado.component'

const routes: Routes = [
  {
    path: 'heroes/agregar',
    component: AgregarComponent
  },
  {
    path: 'heroes/listado',
    component: ListadoComponent
  },
  {
    path: 'heroes/:id',
    component: AgregarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
