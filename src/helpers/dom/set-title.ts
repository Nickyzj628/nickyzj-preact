export const setTitle = (title?: string) => {
    if (!title) document.title = "NICKYZJ";
    else document.title = `${title} / NICKYZJ`;
};