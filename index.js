/**Créer une fonction caclculerCarre qui prend un nombre et retourne son carre */
//Fonction qui fait la table de multiplication de 1 à 9

function TableMultiplication(a, b = 1) {
  return a * b;
}
i = 1;
j = 1;
// La table va de 1 à 9
while (i < 10) {
    console.log("La table de ", i, " * ", j, " vaut ", TableMultiplication(i));
    j++;
    if (j == 10) {
      console.log("\n ------------------  TABLE DE ",i," -----------------------")
    i++;
    j = 1;
  }
}
//1 à 9

// 1*1=1
// 1*2=2
// 1*3=3
// 1*4=4
// 1*5=5
// 1*6=6
// 1*7=7
// 1*8=8
// 1*9=9

// 2*1=2
// 2*2=4
// 2*3=6
// 2*4=8
// 2*5=10
// 2*6=12
// 2*7=14
// 2*8=16
// 2*9=18
