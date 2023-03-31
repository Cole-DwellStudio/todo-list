export { todo as default };

import iconIncomplete from "./assets/icon-incomplete.svg";
import iconDelete from "./assets/icon-delete.svg";

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

  let status = "incomplete";

  let deleteButton = null;

  const template = `<div
            class="flex items-center rounded-full overflow-hidden whitespace-nowrap pl-1.5 pr-4 bg-white shadow-md h-10 max-w-xl border-black border border-opacity-10 font-medium"
          >
            <button id="statusbutton" data-title="${title}" class="h-7 w-7 mr-3 shrink-0" style="background: url(${iconIncomplete}) no-repeat; background-size: cover">
            </button>
            <div class="mr-5 overflow-hidden text-ellipsis">${title}</div>
            <div id="note-duedate" class="ml-auto shrink-0">${dueDate}</div>
            <button id="deletebutton" data-title="${title}" class="ml-4 h-6 w-5 shrink-0" style="background: url(${iconDelete}) no-repeat; background-size: cover">
            </button>
          </div>`;

  return {
    title,
    template,
    deleteButton,
    status,
    dueDate,
  };
};
