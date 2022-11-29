import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-cadastrar-jogo",
  templateUrl: "./cadastrar-jogo.component.html",
  styleUrls: ["./cadastrar-jogo.component.css"],
})
export class CadastrarJogoComponent implements OnInit {

  selecoes!: Selecao[];
  
  selecaoAId!: number;
  selecaoBId!: number; 
  selecaoA?: Selecao;
  selecaoB?: Selecao;
  placar?: number;
  placarB?: number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar")
      .subscribe({
        next: (selecoes) => {
          this.selecoes = selecoes;
        }
      });
  }
  cadastrar(): void {

    
    let jogo : Jogo = {
      selecaoAId : this.selecaoAId,
      selecaoBId : this.selecaoBId,
      
    };
    console.log(jogo);

    this.http.post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogo)
    .subscribe({
      next: (jogo) => {
        this.router.navigate(["pages/jogo/listar"]);
      },

    });
  }
}