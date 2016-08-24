// import "./listeChoses_IHM.css";
//import {htmlTemplate} from "./ListeChoses.html";
const htmlTemplate = `
	<form action="#">
		<label>Entrer une nouvelle chose à faire</label>
		<input type="text"/>
	</form>
	<br/>
	<label class="nbChoses"></label>
	<section class="liste"></section>
`;

import * as NF 			from "../NF/nf";
import {ComponentIHM} 	from "./ComponentIHM";
import {ChoseIHM}		from "./Chose_IHM";

export class ListeChosesIHM extends ComponentIHM {
	public root	: Element;
	public ihm	: {liste: Element, nouvelleChose: HTMLInputElement, formulaire: HTMLFormElement, choses: ChoseIHM[]};
	constructor(public NF: NF.ListeChoses, rootSelector) {
		super(NF, document.querySelector( rootSelector ));
		this.root.innerHTML = htmlTemplate;
		this.ihm = {
			liste 			: this.root.querySelector( ".liste" ),
			nouvelleChose	: <HTMLInputElement>this.root.querySelector( "input" ),
			formulaire		: <HTMLFormElement>this.root.querySelector( "form" ),
			choses 			: []
		};

		// Abonnement pour créer de nouvelles choses à faire
		this.ihm.formulaire.addEventListener("submit", (e) => {
			NF.Ajouter( this.ihm.nouvelleChose.value );
			this.ihm.nouvelleChose.value = "";
			e.preventDefault();
			e.stopImmediatePropagation();
		}, false);

		// Abonnement au Noyau fonctionnel
		NF.on("update", () => this.updateFromNF());
	}
	updateFromNF() {
		// On détruit les IHM de choses à faire déjà existantes
		this.ihm.choses.forEach( c => c.dispose() );
		this.ihm.choses = [];
		// On crée les IHM de choses à faire par rapport au noyau fonctionnel
		this.NF.choses.forEach( c => {
			var div = document.createElement( "div" );
			this.ihm.liste.appendChild( div );
			this.ihm.choses.push( new ChoseIHM(c, div) );
		});
	}
};
