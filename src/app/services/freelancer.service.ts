import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/first';
import { AddTutorial } from './../actions/tutorial.actions'
import { TutorialList } from '../models/tutorials.model'
import { Tutorial } from '../models/tutorial.model'

@Injectable()
export class RealtimeFreelancersService {
  private USER_API_URL = 'https://randomuser.me/api/?results=';

  constructor(private store: Store, private http: Http) {}

  private toFreelancer(value: any) {
    return {
      name: value.name.first + ' ' + value.name.last,
      email: value.email,
      thumbnail: value.picture.large
    }
  }

  private random(y) {
    return Math.floor(Math.random() * y);
  }

  public run() {
    this.http.get(`${this.USER_API_URL}10`).subscribe((response) => {
      let tutorialList = response.json();
      for(let i=0; i<tutorialList.results.length; i++){
        let tutorial = <Tutorial>tutorialList.results[i];
        console.log(tutorial);
        this.store.dispatch(new AddTutorial(tutorial));
      }
    });
    /*
    setInterval(() => {

      this.http.get(`${this.USER_API_URL}${this.random(10)}`).subscribe((response) => {
        this.store.dispatch({
          type: ACTIONS.INCOMING_DATA,
          payload: {
            ADD: response.json().results.map(this.toFreelancer),
            DELETE: new Array(this.random(6)).fill(0).map(() => getDeletedIndex()),
          }
        });
        this.addFadeClassToNewElements();
      });
      
      this.store.dispatch(new AddTutorial({name: name, url: url}))
      this.store.select('freelancers').first().subscribe((freelancers: Array<IFreelancer>) => {
        let getDeletedIndex = () => {
          return this.random(freelancers.length - 1);
        }
        this.http.get(`${this.USER_API_URL}${this.random(10)}`).subscribe((response) => {
          this.store.dispatch({
            type: ACTIONS.INCOMING_DATA,
            payload: {
              ADD: response.json().results.map(this.toFreelancer),
              DELETE: new Array(this.random(6)).fill(0).map(() => getDeletedIndex()),
            }
          });
          this.addFadeClassToNewElements();
        });
      });

    }, 10000);*/
  }

  private addFadeClassToNewElements() {
    let elements = window.document.getElementsByClassName('freelancer');
    for (let i=0; i < elements.length; i++) {
      if (elements.item(i).className.indexOf('fade') === -1) {
        elements.item(i).classList.add('fade');
      }
    }
  }

}
