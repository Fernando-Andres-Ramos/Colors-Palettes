/* Importo libreria y genero niveles de escala */
import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];


/* Paleta base => {
                    id,
                    emoji,
                    nombrePaleta,
                    colores:[{color,name},{color,name},...,{}]
                  }
                    
        
    Paleta nueva => {
                    id (igual que la anterior),
                    emoji (igual que la anterior),
                    nombrePaleta (igual que la anterior),
                    colors: {
                              50: [{name:colorAl50, id, hex, rgb,rgba}, //color 1 de la paleta base
                                   {name:colorAl50, id, hex, rgb,rgba}, //color 2 de la paleta base
                                  ....  ,
                                  {name:colorAl50, id, hex, rgb,rgba}], //color 20 de la paleta base

                                  
                              100: [{name:colorAl100, id, hex, rgb,rgba}, //color 1 de la paleta base
                                   {name:colorAl100, id, hex, rgb,rgba}, //color 2 de la paleta base
                                  ....  ,
                                  {name:colorAl100, id, hex, rgb,rgba}], //color 20 de la paleta base
                              200:,
                              .
                              .
                              .
                              .
                              .
                              900:
                            }
                    }               
*/



function generatePalette(starterPalette) {
  /* Nueva paleta con titulo general de la base */
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}  //objeto vacio donde antes habia 20 colores
  };
  /* el objeto vacio colores ahora tiene 20 propiedades, cada una es un array
  O sea {50:[],100:[],200:[]........,900_[]} */
  for (let level of levels) {
    newPalette.colors[level] = []; 
  }

  /* Preparamos una escala para cada color en forma de array: 
  ejemplo de "azul" ahora sera [azul clarito, azul, azul oscuro] */
  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, 10).reverse();


    /* Pushear objeto al "newPaleta.color.50" que es un array
    El objeto sera el color base en su version a la graduacion 50.
    Se repite el proceso para el 100, 200, etc*/
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", "/1.0)")
      });
    }
  }
  return newPalette;
}

function getRange(hexColor) {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
}

function getScale(hexColor, numberOfColors) {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors);
}

export { generatePalette };