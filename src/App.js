import React from 'react';
import logo from './logo.svg';
import './App.css';

const app = document.getElementById('root');

class App extends React.Component {
    aff = {
        affMovie(movie) {
            return `console.log('${JSON.stringify(movie)}')`;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            memes: [],
            appCreaMemes: 'Application de creation de mèmes',
        };
        this.createComponents = this.createComponents.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (_) => {
        this.setState({appCreaMemes: 'Dans handleClick()'});
    };

    render() {
        return (
            <div>
                <h1>Créateur de mèmes</h1>
                <button onClick={this.handleClick}/>
                <div className="result-container">
                    <ul id="result"></ul>
                </div>
                <img src={logo} alt="logo"/>
            </div>
        );
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                    this.memes = data['data']['memes'];
                    this.memes.length = 10;

                    console.assert(this.memes.length > 0, this.memes);

                    this.setState({
                        memes: this.memes,
                    }, () => {
                        console.log('this.state.memes = ', this.state.memes)
                    });
                }
            ).then((_) => this.createComponents())
            .catch(err => {
                    console.error(err);
                    const errorMessage = document.createElement('marquee');
                    errorMessage.textContent = `Gah, ${err.message} !`;
                    app.appendChild(errorMessage);
                }
            );
    }


    createComponents() {
        const container = document.getElementById('result');

        this.memes.forEach(movie => {
                const cardLi = document.createElement('li');
                cardLi.setAttribute('data-id', movie.id);
                cardLi.setAttribute('data-name', movie.name);
                cardLi.setAttribute('data-url', movie.url);
                cardLi.setAttribute('data-width', movie.width);
                cardLi.setAttribute('data-height', movie.height);
                cardLi.setAttribute('data-box-count', movie.box_count);
                cardLi.setAttribute('data-captions', movie.captions);
                cardLi.setAttribute('onclick', this.aff.affMovie(movie));

                const h2 = document.createElement('h2');
                h2.textContent = movie.name;

                const divCardContent = document.createElement('div');
                divCardContent.setAttribute('className', "card-content");

                const image = document.createElement('img');
                image.src = movie.url;
                image.alt = "my-image";

                const divInfo = document.createElement('div');
                divInfo.setAttribute('className', "info");

                const pNbZoneTexte = document.createElement('div');
                pNbZoneTexte.textContent = movie.box_count;

                const pTailleImage = document.createElement('div');
                pTailleImage.textContent = movie.width + 'x' + movie.height;

                const pIdMovie = document.createElement('div');
                pIdMovie.textContent = movie.id;


                divInfo.appendChild(pNbZoneTexte);
                divInfo.appendChild(pTailleImage);
                divInfo.appendChild(pIdMovie);

                divCardContent.appendChild(image);
                divCardContent.appendChild(divInfo);

                cardLi.appendChild(h2);
                cardLi.appendChild(divCardContent);

                container.appendChild(cardLi);
            }
        );
    }
}

export default App;
