import { Component, OnInit } from '@angular/core';
import { AwsService } from '../services/aws.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'uf-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  apps: any;
  selectedApp: any;
  searchString$ = new Subject<string>();
  results: any[] = [];
  searchBar: FormControl = new FormControl();

  constructor(private searchService: AwsService) { 
    this.apps = [
      {id: 1, name: "Instagram"},
      {id: 2, name: "Twitter"},
      {id: 3, name: "Soundcloud"}
    ];

    this.searchService.triggerSearch(this.searchString$)
      .subscribe(awsResult => {
        let arr = [];
        let responseJson = JSON.parse(awsResult);
        arr.push(responseJson.Item);
        this.results = arr;
      })

  }

  ngOnInit() {
    // this.searchBar.valueChanges
    // .debounceTime(500)
    // .subscribe(searchBar => this.searchService.scanDbForUsernames(searchBar)
    // .subscribe(response => this.results = response.json()));
    
  }





    
  

  

}
