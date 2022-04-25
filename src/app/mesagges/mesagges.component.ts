import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-mesagges',
  templateUrl: './mesagges.component.html',
  styleUrls: ['./mesagges.component.css']
})

export class MesaggesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
