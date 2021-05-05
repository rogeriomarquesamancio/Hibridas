import React from "react";
import {
    Card, Typography,
    Grid, CardContent,                                                      /* Importando componentes */
    Button, Avatar  
} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/Edit';                                     /* Importando icones */
import DeleteIcon from '@material-ui/icons/Delete';

class CardWish extends React.Component {
    render() {
        const { wish, idx } = this.props;   /* Recebendo os valores por propriedade  */
        return (
            <Grid item xs={12} md={12} sm={12} className="mt-3">
                <Card className="mt-3 p-3">
                    <Grid container md={12} xs={12} sm={12} justify="center">
                        <Grid md={2} sm={4}>
                            <Avatar
                                src={wish.imagem}                                                       /* Avatar do desejo */
                                className="avatar"
                                imgProps={{ width: "100%", height: "100%" }}
                            >
                            </Avatar>
                        </Grid>
                        <Grid md={6} sm={8}>
                            <Typography variant="h6" component="h5">
                                {wish.nome} - R$ {wish.preco}
                            </Typography>                                                        {/* Nome, preço, prioridade e data  do desejo */}
                            <Typography variant="h6" component="h5">
                                {wish.prioridade} - {wish.data}
                            </Typography>
                        </Grid>
                        <Grid md={2} sm={2} className="centerVertical">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => this.props.editar(wish, idx)}                            /* Botão de edição */
                            >
                                <EditIcon></EditIcon>
                            </Button>
                        </Grid>
                        <Grid md={2} sm={2} className="centerVertical">
                            <Button
                                variant="contained"                                                 /* Botão de remoção */
                                color="primary"
                                onClick={() => this.props.remove(wish, idx)}
                            >
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        );
    }
}

export default CardWish;