import React from 'react';

import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';
import {Container, Form, Button, Alert} from 'react-bootstrap';

const ResetarSenha = () => {
    return(
        <div>
            <Menu/>
            <Container className='form-height'>
                <Form className='form-signin'>
                    <h1>Esqueci minha senha</h1>
                    <small>Informe os dados abaixo</small>

                    <hr/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Coloque o seu email aqui" required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    <br></br>
                    <a href='/' style={{ marginTop :'30px'}}>Logar no sistema</a>
                </Form>
            </Container>
            <Rodape/>
        </div>
    )
}

export default ResetarSenha;