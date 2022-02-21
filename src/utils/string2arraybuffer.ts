const BASE64_MAPPING = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '/',
];

const _toBinary = function (ascii: number) {
  const binary = new Array(0);
  while (ascii > 0) {
    const b = ascii % 2;
    ascii = Math.floor(ascii / 2);
    binary.push(b);
  }
  binary.reverse();
  return binary;
};

const _toDecimal = function (binary: any[]) {
  let dec = 0;
  let p = 0;
  for (let i = binary.length - 1; i >= 0; --i) {
    const b = binary[i];
    if (b === 1) {
      dec += Math.pow(2, p);
    }
    ++p;
  }
  return dec;
};

const _toUTF8Binary = function (c: any, binaryArray: any) {
  const mustLen = 8 - (c + 1) + (c - 1) * 6;
  const fatLen = binaryArray.length;
  let diff = mustLen - fatLen;
  while (--diff >= 0) {
    binaryArray.unshift(0);
  }
  const binary: any[] = [];
  let _c = c;
  while (--_c >= 0) {
    binary.push(1);
  }
  binary.push(0);
  let i = 0;
  const len = 8 - (c + 1);
  for (; i < len; ++i) {
    binary.push(binaryArray[i]);
  }

  for (let j = 0; j < c - 1; ++j) {
    binary.push(1);
    binary.push(0);
    let sum = 6;
    while (--sum >= 0) {
      binary.push(binaryArray[i++]);
    }
  }
  return binary;
};

export function encoder(str: string) {
  const base64Index: any[] = [];
  let binaryArray: any[] = [];
  for (let i = 0, len = str.length; i < len; ++i) {
    const unicode = str.charCodeAt(i);
    const _tmpBinary = _toBinary(unicode);
    if (unicode < 0x80) {
      let _tmpdiff = 8 - _tmpBinary.length;
      while (--_tmpdiff >= 0) {
        _tmpBinary.unshift(0);
      }
      binaryArray = binaryArray.concat(_tmpBinary);
    } else if (unicode >= 0x80 && unicode <= 0x7ff) {
      binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
    } else if (unicode >= 0x800 && unicode <= 0xffff) {
      // UTF-8 3byte
      binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
    } else if (unicode >= 0x10000 && unicode <= 0x1fffff) {
      // UTF-8 4byte
      binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
    } else if (unicode >= 0x200000 && unicode <= 0x3ffffff) {
      // UTF-8 5byte
      binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
    } else if (unicode >= 4000000 && unicode <= 0x7fffffff) {
      // UTF-8 6byte
      binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
    }
  }

  let extraZeroCount = 0;
  for (let i = 0, len = binaryArray.length; i < len; i += 6) {
    const diff = i + 6 - len;
    if (diff === 2) {
      extraZeroCount = 2;
    } else if (diff === 4) {
      extraZeroCount = 4;
    }
    let _tmpExtraZeroCount = extraZeroCount;
    while (--_tmpExtraZeroCount >= 0) {
      binaryArray.push(0);
    }
    base64Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
  }

  let base64 = '';
  for (let i = 0, len = base64Index.length; i < len; ++i) {
    base64 += BASE64_MAPPING[base64Index[i]];
  }

  for (let i = 0, len = extraZeroCount / 2; i < len; ++i) {
    base64 += '=';
  }
  return base64;
}
