import React from "react";
import {
    Box, Grid,
    Button, Card,
    TextField, CardContent,                                                 /* Importando componentes do material UI */
    FormControl, Typography,
    Select, MenuItem, InputLabel,
} from "@material-ui/core/";
import Header from "../../components/Header";                               /* Importando componente de Card */
import CardWish from "../../components/CardWish";                           /* Importando componente de Card */
import '../../layouts/layout.css';                                          /* Importando CSS */
import AddIcon from '@material-ui/icons/Add';                               /* Importando icone */

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                filter: {
                    id: "filter",
                    value: ""
                },
                nome: {
                    id: "nome",
                    value: ""
                },
                preco:
                {
                    id: "preco",                                            /* Criando os atributos que serão utilizados */
                    value: ""
                },
                imagem:
                {
                    id: "imagem",
                    value: ""
                },
                prioridade:
                {
                    id: "prioridade",
                    value: ""
                },
                data:
                {
                    id: "data",
                    value: ""
                },
            },
            filter: {
                id: "preco",
                value: ""
            },
            typePage: "list",                                   /* Atributo para identificar qual página será visualizada */
            idxEdit: ""                                         /* Atributo para identificar a posição do item */
        }
    }



    onInputChange(id, value) {
        let { form } = this.state;                                 /* Função responsável para atribuir valor do input a variavel */
        form[id].value = value;
        this.setState({ form });
    }

    changeView() {
        let { typePage } = this.state
        let newType = typePage == "list" ? "create" : "list"            /* Função para mudar o atributo que de terminar qual tela será visualizada */
        this.clearForm()
        this.setState({ typePage: newType })
    }

    createItem() {
        let { form } = this.state
        let body = {
            nome: form.nome.value,
            preco: form.preco.value,
            imagem: form.imagem.value,                          /* Criando um objeto com as informações inseridas */
            prioridade: form.prioridade.value,
            data: form.data.value
        }

        let localStore = localStorage.getItem("database")                         /* Buscando o local storage */

        if (localStore) {                                                       /* Caso ja exista itens no local storage */
            const cache = JSON.parse(localStore)
            cache.push(body)                                                                /* Adicionando o novo item */
            localStorage.setItem("database", JSON.stringify(cache));                        /* Atualizando o local storage*/
            this.clearForm()                                                                /* Limpando o formulario */
            this.setState({ typePage: "list" })                                             /* Mudando de tela */

        } else {                                                              /* Caso não exista itens no local storage */
            let database = [];
            database[0] = body
            localStorage.setItem("database", JSON.stringify(database));       /* Atualizando o local storage*/
        }


    }

    clearForm() {
        let { form } = this.state
        form.imagem.value = ""
        form.preco.value = ""                                               /* Limpar os inputs */
        form.nome.value = ""
        form.data.value = ""
        form.prioridade.value = ""
        this.setState({ form })
    }

    removeItem(l, idx) {
        let localStore = localStorage.getItem("database")                                   /* Busco o local storage */
        const cache = JSON.parse(localStore)
        cache.splice(idx, 1)                                                                /* Retirando o iten do local storage */
        localStorage.setItem("database", JSON.stringify(cache));                            /* Atualizando local storage */
        this.setState({ typePage: "list" })                                                 /* Mudando de tela */
    }

    editarItem(l, idx) {
        let { typePage, form } = this.state
        typePage = "edit"
        form.imagem.value = l.imagem
        form.nome.value = l.nome                                                                /* Preenchendo o input com as informações do card clicado */
        form.preco.value = l.preco
        form.data.value = l.data
        form.prioridade.value = l.prioridade
        this.setState({ typePage, form, idxEdit: idx })
    }

    editView() {
        let { form, idxEdit } = this.state
        let localStore = localStorage.getItem("database")                               /*  Buscando o local storage */
        const cache = JSON.parse(localStore)

        cache[idxEdit].imagem = form.imagem.value
        cache[idxEdit].nome = form.nome.value                                           /* Atribuindo os novos valores */
        cache[idxEdit].preco = form.preco.value
        cache[idxEdit].prioridade = form.prioridade.value
        cache[idxEdit].data = form.data.value

        localStorage.setItem("database", JSON.stringify(cache));                        /* Atualizando local storage */

        this.setState({ typePage: "list" })                                             /* Mudando de tela */
        this.clearForm()
    }


    render() {
        let { form, typePage } = this.state
        let lista = localStorage.getItem('database');                            /*  Buscando o local storage */
        let cacheLista = JSON.parse(lista);
        let listaFiltrada = cacheLista?.filter((l) => {                             /* Filtro pelo nome do item */
            const filter = form?.filter?.value?.toLowerCase();
            const nome = l.nome.toLowerCase();
            return nome.includes(filter);
        });

        return (
            <Box className="mt-4 h-100">
                <Header
                    title={"LIST NOW"}                                      /* Componente de cabeçalho */
                    qtdWishes={cacheLista?.length}
                />
                {typePage == "list" ?                       /* Condição para ser mostrado a tela de listagem */
                    <Card>
                        <CardContent>
                            <Grid container md={12} justify="center">
                                <Grid item md={10} sm={10} xs={10}>
                                    <FormControl className="w-100">
                                        <TextField
                                            size="small"
                                            label="Filtrar desejo"
                                            id={this.state.form.filter.id}                                              /* Input para filtrar item */
                                            value={this.state.form.filter.value}
                                            onChange={(e) => this.onInputChange(this.state.form.filter.id, e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} sm={2} xs={2} className="gridButtonFilter">
                                    <Button
                                        variant="contained"
                                        className="newWishButton primary"                                           /* Botão para redirecionar para página de criar item */
                                        onClick={() => this.changeView()}
                                    >
                                        <AddIcon style={{ color: "white" }}></AddIcon>
                                    </Button>
                                </Grid>
                            </Grid>
                            {listaFiltrada?.map((wish, idx) => {                    /* Renderizando a lista de itens */
                                return (
                                    <CardWish
                                        key={idx}           /* Componente de card */
                                        wish={wish}
                                        idx={idx}
                                        editar={this.editarItem.bind(this)}
                                        remove={this.removeItem.bind(this)}
                                    />
                                )
                            })}
                        </CardContent>
                    </Card>
                    :            /* Condição para ser mostrado a tela de criação/ediçao */
                    <Card>
                        <Typography variant="h6" className="mt-2 center">{typePage == "edit" ? "Editar desejo" : "Criar desejo"}</Typography>           {/* Titulo da pagina */}
                        <Grid container className="mt-1 p-3">
                            <FormControl className="w-100 mt-2">
                                <TextField
                                    required
                                    size="small"
                                    label="Nome"
                                    id={this.state.form.nome.id}                                                                    /* Input de nome */
                                    value={this.state.form.nome.value}
                                    style={{ width: "100%" }}
                                    onChange={(e) => this.onInputChange(this.state.form.nome.id, e.target.value)}
                                />
                            </FormControl>
                            <FormControl className="w-100 mt-2">
                                <InputLabel>Prioridade*</InputLabel>
                                <Select
                                    id={this.state.form.prioridade.id}
                                    value={this.state.form.prioridade.value}                                                         /* Input de prioridade */
                                    onChange={(e) => this.onInputChange(this.state.form.prioridade.id, e.target.value)}
                                    label="Prioridade"
                                >
                                    <MenuItem value="baixa">Baixa</MenuItem>
                                    <MenuItem value="media">Média</MenuItem>
                                    <MenuItem value="alta">Alta</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="w-100 mt-2 mb-2">
                                <TextField
                                    required
                                    size="small"
                                    label="Preço"                                                                                /* Input de preço */
                                    type="number"
                                    id={this.state.form.preco.id}
                                    value={this.state.form.preco.value}
                                    onChange={(e) => this.onInputChange(this.state.form.preco.id, e.target.value)}
                                />
                            </FormControl>
                            <InputLabel className="mt-2">Data de compra*</InputLabel>
                            <TextField
                                required
                                size="small"
                                id={this.state.form.data.id}
                                style={{ width: "100%" }}
                                type="date"                                                                                          /* Input de compra */
                                value={this.state.form.data.value}
                                onChange={(e) => this.onInputChange(this.state.form.data.id, e.target.value)}
                            />
                            <FormControl className="w-100 mt-2">
                                <TextField
                                    required
                                    size="small"
                                    label="URL da imagem"                                                                                /* Input de imagem */
                                    id={this.state.form.imagem.id}
                                    value={this.state.form.imagem.value}
                                    onChange={(e) => this.onInputChange(this.state.form.imagem.id, e.target.value)}
                                />
                            </FormControl>
                            <Grid item md={6} sm={6} xs={12} className="center" style={{ marginTop: "10px" }}>
                                <Button
                                    variant="contained"
                                    color="secondary"                                                                       /* Botão voltar */
                                    onClick={() => this.changeView()}
                                >
                                    VOLTAR
                                </Button>
                            </Grid>
                            <Grid item md={6} sm={3} xs={12} className="center" style={{ marginTop: "10px" }}>
                                {typePage == "edit" ?    /* Condição sobre qual botão mostrar dependendo se é criar ou editar */
                                    <Button
                                        variant="contained"
                                        color="primary"                                                          /* Botão editar */
                                        onClick={() => this.editView()}
                                    >
                                        EDITAR
                                    </Button>
                                    :
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"                                                         /* Botão criar */
                                        onClick={() => this.createItem()}
                                    >
                                        CRIAR
                                </Button>
                                }
                            </Grid>
                        </Grid>
                    </Card>
                }
            </Box>
        )
    };
}

export default Home;