import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
    private messageService: MessageService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.heroService.heroObservable.subscribe(
			{
				next: heroeArray => this.heroes = heroeArray.slice(1,5)
			}
		)
  }

  selectHeroDB(id: Number){
    this.heroService.selectHero(id);
    this.messageService.add(`HeroeService: heroe with id `+id+` has been selected.`);

    const detailDialog = this.dialog.open(HeroDetailComponent, {
      width: '250px',
    });

    detailDialog.afterClosed().subscribe();
  }
}