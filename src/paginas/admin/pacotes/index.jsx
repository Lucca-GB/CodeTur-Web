import React from 'react';
import Menu from '../../../componentes/menu';
import Rodape from '../../../componentes/rodape';

import {Container} from 'react-bootstrap';

const Pacote = () => {
    
    return(
        <div>
            <Menu/>
            <Container className='form-height'>
                <h1>Pacote</h1>
            </Container>
            <Rodape/>
        </div>
    )
}

export default Pacote;