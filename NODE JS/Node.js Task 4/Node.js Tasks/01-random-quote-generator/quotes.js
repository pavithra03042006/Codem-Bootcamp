const quotes=[
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "The way to get started is to quit talking and begin doing. - Walt Disney",    
    "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
    "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
    "Life is what happens when you're busy making other plans. - John Lennon"
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}


module.exports = { getRandomQuote };