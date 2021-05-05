import React from "react";
import {
    Card, Typography,                       /* Importando componentes do material UI */
    Grid, CardContent
} from '@material-ui/core/';


class Header extends React.Component {
    render() {
        const { qtdWishes, title } = this.props;   /* Recebendo os valores por propriedade  */
        return (
            <Card raised style={{ backgroundColor: "#0465ae" }}>
                <CardContent>
                    <Grid container>
                        <Grid item md={10} sm={8}  xs={6}>
                            <Typography variant="h4" component="h1">
                                {title}                                                    {/* Titulo do projeto */}
                            </Typography>
                        </Grid>
                        <Grid item md={2} sm={4} xs={6}style={{ alignItems: "center", display: "flex" }}>
                            <Typography variant="h6" component="h3">
                                {qtdWishes} desejos :)                                      {/* Quantidade de itens cadastrados */}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        );
    }
}

export default Header;