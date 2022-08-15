import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import Filtrados from './components/filtrados';

const data = [
  { id: 1, nome: "Ankys Serrano", telefone: "20198682" },
  { id: 2, nome: "José Augusto", telefone: "20198773" },
  { id: 3, nome: "Maria De Los Angeles Rondon", telefone: "20198625" },
  { id: 4, nome: "José Freites", telefone: "54789632" },
  { id: 5, nome: "Gaby Zapata", telefone: "456987310" },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      nome: "",
      telefone: ""
    },
    dataSearch: [],
    modalInsertar: false,
    modalActualizar: false,
    modalConfirmacion: false
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }

  // modal//
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarConfirmacion = (dato) => {
    this.setState({
      form: dato,
      modalConfirmacion: true
    });

  };

  cerrarConfirmacion = () => {
    this.setState({ modalConfirmacion: false });
  }
  //variaveis//


  insertar = () => {
    let valorNuevo = this.state.form;
    valorNuevo.id = this.state.data.length + 1;
    let lista = this.state.data;
    lista.push(valorNuevo)
    this.setState({ data: lista, modalInsertar: false })
  }

  editar = (dato) => {
    let contador = 0;
    let lista = this.state.data;
    lista.map((registro) => {
      if (dato.id === registro.id) {
        lista[contador].nome = dato.nome;
        lista[contador].telefone = dato.telefone;
      }
      contador++;
    });
    this.setState({ data: lista, modalActualizar: false })
  }

  eliminar = (dato) => {
    let contador = 0;
    let lista = this.state.data;
    lista.map((registro) => {
      if (registro.id === dato.id) {
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({ data: lista, modalConfirmacion: false });
  }

  filtrar = (e) => {
    const { value } = e.target;
    let lista = this.state.data;
    const filtered = lista.filter(fltr => fltr.nome.toLowerCase().includes(value.toLowerCase()));

    // this.setState({data: filtered});
    this.setState({ dataSearch: !value ? [] : filtered });
  }


  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand">Agenda de contatos</a>
            <form class="d-flex">
              <input class="form-control me-2" onChange={this.filtrar} type="search" placeholder="Search" aria-label="Search"></input> "         "
            </form>
          </div>
        </nav>

        <Container>
          <Filtrados
            data={this.state.dataSearch.length ? this.state.dataSearch : this.state.data}
            eliminar={this.mostrarConfirmacion}
            editar={this.mostrarModalActualizar}
          />

          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Agregar contato</Button>
          <br />
          <br />
        </Container>
        {/* Modal insertar */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar contato</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Nome</label>
              <input className="form-control" name="nome" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Telefone</label>
              <input className="form-control" name="telefone" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        {/* Modal actualizar */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar contato</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Nome</label>
              <input className="form-control" name="nome" type="text" onChange={this.handleChange} value={this.state.form.nome} />
            </FormGroup>

            <FormGroup>
              <label>Telefone</label>
              <input className="form-control" name="telefone" type="text" onChange={this.handleChange} value={this.state.form.telefone} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalConfirmacion}>
          <ModalHeader>
            <h4> Deseja eliminar este registro? </h4>
          </ModalHeader>
          <ModalBody>
            <Button color="primary" onClick={() => this.eliminar(this.state.form)}> Si</Button> {"   "}
            <Button color="danger" onClick={() => this.cerrarConfirmacion()}> No</Button>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default App;

