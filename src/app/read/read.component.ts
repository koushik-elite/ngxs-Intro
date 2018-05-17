import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Tutorial } from './../models/tutorial.model'
import { TutorialList } from '../models/tutorials.model'
import { TutorialState } from './../state/tutorial.state' // We will use this shortly
import { Observable } from 'rxjs/RX';
import { RemoveTutorial } from './../actions/tutorial.actions'

import { RealtimeFreelancersService } from '../services/freelancer.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  //@Select(TutorialState.getTutorials) public tutorials$: Observable<Tutorial>
  public tutorials$: Observable<Tutorial>;

  constructor(private store: Store, private _freelancers: RealtimeFreelancersService) {
      this.tutorials$ = this.store.select(state => { 
        console.info("State");
        console.log(state);
        return state.tutorials.tutorials
      })
  }

  delTutorial(name) {
    this.store.dispatch(new RemoveTutorial(name))
  }

  ngOnInit() {
    this._freelancers.run();
  }

}