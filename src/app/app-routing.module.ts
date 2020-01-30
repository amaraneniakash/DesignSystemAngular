import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalNavComponent } from './global-nav/global-nav.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { FilterComponent } from './filter/filter.component';


const routes: Routes = [
  { path: 'globalNav', component: GlobalNavComponent },
  { path: 'productTile', component: ProductTileComponent },
  { path: 'filter', component: FilterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
