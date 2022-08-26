import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

function NextTimer() {
    const [countDown, setCountDown] = useState();
    const [countDownTitle, setCountDownTitle] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        let current = new Date();
        let countDownDate = current.setHours(23, 59, 59, 999);
        // let countDownDate = current.setHours(18, 18, 59, 999);
        let lastMinute = 0;

        let interval = setInterval(function () {

            let now = new Date().getTime();
            let timeLeft = countDownDate - now;

            if (timeLeft >= 0) {
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                const result = `${hours} ${t('timer.h')} ${minutes} ${t('timer.m')} ${seconds} ${t('timer.s')}`;
                setCountDown(result);

                if (lastMinute !== minutes) {
                    const resultDetailed = `${hours} ${t('timer.hours')} ${minutes} ${t('timer.minutes')}`;
                    setCountDownTitle(resultDetailed);
                    lastMinute = minutes;
                }
            }

            if (timeLeft < 0) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            }

        }, 1000);

        return function cleanup() {
            clearInterval(interval);
        };
    })

    return (
        <>
            <div className="flex flex-col justify-center items-center mb-6 mx-3">
                <div className="text-center text-custom-line text-sm">{t('timer.next')}:</div>
                <div className="tracking-widest text-lg" title={countDownTitle}>{countDown}</div>
            </div>
        </>
    );
}

export default NextTimer;
