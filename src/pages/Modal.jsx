import useToggle from "../hooks/useToggle";

function Modal() {
  const [isOpen, { toggle, setTrue, setFalse }] = useToggle();

  return (
    <div>
      <button onClick={setTrue}>Ouvrir Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ma Modal</h2>
            <button onClick={setFalse}>Fermer</button>
            <button onClick={toggle}>Toggle</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;