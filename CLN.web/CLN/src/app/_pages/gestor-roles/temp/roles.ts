export function ArrayRoles(int: number) {
  let roles = [];
  for (let i = 0; i < int; i++) {
    roles.push(new newRol());
  }
  return roles;
}

export class newRol {
  rol: string;
  descripcion: string;
  grupo: string;
  constructor() {
    this.grupo = grupos[Math.floor(Math.random() * grupos.length)].nombre;
    this.rol =
      porisblesRoles[Math.floor(Math.random() * porisblesRoles.length)];
    this.descripcion =
      descripciones[Math.floor(Math.random() * descripciones.length)];
  }
}

export const grupos = [
  {
    nombre: "Ministerios",
    id: 1,
  },
  {
    nombre: "Otras entidades",
    id: 2,
  },
  {
    nombre: "Secretarias",
    id: 3,
  },
];

const porisblesRoles = [
  "Administrador",
  "Gerente",
  "Programador",
  "Secretario",
  "Practicante SENA",
  "Coordinador",
  "Secretario - lider",
  "consumidor",
];

const descripciones = [
  "orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. I eleifend tellus",
  "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim",
  "Quisque rutrum. Aenean imperdiet. Etiam ultricies gue.  Etiam rhoncus. Maecenas tempus, tellus eget",
  "condimentum rhoncus, sem quam semper libero, sit aorem. Maecenas nec odio et ante tincidunt tempus.",
  "de puntuación dominan a los textos simulados; una vida, se puede decir,  una pequeña",
  "línea de texto simulado",
  "llamada",
  "Cuando ya había escalado las primeras colinas",
];
