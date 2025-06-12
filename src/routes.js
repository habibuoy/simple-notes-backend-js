const { addNoteHandler, getNotesHandler, getNoteByIdHandler,
  updateNoteByIdHandler, deleteNoteByIdHandler } = require('./handlers');

const routes = [
  {
    path: '/notes',
    method: 'POST',
    handler: addNoteHandler
  },
  {
    path: '/notes',
    method: 'GET',
    handler: getNotesHandler
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: getNoteByIdHandler
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: updateNoteByIdHandler
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    handler: deleteNoteByIdHandler
  },
];

module.exports = routes;