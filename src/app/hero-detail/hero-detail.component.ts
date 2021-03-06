import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { Hero } from '../hero';
import { Powers } from '../hero';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroesComponent } from '../heroes/heroes.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('nameChanges', [
      state('none', style({
        color: "warn"
      })),
      state('changes', style({
        background: "red",
        color: "white"
      })),
      transition('none <=> changes', [
        animate('1s')
      ]),
    ])
  ]
})

export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero | undefined;
  detailSubscription: Subscription | undefined;
  fb: FormBuilder = new FormBuilder;
  form!: FormGroup;
  activatedPowers: string[] | undefined = [];



  data = Powers;
  data2 = Object.values(Powers);


  //animations
  isWritten: boolean = false;

  heroNameForm = new FormControl('');

  constructor(
    private heroService: HeroService,
    private location: Location,
    public detailDialog: MatDialogRef<HeroesComponent>,
  ) {
  }


  ngOnInit(): void {
    this.detailSubscription = this.heroService.specificHeroObservable.subscribe(
      h => {
        this.hero = h;
        this.activatedPowers = this.hero?.powers;
        //this.form = this.initForm();
        this.formControl();
      }
    );
    console.log(this.data);
  }

  initForm(): FormGroup {
    return this.fb.group({

      // force: this.activatedPowers?.includes(Powers.force),
      // elasticity: this.activatedPowers?.includes(Powers.elasticity),
      // invisibility: this.activatedPowers?.includes(Powers.invisibility)
    })
  }

  formControl() {
    this.form = this.initForm();
    this.data2.forEach(p => this.form.addControl(p, this.fb.control(this.activatedPowers?.includes(p))));
  }

  noChanges() {
    if (this.heroNameForm.value !== '') {
      this.isWritten = true
    } else {
      this.isWritten = false;
    }
  }

  ngOnDestroy() {
    this.detailSubscription?.unsubscribe();
  }

  goBack(): void {
    this.detailDialog.close();
  }

  save(): void {
    if (this.hero) {
      this.hero.name = this.heroNameForm.value;

      let heroe = this.form.value;
      this.activatedPowers = [];

      for (const [power, activated] of Object.entries(heroe)) {
        if (activated == true) {
          this.activatedPowers?.push(power);
        }
      }

      this.hero.powers = this.activatedPowers;

      this.heroService.updateHero(this.hero);
      this.detailDialog.close();
    }
  }
}
