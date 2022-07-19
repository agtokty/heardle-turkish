
import { STRING_COMPARE_LOCALE } from './Constants';
import { SongConfig } from './Models';
import { similarity } from '../utils'

const replaceAll = (target: string, search: string, replacement: string) => {
    return target.replace(new RegExp(search, 'g'), replacement);
};

function decodeTurkishCharacters(text: string) {
    text = replaceAll(text, "ğ", "g");
    text = replaceAll(text, "ü", "u");
    text = replaceAll(text, "ş", "s");
    text = replaceAll(text, "ı", "i");
    text = replaceAll(text, "ö", "o");
    text = replaceAll(text, "ç", "c");
    text = replaceAll(text, "â", "a");
    return text;
}

function cleanUpText(value: string): string {
    value = (value || "").toLowerCase().replace(/[0-9]/g, '').replace(/\s/g, '');

    value = value.replaceAll("-", "");
    value = value.replaceAll("_", "");
    value = value.replaceAll(".", "");
    value = value.replaceAll("?", "");
    value = value.replaceAll("!", "");
    value = value.replaceAll(",", "");
    value = value.replaceAll("#", "");
    value = value.replaceAll("&", "");
    value = value.replaceAll("(", "");
    value = value.replaceAll(")", "");
    value = value.replaceAll("[", "");
    value = value.replaceAll("]", "");

    return value;
}

const checkStrings = (expected: string, userAnswer: string) => {
    const similarityScore = similarity(expected, userAnswer);

    let expectedTemp = cleanUpText(expected);
    let userAnswerTemp = cleanUpText(userAnswer);

    expectedTemp = decodeTurkishCharacters(expectedTemp);
    userAnswerTemp = decodeTurkishCharacters(userAnswerTemp);

    if (expected === userAnswer || expectedTemp === userAnswerTemp) {
        return true;
    }

    let expectedLocaleTemp = cleanUpText(expected).toLocaleLowerCase(STRING_COMPARE_LOCALE).replace(/[0-9]/g, '').replace(/\s/g, '');
    let userAnswerLocaleTemp = cleanUpText(userAnswer).toLocaleLowerCase(STRING_COMPARE_LOCALE).replace(/[0-9]/g, '').replace(/\s/g, '');

    expectedLocaleTemp = decodeTurkishCharacters(expectedLocaleTemp);
    userAnswerLocaleTemp = decodeTurkishCharacters(userAnswerLocaleTemp);

    return expectedLocaleTemp === userAnswerLocaleTemp;
}

const checkAnswer = (songConfig: SongConfig, userAnswer: string) => {

    let isOk = checkStrings(songConfig.trackName, userAnswer);

    if (isOk === false && songConfig.others && songConfig.others.length) {
        console.debug("checking alternatives userAnswer=", userAnswer)
        for (let index = 0; index < songConfig.others.length; index++) {
            isOk = checkStrings(songConfig.others[index], userAnswer);
            if (isOk) {
                break;
            }
        }
    }

    return isOk;
}

export { checkAnswer, cleanUpText }