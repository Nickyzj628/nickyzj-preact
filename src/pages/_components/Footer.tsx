const Footer = () => {
  return (
    <footer className="bento flex justify-center gap-1 text-sm text-zinc-400 transition dark:text-zinc-500">
      <span>由</span>
      <a href="https://preactjs.com/" target="_blank" className="transition-none">Preact</a>
      <span>+</span>
      <a href="https://tailwindcss.com/" target="_blank" className="transition-none">Tailwind CSS</a>
      <span>驱动</span>
    </footer>
  );
};

export default Footer;