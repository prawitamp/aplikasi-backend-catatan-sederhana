import prisma from "../utils/prisma.js";

const createNoteController = async (req, res) => {
  try {
    // request
    const { title, description } = req.body;

    // validation
    // title
    if (title.length === 0) {
      return res.status(400).json({
        message: "Input Title tidak boleh kosong!",
      });
    }

    if (title.length < 2) {
      return res.status(400).json({
        message: "Title harus setidaknya 2 karakter!",
      });
    }

    const noteExists = await prisma.notes.findFirst({
      where: {
        title: title,
      },
    });

    if (noteExists) {
      return res.status(400).json({
        success: false,
        error: 400,
        message: "Title sudah ada!",
      });
    }

    // description
    if (description.length === 0) {
      return res.status(400).json({
        message: "Input Description tidak boleh kosong!",
      });
    }

    // send to database
    await prisma.notes.create({
      data: {
        title: title,
        description: description,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Note berhasil ditambahkan!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllNote = async (req, res) => {
  try {
    // validation
    const notes = await prisma.notes.findMany();
    if (notes.length === 0) {
      return res.status(200).json({
        success: true,
        code: 200,
        message: "Belum ada data note!",
      });
    }
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
      function: "getAllNote",
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    // request
    const noteId = req.params.id;

    // validation
    const note = await prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Id yang kamu kirim tidak ditemukan",
      });
    }

    // send response
    res.status(200).json({
      success: true,
      code: 200,
      message: "Berhasil mengabil data",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 500,
      message: error.message,
    });
  }
};

const updateNoteById = async (req, res) => {
  try {
    // request
    const noteId = req.params.id;

    const { title, description } = req.body;

    // validation req id
    const note = await prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `Id yang kamu kirim ${noteId} tidak ditemukan`,
      });
    }
    // console.log("Id tersebut ketemu!");

    // if (title.length === 0) {
    //   return res.status(400).json({
    //     message: "Input title tidak boleh kosong!",
    //   });
    // }

    // if (title.length < 2) {
    //   return res.status(400).json({
    //     message: "Title tidak boleh kurang dari 2 karakter!",
    //   });
    // }

    const noteExists = await prisma.notes.findFirst({
      where: {
        title: title,
      },
    });

    if (noteExists) {
      return res.status(400).json({
        success: false,
        error: 400,
        message: "Note ini sudah ada di database",
      });
    }

    // description / validasi req body
    if (title.length === 0) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Input title tidak boleh kosong!",
      });
    }

    if (description.length === 0) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Input deskripsi tidak boleh kosong!",
      });
    }

    // send to database Proses Update
    await prisma.notes.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    res.status(201).json({
      success: true,
      code: 201,
      message: "Note berhasil di update!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 500,
      message: error.message,
    });
  }
};

const deleteNoteById = async (req, res) => {
  try {
    // request
    // const noteId = req.params.id;
    const { noteId } = req.body;

    // validation
    if (noteId.length < 24) {
      return res.status(400).json({
        success: false,
        message: "Id harus minimal 24 karakter!",
      });
    }

    const notes = await prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!notes) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: `Id ${noteId} tidak ditemukan`,
      });
    }

    // // send to database //// proses delete

    const note = await prisma.notes.delete({
      where: {
        id: noteId,
      },
    });

    res.status(200).json({
      success: true,
      code: 200,
      message: "Note berhasil dihapus!",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 500,
      message: error.message,
    });
  }
};

export {
  createNoteController,
  getAllNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
