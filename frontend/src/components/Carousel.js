import React from 'react';
import axios from 'axios';
import {CarouselCaption,CarouselItem,CarouselControl,CarouselIndicators,Carousel, Container,Col,Row,Badge} from 'reactstrap'
var items = [];

const urlServer = `http://localhost:3001`;
class Car extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 , puestos : []};
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
        this.mounted = false;
	}
    handleChange = (event) => {
        this.setState(state => ({
          editTodo: {
            ...state.editTodo,
            title: event.target.value,
          },
        }));
    }
    componentDidMount = async () => {
        console.log(items)
        this.load();
    }
    load = async () => {
        await axios.get(urlServer + `/puesto`)
            .then(response => {
                this.setState({ puestos: response.data });
                items = response.data.map(p=> {
                    if(p.url_imagen==null){
                        p.url_imagen= 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                    }
                    let v1 = parseInt(p.calificacion)
                    let v2 = parseInt(p.votos)
                    let estrellas = 0
                    if(v2!==0){
                        estrellas = v1/v2
                    }
                    let itemSchema = {
                        "src": p.url_imagen,
                        "header": p.nombre,
                        "caption": p.salario,
                        "key": p.id_puesto,
                        "votos": p.votos,
                        "estrellas": estrellas,
                        "categorias": p.categorias
                    }
                    return itemSchema;
                });
                console.log(response.data);
                this.state.mounted=true;
            })
            .catch(error => {
                alert(error);
            })
    }
	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	render() {
		const { activeIndex } = this.state;

		const slides = items.map((item) => {
			return (
				<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.key} >
                    <Container>
                    <Row>
                        <Col className="bg-light border">
                            Calificacion :<Badge pill color="warning"> {item.estrellas} </Badge> 
                        </Col>
                        <Col className="bg-light border">
                            Votos : <Badge pill color="info"> {item.votos} </Badge>
                        </Col>
                        <Col className="bg-light border">
                            {item.categorias.map(c=>{
                                return(
                                    <Badge pill > {c.categoria} </Badge>
                                )})
                            }
                        </Col>
                    </Row>
                    </Container>
					<img src={item.src} alt={item.altText} width="800px" height="400px" />
					<CarouselCaption captionText={item.caption} captionHeader={item.header} />
				</CarouselItem>
			);
		});

		return (
			<div>
                {this.state.mounted &&
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
                        <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
                    </Carousel>

                }
				
			</div>
		);
	}
}

export default Car;