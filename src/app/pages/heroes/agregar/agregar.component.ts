import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../../types/heroe';
import { HeroesService } from '../../../services/heroes.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  form = new FormGroup({
    superhero: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    alter_ego: new FormControl('', [Validators.required]),
    first_appearance: new FormControl('', [Validators.required]),
    characters: new FormControl('', [Validators.required]),
    alt_img: new FormControl(''),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _heroeSrv: HeroesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this._heroeSrv.getHeroe(params['id']).subscribe((heroe: Heroe) => {
        this.form.setValue({
          superhero: heroe.superhero,
          publisher: heroe.publisher,
          alter_ego: heroe.alter_ego,
          first_appearance: heroe.first_appearance,
          characters: heroe.characters,
          alt_img: heroe.alt_img ? heroe.alt_img : '',
        })
      })
    })
  }

  updateHero() {
    const hero: Heroe = {
      id: this.route.snapshot.params['id'],
      superhero: this.form.value.superhero + '',
      publisher: this.form.value.publisher + '',
      alter_ego: this.form.value.alter_ego + '',
      first_appearance: this.form.value.first_appearance + '',
      characters: this.form.value.characters + '',
      alt_img: this.form.value.alt_img + '',
    }

    //? Verifica si tienes un id en la ruta
    if (this.route.snapshot.params['id']) {
      //* Editar
      this._heroeSrv.updateHero(this.route.snapshot.params['id'], hero).subscribe(() => {
        this._snackBar.open('Heroe actualizado', 'Cerrar')
        this.router.navigate(['/heroes/listado']);
      })
      return;  
    }

    //* Crear
    this._heroeSrv.addHeroe(hero).subscribe(() => {
      this._snackBar.open('Heroe guardado', 'Cerrar')
      this.router.navigate(['/heroes/listado']);
    })

  }

}
