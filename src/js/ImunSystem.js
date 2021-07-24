import Antibody from "./Antibody";

export default class ImunSystem {
    constructor(ag) {
        this.antigen = ag; //Almacena el antigeno
        this.antibodies = this.generateAb(); // Almacena todos los anticuerpos
        this.cycles = 10; //Para 10 generaciones
    }

    start() {
        let counter = 0;
        while (counter++ <= this.cycles) {
            // Cálculo de la afinidad de los anticuerpos con un antígeno
            this.checkAffinity(this.antibodies, this.antigen);
            // Clonación
            let clonePopulation = this.clone(this.antibodies, 5);
            // Mutación del clon
            this.mutateClones(clonePopulation);
            // Cálculo de la afinidad de los clones a un antígeno
            this.checkAffinity(clonePopulation, this.antigen);
            //Selección de un único clon y su sustitución por el antígeno adecuado
            this.cloneSelection(clonePopulation);
            this.antibodies.sort((a,b) => b.affinity - a.affinity);
            if(counter !== this.cycles) {
                // Edición de la población
                let newAntibodies = this.generateAb(200);  //generacion de nuevos anticuerpos
                this.antibodies.splice(800, Number.MAX_VALUE);
                this.antibodies = this.antibodies.concat(newAntibodies);
            }
        }
        //console.log(this.antibodies);

    }

    //Generacion de los anticuerpos
    generateAb(amount = 1000) {
        let ab = [];
        for (let i = 0; i < amount; i++) {
            ab[i] = new Antibody();
        }
        return ab;
    }

    // Cálculo de la afinidad de los anticuerpos con un antígeno
    checkAffinity(antibodies, antigen) {
        for(let ab of antibodies)
            ab.countAffinity(antigen);
    }

    //Realiza la clonacion  de los anticuerpos
    clone(antibodies, number) {
        let clones = [];
        for(let i = 0; i < antibodies.length; i++) { //Recorre todos los anticuerpos
            let antibody = antibodies[i];
            antibody.parentAntibody = antibodies[i];
            for(let j = 0; j < number; j++) {
                clones.push(new Antibody(antibody));
            }
        }
        return clones;
    }
    //Realiza la mutacion de los clones
    mutateClones(clonePopulation) {
        for(let clone of clonePopulation) {
            clone = clone.mutate();
        }
    }
    cloneSelection(clonePopulation) {
        for(let clone of clonePopulation) {
            if(clone.affinity > clone.parentAntibody.affinity) { //Si la afinidad es mayor a la afinidad del clon padre se sustituye
                let index = this.antibodies.indexOf(clone.parentAntibody);
                this.antibodies[index] = clone;
            }
        }
    }
}
