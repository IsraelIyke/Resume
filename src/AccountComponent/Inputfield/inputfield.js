import "./inputfield.css";

export default function Inputfield(props) {
  return (
    <div className="field-input">
      <textarea
        placeholder={props.placeholder}
        id={props.id}
        onChange={(e) => props.setState(e.target.value)}
        value={props.value}
        autoComplete="off"
        className={props.classname}
      />
    </div>
  );
}
