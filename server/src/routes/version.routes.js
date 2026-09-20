import { Router } from 'express';
import {
  saveVersion, getVersions, getVersion,
  restoreVersion, deleteVersion,
} from '../controllers/version.controller.js';

const router = Router();

router.post('/:resumeId', saveVersion);
router.get('/:resumeId', getVersions);
router.get('/:resumeId/:versionId', getVersion);
router.post('/:resumeId/:versionId/restore', restoreVersion);
router.delete('/:resumeId/:versionId', deleteVersion);

export default router;