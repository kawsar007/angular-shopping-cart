import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey:string = "";
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
     this.api.getAllProducts().subscribe((result:any) => {
      this.productList = result;
      this.filterCategory = result;

      this.productList.forEach((a:any) => {
        if(a.category === "women's clothing" || a.category === "men's clothing"){
          a.category = "fashion"
        }
        Object.assign(a, {quantity:a,total:a.price});
      });      
     });

     this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
     })
  }

  addtoCart(item:any){
    this.cartService.addToCart(item)
  }

  filterProduct(category:string){
    this.filterCategory = this.productList.filter((a:any) => {
      if(a.category === category || category == ''){
        return a;
      }
    });
  }

}
