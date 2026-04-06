function Heading({ level, title }) {
    const Tag = `h${level}`;
    return <Tag>{title}</Tag>;
}

export default Heading;