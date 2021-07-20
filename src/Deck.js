import React from 'react'; 
import axios from 'axios'; 
import Card from './Card';


const Deck = ()=>{

    const deckId = React.useRef(); 
    const cardsRemaining = React.useRef();

    const [card, setCard] = React.useState(null);  
    const getCard = async ()=>{
        const url = `http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`; 
        const resp = await axios.get(url)
            .then(({data})=>data); 
        cardsRemaining.current = resp.remaining; 
        setCard(resp.cards[0].image); 
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

    return (
        <div>
            {(cardsRemaining.current !== 0) ? <button onClick={getCard}>Draw A Card</button> : null}
            {(card) ? <Card url={card} /> : null}
        </div>
    );
};

export default Deck; 
