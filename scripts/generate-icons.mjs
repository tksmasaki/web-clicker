import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

// PNG 署名
const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// CRC32 テーブル
const T = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  T[i] = c;
}
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = T[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const makeChunk = (type, data) => {
  const t = Buffer.from(type, 'ascii');
  const d = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(d.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, d])), 0);
  return Buffer.concat([len, t, d, crcBuf]);
};

// シンプルなアイコン: 暗い背景 + 白い内接円
function makePNG(size) {
  const cx = (size - 1) / 2;
  const cy = (size - 1) / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.22;

  const rows = [];
  for (let y = 0; y < size; y++) {
    rows.push(0); // sub-filter: None
    for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= innerR) {
        rows.push(240, 240, 240); // 白
      } else if (d <= outerR) {
        rows.push(90, 90, 90); // グレー
      } else {
        rows.push(26, 26, 26); // 暗い背景
      }
    }
  }

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // ビット深度
  ihdr[9] = 2;  // カラータイプ: RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const idat = deflateSync(Buffer.from(rows), { level: 9 });

  return Buffer.concat([
    SIG,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

const dir = 'public/icons';
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

for (const size of [16, 48, 128]) {
  writeFileSync(`${dir}/icon${size}.png`, makePNG(size));
  console.log(`Generated ${dir}/icon${size}.png (${size}x${size})`);
}
