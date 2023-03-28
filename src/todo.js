export { todo as default };

import { format } from "date-fns";

const todo = ({
  title: newTitle,
  description: newDescription,
  dueDate: newDueDate,
  priority: newPriority,
  notes: newNotes,
}) => {
  let title = newTitle;
  let description = newDescription;
  let dueDate = newDueDate;
  let priority = newPriority;
  let notes = newNotes;

  const template = `<div
            class="flex items-center rounded-full pl-1.5 pr-4 bg-white shadow-md w-full h-10 border-black border border-opacity-10 font-medium"
          >
            <button id="note-status">
              <img
                src="./images/icons/icon-incomplete.svg"
                alt=""
                class="h-7 w-7 mr-3"
                id="note-status-icon"
              />
            </button>
            <div class="whitespace-nowrap mr-5">${title}</div>
            <div id="note-duedate" class="ml-auto">${dueDate}</div>
            <button id="note-delete" class="ml-4">
              <img src="./images/icons/icon-delete.svg" alt="" class="h-5" />
            </button>
          </div>`;

  const setTitle = (newTitle) => {
    title = newTitle;
  };

  const getTitle = () => title;
  const getTemplate = () => template;

  return { setTitle, getTitle, getTemplate };
};
