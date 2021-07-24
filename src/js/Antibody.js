export default class Antibody {
    constructor(object) {
        if(object !== undefined) {
            this.a = object.a;
            this.b = object.b;
            this.affinity = null;
            this.parentAntibody = object.parentAntibody;
        } else {
            this.a = this.getRandomInt(-10, 10);
            this.b = this.getRandomInt(-10, 10);
            this.affinity = null;
            this.parentAntibody = null;
        }

    }
    //Retorna un entero random
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //Retorna un numero random del 0  al 100
    getRandom() {
        return Math.random() * 100;
    }

    //Calcula la afinidad del antigeno
    countAffinity(ag) {
        this.affinity = ag(this.a, this.b);
    }

    //funcion de mutacion 
    mutate() {
        if(this.getRandom() < 30) {
            this.a = this.change(this.a);
            this.b = this.change(this.b);
        }
    }
    //Cambio de valor del valor de a y b
    change(x) {
        let rand = Math.random();
        if(x + rand > 10)
            return x - rand;
        else if(x - rand < -10)
            return x + rand;

        if(rand < 0.5)
            return x + rand;
        else
            return x - rand;
    }
}
