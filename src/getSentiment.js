import natural from 'natural';
import { removeStopwords } from 'stopword';

const { SentimentAnalyzer, PorterStemmer, WordTokenizer } = natural;

export function getSentiment(text) {
    const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, '');
    const tokenizer = new WordTokenizer();
    const tokenizedText = tokenizer.tokenize(alphaOnlyReview);

    const filteredText = removeStopwords(tokenizedText);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    return analyzer.getSentiment(filteredText);
}
