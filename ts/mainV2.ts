/* Noyau fonctionnel */
import {ListeChosesService}	from "./nf/service";
import {ListeChoses}		from "./nf/nf";

/* Version sans framework */
import {ListeChosesIHM} from "./IHM/listeChoses_IHM";
let PromesseDocumentPret = new Promise( (resolve) => {
	if(document.readyState === "complete") {
		resolve();
	} else {
		document.body.onload = () => resolve();
	}
});

/* Version avec le framework Angular 2 */
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";
import { Component 	} 		from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { NgModule } 		from "@angular/core";
import { FormsModule }   	from "@angular/forms";

import {ListeChosesComponent}	from "./components/ListeChoses";

@Component({
  selector		: "archi-logicielle",
  template		: `	<section *ngIf="!initDone">Chargement...</section>
  					<liste-chose *ngIf="initDone" [data]="data"></liste-chose>
				  `,
  directives	: [ListeChosesComponent],
  providers		: [ListeChosesService]
})
class ArchiLogicielle {
	data 			: ListeChoses;
	initDone		: boolean;
	constructor		(listeService: ListeChosesService) {
		this.initDone = false;
		listeService.getData().then((data) => {this.initDone = true; this.data = data;});

		// Juste pour initialiser les données dans le cadre d'Angular
		Promise.all( [listeService.getData(), PromesseDocumentPret]).then(
			([data]) => new ListeChosesIHM(data, "#sansFramework")
		);
	}
}

//enableProdMode();
@NgModule({
	imports     : [BrowserModule, FormsModule],
	declarations: [ArchiLogicielle],
	bootstrap   : [ArchiLogicielle]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

