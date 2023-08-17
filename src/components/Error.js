import { XCircle } from "@phosphor-icons/react";

function Error() {
  return (
    <div className="error">
      <span className="error__icon">
        <XCircle size={52} weight="fill" color="red" />
      </span>
      <p className="error__text">
        There was an <span>error</span> with fecthing the questions
      </p>
      <div>
        <button
          className="error__reload"
          onClick={() => document.location.reload(true)}
        >
          Reload
        </button>
        <p className="error__text">the page and try again</p>
      </div>
      <a className="error__link" href="mailto:tavakolianparham@gmail.com">
        contact me
      </a>
    </div>
  );
}

export default Error;
