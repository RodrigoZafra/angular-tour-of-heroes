import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
    private messageService: MessageService,
    public dialog: MatDialog,
    ) {
  }

  ngOnInit(): void {
	  this.heroService.heroObservable.subscribe(
		  h => this.heroes = h
	  );
  }

  selectHero(id: Number){
    this.heroService.selectHero(id);
    this.messageService.add(`HeroeService: heroe with id `+id+` has been selected.`)

    const detailDialog = this.dialog.open(HeroDetailComponent, {
      width: '250px',
    });

    detailDialog.afterClosed().subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
   this.heroService.addHero(name);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id);
  }
}