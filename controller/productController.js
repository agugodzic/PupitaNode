import sharp from 'sharp';

async function previewGenerate(base64, newWidth, newHeight, quality) {
  return new Promise((resolve) => {
    const buffer = Buffer.from(base64, 'base64');

    sharp(buffer)
      .resize(newWidth, newHeight)
      .jpeg({ quality: quality })
      .toBuffer((err, resizedBuffer) => {
        if (err) {
          console.error('Error al procesar la imagen:', err);
          resolve(null); // Envía un valor nulo al resolver la promesa en caso de error
        } else {
          const resizedBase64 = resizedBuffer.toString('base64');
          resolve(resizedBase64);
        }
      });
  });
}

export default previewGenerate;
