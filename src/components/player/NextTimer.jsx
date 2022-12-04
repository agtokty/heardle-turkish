import { useEffect, useState } from "react";

function NextTimer() {
    const [countDown, setCountDown] = useState();
    const [countDownTitle, setCountDownTitle] = useState();

    useEffect(() => {
        let current = new Date();
        let countDownDate = current.setHours(23, 59, 59, 999);
        // let countDownDate = current.setHours(16, 1, 0, 999);
        let lastMinute = 0;

        let interval = setInterval(function () {

            let now = new Date().getTime();
            let timeLeft = countDownDate - now;

            if (timeLeft >= 0) {
                let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                hours = hours < 10 ? ("0"+hours) : hours;
                minutes = minutes < 10 ? ("0"+minutes) : minutes;
                seconds = seconds < 10 ? ("0"+seconds) : seconds;

                const result = hours + ":" + minutes + ":" + seconds;
                setCountDown(result);

                if (lastMinute !== minutes) {
                    const resultDetailed = hours + " ore " + minutes + " minuti ";
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
                <div className="text-center text-custom-line text-sm">Prossimo Heardle in: </div>
                <div className="tracking-widest text-lg font-semibold" title={countDownTitle}>{countDown}</div>
            </div>
        </>
    );
}

export default NextTimer;