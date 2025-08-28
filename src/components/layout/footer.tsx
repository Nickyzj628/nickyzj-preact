const Footer = () => {
    return (
        <footer className="bento flex justify-center gap-1 text-sm text-neutral-400 transition dark:text-neutral-500">
            <span>由</span>
            <a href="https://preactjs.com/" target="_blank" className="transition-none">Preact</a>
            <span>和</span>
            <a href="https://tailwindcss.com/" target="_blank" className="transition-none">Tailwind CSS</a>
            <span>驱动</span>
        </footer>
    );
};

export default Footer;