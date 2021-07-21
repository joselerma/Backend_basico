const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = require("express").Router();

router.get("/", usuariosGet);
router.post("/", usuariosPost);

router.put("/;id", usuariosPut);
router.patch("/:id", usuariosPatch);
router.delete("/:id", usuariosDelete);

module.exports = router;
