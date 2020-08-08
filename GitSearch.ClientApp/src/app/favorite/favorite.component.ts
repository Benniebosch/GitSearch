import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { GitSearchResultItem } from '../models';
import { SafePipe } from '../safe.pipe';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  items: GitSearchResultItem[];
  windowOpen = window.open;

  constructor(public srv:FavoriteService) { } //private safePipe: SafePipe

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

  // openLink(url: string){
  //   let safeUrl = this.safePipe.transform(url, 'url') as SafeUrl
  //   //safeUrl.
  //   //window.open(safeUrl.)
  // }

}
