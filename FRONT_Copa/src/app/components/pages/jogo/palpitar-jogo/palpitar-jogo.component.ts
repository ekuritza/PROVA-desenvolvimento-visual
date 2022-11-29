import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { } 

    jogoId!: number;
    sel1!: Selecao;
    sel2!: Selecao;
    placar1! : number;
    placar2! : number;
    sel1Id! : number;
    sel2Id! : number;
    erro!: string;
    jogos!: Jogo[];

  ngOnInit(): void {}


  alterar(): void {
    let jogo : Jogo = {
      id : this.jogoId,
      selecaoA : this.sel1,
      selecaoB : this.sel1,
      placar : this.placar1,
      placarB : this.placar2,
      selecaoAId : this.sel1Id,
      selecaoBId : this.sel2Id
    };
    this.http.patch<Jogo>('https://localhost:5001/api/selecao/alterar',
      jogo
    )
    .subscribe({
      next: (jogo) => {
        this.router.navigate(["pages/selecao/listar"]);
      },
      error: (error) => {
        if(error.status == 400){
          this.erro = "Erro de validação!";
        }else if(error.status == 0){
          this.erro = "Está faltando iniciar a sua API!";
        }
      },
    });
   }
}
