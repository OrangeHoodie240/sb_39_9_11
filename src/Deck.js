import React from 'react'; 
import axios from 'axios'; 
import Card from './Card';


const Deck = ()=>{
    
    const deckId = React.useRef(); 
    const cardsRemaining = React.useRef(null);
    const intervalId = React.useRef(null);
    
    const [state, setState] = React.useState({isDrawing: false, card: null});    

    async function startDrawing(){
        if(cardsRemaining.current === 0){
            clearInterval(intervalId.current); 
            state.isDrawing = false; 
            setState({...state});
            alert('Error: no cards remaining!')
            return;
        }
        const url = `http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`; 
        const resp = await axios.get(url)
            .then(({data})=>data); 
        cardsRemaining.current = resp.remaining; 
        state.card = resp.cards[0].image; 
        setState({...state});
        
    }

    const draw = ()=>{
        if(!state.isDrawing){
            intervalId.current = setInterval(startDrawing, 1000);        
            state.isDrawing = true; 
            setState({...state});
        }
        else{
            clearInterval(intervalId.current); 
            state.isDrawing = false; 
            setState({...state});
        }
    };

    React.useEffect(()=>{
        async function getDeck(){
            const resp = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
                .then(({data}) => data); 
            deckId.current = resp.deck_id; 
            cardsRemaining.current = resp.remaining; 
        }
        getDeck();
    }, []);

    let buttonText = (state.isDrawing) ? "Stop Drawing" : "Start Drawing";
    return (
        <div>
            {(cardsRemaining.current !== 0) ? <button onClick={draw}>{buttonText}</button> : null }
            {(state.card) ? <Card url={state.card} /> : null}
        </div>
    );
};

export default Deck; 
