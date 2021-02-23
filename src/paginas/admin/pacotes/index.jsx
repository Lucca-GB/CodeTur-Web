import React, { useState, useEffect } from 'react';
import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';
import {Form, Button, Table, Card, Container, Jumbotron, Spinner} from 'react-bootstrap';
import PacoteServico from '../../../servicos/pacoteServico';
import {useFormik} from 'formik';
import {useToasts} from 'react-toast-notifications';
import * as Yup from 'yup';
import './index.css';

const Pacote = () => {
    const[pacotes, setPacotes] = useState([]);
    const{addToast} = useToasts();
    const formik = useFormik({
        initialValues : {
            titulo : '',
            descricao : '',
            imagem : '',
            ativo : false
        },
        onSubmit : values => {
            PacoteServico
                .cadastrar(values)
                .then(resultado => {
                    //Mostra a notificação
                    if(resultado.data.sucesso){
                        addToast(resultado.data.mensagem, {
                            appearance : 'success',
                            autoDismiss : true
                        });
                        //limpa as informações do formulário
                        formik.resetForm();
                        listarPacotes();
                    } else {
                        addToast(resultado.data.mensagem, {
                            appearance : 'error',
                            autoDismiss : true
                        })
                    }
                })
                .catch(erro => {
                    console.log(`erro ${erro}`);
                })
        },
        validationSchema : Yup.object().shape({
            titulo: Yup.string()         
              .min(3, 'O Título deve ter no minimo 3 caracteres')
              .max(120, 'O Título deve ter no máximo 120 caracteres')
              .required('Campo Título Obrigatório'),
            descricao: Yup.string()
              .required('Campo Descrição Obrigatório'),
            imagem: Yup.string()
              .required('Campo Imagem Obrigatório'),
          })
    })

    useEffect(() => {
        listarPacotes();
    }, []);

    const listarPacotes = () => {
        PacoteServico
            .listar()
            .then(resultado => {
                console.log(`resultado ${JSON.stringify(resultado.data)}`);
                setPacotes(resultado.data.data);
            })
            .catch(erro => {
                console.error(`erro ${erro}`);
            })
    }

    return (
        <div>
            <Menu />
            <Container>
                {/* <Titulo titulo="Eventos" chamada="Gerencia as seus eventos" /> */}
                <Jumbotron>
                    <h1>Pacotes</h1>
                    <p>Gerencie os Pacotes da CodeTur</p>
                </Jumbotron>
                <Card>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo" 
                                    placeholder="Título do pacote"
                                    value={formik.values.titulo}
                                    onChange={formik.handleChange}
                                    required
                                    />
                                    {formik.errors.titulo && formik.touched.titulo ? (<div className="error" >{formik.errors.titulo}</div>) : null}

                            </Form.Group>
                                                        
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    rows={3}
                                    name="descricao"  
                                    value={formik.values.descricao}
                                    onChange={formik.handleChange}
                                    required
                                   />
                                {formik.errors.descricao && formik.touched.descricao ? (<div className="error">{formik.errors.descricao}</div>) : null} 

                                
                            </Form.Group>
                            <Form.Group >
                                <Form.Check 
                                    type="checkbox"
                                    label="Ativo"
                                    name="ativo" 
                                    value={formik.values.ativo}
                                    onChange={formik.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                {/* <Form.File id="imagemPacote" label="Imagem do pacote" /> */}
                                <Form.Control
                                    type="text" 
                                    name="imagem" 
                                    placeholder="Url da Imagem" 
                                    value={formik.values.imagem}
                                    onChange={formik.handleChange}
                                    required
                                    />
                                {formik.errors.imagem && formik.touched.imagem ? (<div className="error">{formik.errors.imagem}</div>) : null} 


                            </Form.Group>

                            <Button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? <Spinner animation="border" size="sm" /> : null } Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            pacotes.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.imagem} style={{ width : '120px'}}/></td>
                                        <td>{item.titulo}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.ativo ? 'Ativo' : 'Inativo'}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} >Editar</Button>
                                            <Button variant="danger" value={item.id}   style={{ marginLeft : '10px'}}>{item.ativo ? 'Desativar' : 'Ativar'}</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
            <Rodape />
        </div>
    )
}

export default Pacote;