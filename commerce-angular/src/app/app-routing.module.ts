import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroProdutosComponent } from './pages/cadastro-produtos/cadastro-produtos.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-produtos', component: CadastroProdutosComponent, canActivate: [AuthGuard] },
  { path: 'carrinho', component: CarrinhoComponent, canActivate: [AuthGuard] },
  // { path: 'produtos', component: null },
  // { path: 'admim', component: null },
  { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
