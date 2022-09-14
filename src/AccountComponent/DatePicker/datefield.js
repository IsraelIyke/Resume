import "./datefield.css";

export default function Datefield(props) {
  return (
    <div className="date-input">
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        onChange={(e) => props.setState(e.target.value)}
        value={props.value}
        autoComplete="off"
        className={props.classname}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}
