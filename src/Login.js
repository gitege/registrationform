import React, { Component } from "react";
import "./Login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fornavn: "",
      etternavn: "",
      epostAdresse: "",
      passord: "",
      // gjentattPassord: "", // make this undefined
      godtattGdpr: false,
      passwordMatch: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePasswordConfirmation =
      this.validatePasswordConfirmation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    if (!this.state.passwordMatch) {
      alert("Passordene er ikke like.");
    }
    let req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAiOiJKV1Qi",
      },
      body: JSON.stringify(this.state),
    };
    console.log(req);
    fetch("http://localhost:8080", req)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.confirm();
        },
        (error) => {
          console.error(error);
        }
      );
    event.preventDefault();
  }

  validatePassword(event) {
    if (this.state.gjentattPassord !== undefined) {
      this.setState({
        passwordMatch: validatePasswordsMatch(
          event.target.value,
          this.state.gjentattPassord
        ),
      });
    }
  }

  validatePasswordConfirmation(event) {
    this.setState({
      passwordMatch: validatePasswordsMatch(
        event.target.value,
        this.state.passord
      ),
    });
  }

  render() {
    return (
      <div className="logincontainer">
        <div className="infopane">
          <h1 className="infoheader">Informasjon</h1>
          <div className="infotext">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
              viverra diam. Aenean sed ex quis diam suscipit molestie a ut
              lectus. Donec leo magna, dictum vitae est sed, tempus sollicitudin
              velit. Ut semper metus vitae urna pretium, ut congue ligula
              pretium. Nam porta cursus est, vel lobortis nibh viverra non.
              Donec ligula augue, accumsan a ullamcorper sit amet, sollicitudin
              nec arcu. Mauris in pulvinar metus.
            </p>
            <br />
            <p>
              Aliquam scelerisque, turpis vitae varius molestie, neque nulla
              euismod turpis, eget blandit velit felis eget enim. Duis feugiat
              mi in dolor sollicitudin imperdiet. Ut at risus vel massa rhoncus
              auctor.
            </p>
          </div>
          <button className="button btn1 funkyshape">Jeg har konto</button>
        </div>
        <div className="loginform">
          <form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
            <h1 className="formheader">Opprett bruker</h1>
            <span className="rowinput">
              <label>
                Fornavn
                <input name="fornavn" type="text" className="funkyshape" />
              </label>
              <label>
                Etternavn
                <input name="etternavn" type="text" className="funkyshape" />
              </label>
            </span>
            <span className="rowinput">
              <label>
                E-postadresse
                <input
                  name="epostAdresse"
                  type="email"
                  className="funkyshape"
                  required
                />
              </label>
            </span>
            <span className="rowinput">
              <label>
                Passord
                <input
                  onChange={this.validatePassword}
                  name="passord"
                  type="password"
                  className="funkyshape"
                  required
                />
              </label>
              <label>
                Gjenta passord
                <input
                  onChange={this.validatePasswordConfirmation}
                  name="gjentattPassord"
                  type="password"
                  className="funkyshape"
                  required
                />
              </label>
            </span>
            <label>
              <input name="godtattGdpr" type="checkbox" className="checkbox" />
              Jeg godtar{" "}
              <a href="https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/databehandleravtale/">
                Databehandlingsavtalen
              </a>
            </label>
            <input
              type="submit"
              className="button btn2 funkyshape"
              value="Registrer"
            />
          </form>
        </div>
      </div>
    );
  }
}

function validatePasswordsMatch(password, passwordConfirmation) {
  return password === passwordConfirmation;
}
