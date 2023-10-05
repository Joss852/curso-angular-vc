import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HeroesService } from '../../../services/heroes.service'
import { Heroe } from '../../../types/heroe'

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'superhero',
    'publisher',
    'alter_ego',
    'first_appearance',
    'characters',
    'alt_img',
    'actions'
  ];
  dataSource = new MatTableDataSource<Heroe>([]);

  constructor(private _liveAnnouncer: LiveAnnouncer, private _heroSrv: HeroesService) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this._heroSrv.getHeroes().subscribe(heroes => {
      this.dataSource.data = heroes;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
