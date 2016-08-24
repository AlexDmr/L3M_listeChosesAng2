import { Injectable } from "@angular/core";
import * as NF from "./nf";

@Injectable()
export class ListeChosesService {
    nf: NF.ListeChoses;
    constructor() {
        this.nf = new NF.ListeChoses();
    }
    getData	() : Promise<NF.ListeChoses> {
        return new Promise<NF.ListeChoses>( (resolve) => { setTimeout(() => resolve( this.nf ), 500); } );
    }
};
