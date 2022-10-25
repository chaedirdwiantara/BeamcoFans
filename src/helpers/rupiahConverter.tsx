export default function rupiahConverter(angka: number | string) {
  let isNegative: boolean = false;
  let counter: number = 1;
  let rupiah: string = '';
  let price: string = '';
  if (typeof angka === 'string') {
    // @ts-ignore
    price = angka.split('').reverse();
  } else if (typeof angka === 'number') {
    if (angka < 0) {
      angka *= -1;
      isNegative = true;
    }
    // @ts-ignore
    price = angka.toString().split('').reverse();
  } else {
    price = '0';
  }

  for (let i = 0; i < price.length; i++) {
    rupiah += price[i];
    if (counter % 3 === 0 && i !== price.length - 1) {
      rupiah += '.';
    }

    counter++;
  }
  if (isNegative) {
    rupiah = '-' + rupiah.split('').reverse().join('');
  } else {
    rupiah = rupiah.split('').reverse().join('');
  }

  return rupiah;
}
