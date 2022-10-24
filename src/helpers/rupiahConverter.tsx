export default function rupiahConverter(angka) {
  let isNegative = false;
  let counter = 1;
  let rupiah = '';
  let price = '';
  if (typeof angka === 'string') {
    price = angka.split('').reverse();
  } else if (typeof angka === 'number') {
    if (angka < 0) {
      angka *= -1;
      isNegative = true;
    }
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
