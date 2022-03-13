import { useEffect, useState } from "react";


function NextTimer() {


    const [countDown, setCountDown] = useState();
    const [countDownTitle, setCountDownTitle] = useState();


    useEffect(() => {

        let current = new Date();
        let countDownDate = current.setHours(23, 59, 59, 999);
        // let countDownDate = current.setHours(18, 18, 59, 999);
        let lastMinute = 0;

        let interval = setInterval(function () {

            let now = new Date().getTime();
            let distance = countDownDate - now;

            if (distance >= 0) {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const result = hours + "s " + minutes + "d " + seconds + "s ";

                setCountDown(result);

                if (lastMinute !== minutes) {
                    const resultDetailed = hours + " saat " + minutes + " dakika ";
                    setCountDownTitle(resultDetailed);
                    lastMinute = minutes;
                }
            }

            if (distance < 0) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000)
            }

        }, 1000);

        return function cleanup() {
            clearInterval(interval);
        };
    })

    return (
        <>
            <div className="flex flex-col justify-center items-center mb-6 mx-3">
                <div className="text-center text-custom-line text-sm">Sonraki Heardle:</div>
                <div className="tracking-widest text-lg" title={countDownTitle}>{countDown}</div>
            </div>
        </>
    )

}


export default NextTimer;