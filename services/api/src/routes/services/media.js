import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import multer from "multer";
import shortid from "shortid";
import mkdirp from "mkdirp";
import expressAsyncHandler from "express-async-handler";
import config from "../../config.js";
import { MediaService } from "../../services/media/MediaService.js";
import { BrandingService } from "../../services/branding/BrandingService";

const mediaRoutes = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = `${config.storage.disk.path}/logos`;
    mkdirp.sync(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const suffix = file.originalname.split('.').pop();
    const id = `img-${shortid.generate()}`;
    cb(null, `${id}.${suffix}`);
  }
});

export default (router) => {

  // Media REST API
  router.use('/services/media', mediaRoutes);

  /**
   * Image proxy
   */
  mediaRoutes.use('/proxy', createProxyMiddleware({
    target: "not-needed",
    router: (req) => req.query.url,
    changeOrigin: true,
  }));

  const upload = multer({ storage });

  /**
   * Get a media asset by ID.
   */
  mediaRoutes.get('/:id', (req, res) => {
    const { id } = req.params;

    if (id !== undefined && id !== null && id.length > 0) {
      MediaService.read(id, res);
    } else {
      res.status(500);
      res.send("Parameter `id` not specified");
    }
  });

  mediaRoutes.post('/logos', upload.array("files", 6), expressAsyncHandler(async (req, res) => {
    const promise = BrandingService.analyzeFile(`${config.storage.disk.path}/logos/${req.files[0].filename}`);
    const data = await promise;
    res.send({
      filePath: `/assets/logos/${req.files[0].filename}`,
      metadata: { ...data }
    });
  }));
};
