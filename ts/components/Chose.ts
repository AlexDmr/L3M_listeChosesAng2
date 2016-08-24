import { Component, Input 	} from "@angular/core";
//import {htmlTemplate		} from "../IHM/Chose.html";
const htmlTemplate = `
	<section class="chose">
		<input 		type 			= "checkbox" 
					[ngModel]		= "data.fait" 
					(click)         = "setFait($event)"
					aria-label 		= "Tâche réalisée ou pas"
					/>
		<input		type            = "text"
		            [value] 		= "data.texte"
		            (input)         = "setText($event)"
					aria-label 		= "Description de la tâche"
					/>
		<label>{{data.date | date}}</label>
		<button 	class 		= "remove" 
					(click) 	= "dispose()"
					>X</button>
	</section>
`;

import * as nf from "../nf/nf";

@Component({
  selector		: "comp-chose",
  template		: htmlTemplate
})
export class CompChose {
	@Input() data	: nf.Chose;
	dispose	() {
		this.data.dispose();
	}
	setText(event) {
		this.data.Texte( event.target.value );
	}
	setFait(event) {
		this.data.Fait( event.target.checked );
	}
};

