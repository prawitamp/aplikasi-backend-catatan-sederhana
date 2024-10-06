import express from "express";

// controllers
import {
  createNoteController,
  getAllNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} from "../controllers/note.js";

const router = express.Router();

router.post("/createNote", createNoteController);
router.get("/getAllNote", getAllNote);
router.get("/getNoteById/:id", getNoteById);
router.post("/updateNoteById/:id", updateNoteById);
router.post("/deleteNoteById/", deleteNoteById);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

export default router;
