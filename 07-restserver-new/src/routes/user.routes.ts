import express from 'express';
import {
  usersDelete,
  usersGet,
  usersPatch,
  usersPost,
  usersPut,
} from '../controllers/users.controllers';

const router = express.Router();

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

export default router;
