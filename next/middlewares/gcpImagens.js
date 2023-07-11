// import { Storage } from "@google-cloud/storage";

const kEY_FILE_NAME= process.env.NEXT_GOOGLE_APPLICATION_CREDENTIALS
const BUCKET_NAME = process.env.NEXT_BUCKET_NAME

const storage = new Storage({
  projectId: 'basedosdados-dev',
  keyFilename: kEY_FILE_NAME, // Arquivo de credenciais do GCS
});


// Função do Next.js para servir imagens públicas
export default async function getGcpImagens(req, res) {
  // Obtenha o nome do arquivo solicitado na URL
  const fileName = req.query.filename;

  // Defina o nome do bucket e o caminho para a imagem no GCS
  const bucketName = BUCKET_NAME;
  const imagePath = `test/${fileName}`;

  try {
    // Obtenha a URL pública da imagem no GCS
    const [url] = await storage.bucket(bucketName).file(imagePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // Defina um tempo de expiração para a URL (por exemplo, 15 minutos)
    });

    // Redirecione o cliente para a URL da imagem
    res.redirect(url);
  } catch (error) {
    console.error('Erro ao servir a imagem:', error);
    res.status(500).end();
  }
}
