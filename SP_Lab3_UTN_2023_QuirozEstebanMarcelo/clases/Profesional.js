class Profesional extends Persona {//profesional//Heroe
    constructor(id, nombre, apellido, edad, titulo, facultad,añoGraduacion) {
        super(id, nombre, apellido, edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.añoGraduacion = añoGraduacion;
    }
    
    toString() {
        return (
        super.toString() +
        `, titulo: ${this.titulo}, facultad: ${this.facultad}, añoGraduacion: ${this.añoGraduacion}`
        );
    }

    toJson() {
        const personaJson = super.toJson();
        const profesionalJson = JSON.stringify({
        titulo: this.titulo,
        facultad: this.facultad,
        añoGraduacion:this.añoGraduacion
        });
        return Object.assign(JSON.parse(personaJson), JSON.parse(profesionalJson));
    }
    
    update(data){
        super.update(data);
        this.titulo = data.titulo;
        this.facultad = data.facultad;
        this.añoGraduacion = Number(data.añoGraduacion);
    }
}