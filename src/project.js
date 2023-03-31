export { project as default };

const project = (title, newIcon) => {
  const todos = [];
  const icon = newIcon;
  const template = `<li class="flex gap-2 rounded-full pl-4 py-1" id="projectlist-item" data-project="${title}">
      <img src="${icon}" alt="" srcset="" />
      <button>${title}</button>
    </li>`;

  return {
    title,
    todos,
    title,
    icon,
    template,
  };
};
