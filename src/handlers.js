const notes = require('./notes.js');
const NanoId = require('nanoid');
const ResponseResult = require('./responseResult.js');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const dtNow = (new Date()).toISOString();
  const id = NanoId.nanoid(16);
  const note = {
    id: id,
    title: title,
    createdAt: dtNow,
    updatedAt: dtNow,
    tags: tags,
    body: body
  };

  notes.push(note);

  const suceeded = notes.filter((n) => n.id === id).length > 0;

  if (!suceeded) {
    return h
      .response(ResponseResult.fail('Failed to add note'))
      .code(500);
  }

  return h
    .response(ResponseResult.succeed('Notes has been added succesfully', {
      noteId: id
    }))
    .code(201);
};

const getNotesHandler = (request, h) => {
  return h
    .response(ResponseResult.succeed('Notes has been added succesfully', {
      notes
    }))
    .code(200);
};

const getNoteByIdHandler = (request, h) => {

  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (!note) {
    return h
      .response(ResponseResult.fail(`Note with id ${id} not found`))
      .code(404);
  }

  return h
    .response(ResponseResult.succeed('Notes has been added succesfully', {
      note
    }))
    .code(200);
};

const updateNoteByIdHandler = (request, h) => {

  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const note = notes.filter((n) => n.id === id)[0];
  if (!note) {
    return h
      .response(ResponseResult.fail(`Note with id ${id} not found`))
      .code(404);
  }

  note.title = title;
  note.tags = tags;
  note.body = body;
  note.updatedAt = (new Date()).toISOString();

  return h
    .response(ResponseResult.succeed('Notes has been updated succesfully', {
      note
    }))
    .code(200);
};

const deleteNoteByIdHandler = (request, h) => {

  const { id } = request.params;

  const noteIndex = notes.findIndex((n) => n.id === id);
  if (noteIndex === -1) {
    return h
      .response(ResponseResult.fail(`Note with id ${id} not found`))
      .code(404);
  }

  const deleteds = notes.splice(noteIndex, 1);

  if (deleteds.length === 0) {
    return h
      .fail(ResponseResult.fail(`Failed to delete note with id ${id}`))
      .code(500);
  }

  return h
    .response(ResponseResult.succeed(`Notes ${deleteds[0].title} has been deleted succesfully`))
    .code(200);
};

module.exports = { addNoteHandler, getNotesHandler, getNoteByIdHandler,
  updateNoteByIdHandler, deleteNoteByIdHandler };