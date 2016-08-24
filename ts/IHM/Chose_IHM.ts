const htmlTemplate = `
	<section class="chose">
		<input 		type 			= "checkbox" 
					aria-label 		= "Tâche réalisée ou pas"
					/>
		<input		type            = "text"
		            aria-label 		= "Description de la tâche"
					/>
		<label class="date"></label>
		<button 	class 		= "remove">X</button>
	</section>
`;

import * as NF from "../NF/nf";
import {ComponentIHM} from "./ComponentIHM";

export class ChoseIHM extends ComponentIHM {
	private ihm: {texte: HTMLInputElement, date: HTMLElement, fait: HTMLInputElement, supprimer: HTMLInputElement};
	constructor(public NF: NF.Chose, public root: Element) {
		super(NF, root);
		this.root.innerHTML = htmlTemplate;
		this.ihm = {
			texte		: <HTMLInputElement>root.querySelector( "input[type=text]" ),
			date		: <HTMLElement>root.querySelector( "label.date" ),
			fait		: <HTMLInputElement>root.querySelector( "input[type=checkbox]"  ),
			supprimer	: <HTMLInputElement>root.querySelector( "button.remove"  )
		};
		this.ihm.date.innerText = NF.date.toDateString();
		this.ihm.texte.value = NF.texte;
		this.ihm.fait.checked = NF.fait;

		// Abonnement aux évènements utilisateurs
		this.ihm.fait.onchange  = () => NF.Fait( this.ihm.fait.checked );
		this.ihm.texte.onchange = this.ihm.texte.onkeyup = () => NF.Texte( this.ihm.texte.value );
		this.ihm.supprimer.onclick = () => NF.dispose();

		// Abonnement au Noyau fonctionnel
		NF.on("update", () => this.updateFromNF());
	}
	updateFromNF() {
		this.ihm.texte.value	= this.NF.texte;
		this.ihm.fait.checked	= this.NF.fait;
	}
}
