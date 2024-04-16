// Elementos - Seleciona elementos HTML importantes
const notesContainer = document.querySelector("#notes-container"); // Container para as notas
const noteInput = document.querySelector("#note-content"); // Campo de entrada para digitar notas
const addNoteBtn = document.querySelector(".add-note"); // Botão para adicionar notas
const searchInput = document.querySelector("#search-input"); // Campo de pesquisa
const exportBtn = document.querySelector("#export-notes"); // Botão para exportar notas

// Funções - Definição das funções principais do aplicativo
function showNotes() {
  // Mostra todas as notas
  cleanNotes(); // Limpa o contêiner de notas
  getNotes().forEach((note) => {
    // Para cada nota, cria e exibe o elemento HTML correspondente
    const noteElement = createNote(note.id, note.content, note.fixed);
    notesContainer.appendChild(noteElement);
  });
}

function getNotes() {
  // Obtém todas as notas armazenadas
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  // Ordena as notas com base na propriedade 'fixed' (fixado)
  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

  return orderedNotes;
}

function cleanNotes() {
  // Limpa todas as notas do contêiner
  notesContainer.replaceChildren([]);
}

function saveNotes(notes) {
  // Salva as notas no armazenamento local (localStorage)
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(id, content, fixed) {
  // Cria um novo elemento HTML para representar uma nota
  const element = document.createElement("div");
  element.classList.add("note"); // Adiciona a classe 'note' ao elemento

  // Cria um campo de texto para exibir o conteúdo da nota
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione algum texto...";
  element.appendChild(textarea);

  // Adiciona ícones para fixar, excluir e duplicar notas
  if (fixed) {
    element.classList.add("fixed"); // Se a nota estiver fixada, adiciona a classe 'fixed' ao elemento
  }
  const pinIcon = document.createElement("i");
  pinIcon.classList.add(...["bi", "bi-pin"]); // Adiciona ícone de pin
  element.appendChild(pinIcon);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add(...["bi", "bi-x-lg"]); // Adiciona ícone de exclusão
  element.appendChild(deleteIcon);

  const duplicateIcon = document.createElement("i");
  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]); // Adiciona ícone de duplicação
  element.appendChild(duplicateIcon);

  // Eventos do elemento - Define eventos para interação com as notas
  // Evento para atualizar a nota quando o conteúdo é modificado
  element.querySelector("textarea").addEventListener("keydown", () => {
    const noteContent = element.querySelector("textarea").value;
    updateNote(id, noteContent);
  });

  // Evento para excluir a nota quando o ícone de exclusão é clicado
  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  });

  // Evento para fixar/desafixar a nota quando o ícone de pin é clicado
  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixNote(id);
  });

  // Evento para duplicar a nota quando o ícone de duplicação é clicado
  element
    .querySelector(".bi-file-earmark-plus")
    .addEventListener("click", () => {
      copyNote(id);
    });

  return element; // Retorna o elemento HTML da nota
}

// As demais funções (addNote, generateId, updateNote, deleteNote, toggleFixNote, searchNotes, copyNote, exportData) têm uma finalidade semelhante àquelas explicadas anteriormente.

// Eventos - Associa eventos aos elementos HTML
addNoteBtn.addEventListener("click", () => addNote()); // Evento para adicionar nota quando o botão é clicado
searchInput.addEventListener("keyup", (e) => {
  // Evento para pesquisar notas conforme o texto digitado
  const search = e.target.value;
  searchNotes(search);
});
noteInput.addEventListener("keydown", (e) => {
  // Evento para adicionar nota quando a tecla Enter é pressionada no campo de entrada de notas
  if (e.key === "Enter") {
    addNote();
  }
});
exportBtn.addEventListener("click", () => {
  // Evento para exportar dados das notas quando o botão de exportação é clicado
  exportData();
});

// Inicialização - Executa a função showNotes() para exibir as notas quando a página é carregada
showNotes();
