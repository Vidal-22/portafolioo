import Reveal from "./Reveal";

export default function SectionHeading({ index, kicker, title, sub, id }) {
  return (
    <Reveal className="section-head">
      <span className="section-kicker">
        {`${index} // ${kicker}`}
      </span>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </Reveal>
  );
}
