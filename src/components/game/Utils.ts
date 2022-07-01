
import { STRING_COMPARE_LOCALE } from './Constants';
import { SongConfig } from './Models';
import { similarity } from '../utils'

const checkStrings = (expected: string, userAnswer: string) => {
    const similarityScore = similarity(expected, userAnswer);

    let expectedTemp = (expected || "").toLowerCase().replace(/[0-9]/g, '').replace(/\s/g, '');
    let userAnswerTemp = (userAnswer || "").toLowerCase().replace(/[0-9]/g, '').replace(/\s/g, '');


    if (expected === userAnswer || expectedTemp === userAnswerTemp) {
        return true;
    }

    let expectedLocaleTemp = (expected || "").toLocaleLowerCase(STRING_COMPARE_LOCALE).replace(/[0-9]/g, '').replace(/\s/g, '');
    let userAnswerLocaleTemp = (userAnswer || "").toLocaleLowerCase(STRING_COMPARE_LOCALE).replace(/[0-9]/g, '').replace(/\s/g, '');

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

export { checkAnswer }