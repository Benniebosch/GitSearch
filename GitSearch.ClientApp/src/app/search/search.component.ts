import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from '../search.service';
import { FavoriteService } from '../favorite.service';
import { GitSearchResultItem } from '../models';
import { BehaviorSubject } from 'rxjs';
//import { GitRepositoryInfo } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  query = new FormControl('', Validators.required);
  gitRepositoryInfo = new FormControl('', Validators.required);

  searchResults: GitSearchResultItem[] = [];
  loading: boolean;

  constructor(private searchService:SearchService, private favoriteService:FavoriteService ) { }

  ngOnInit(): void {
  }

  addToFavorite(){
    if(this.gitRepositoryInfo.valid) {
      let val = this.gitRepositoryInfo.value;
        this.favoriteService.add(val).subscribe();
    }
  }

  search(){
    console.log(this.query.value);

    if (this.query.valid) {
      this.loading = true;
      this.searchService.search(this.query.value).subscribe((res) => {
        this.searchResults = res;
        this.loading = false;
      });
    }
  }

  checkPrivate(){
      this.searchService.checkPrivate().subscribe();
  }

  ngOnDestroy(): void {
  }

}
