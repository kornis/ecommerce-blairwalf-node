let numero = 118.10

console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(numero));

