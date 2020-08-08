import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { GitSearchResultItem } from '../models';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  items: GitSearchResultItem[];

  constructor(public srv:FavoriteService) { }

  ngOnInit(): void {
    this.srv.getItems().subscribe(res=>{
      this.items = res;
    })
  }

  getItems() {
    debugger;
    return ; 
  }

  remove(item: GitSearchResultItem){
    this.srv.deleteItem(item).subscribe(res=>{
      this.items = this.items.filter(f=>f!=item);
    });
  }

}
