import { useModalData } from "./ModalContext";

function About() {

   const { dispatch, state: { currentModal } } = useModalData();

   if (currentModal !== "About") {
      return <></>
   }

   return (
      <div className="modal-background p-3 pointer-events-none">
         <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm" role="dialog" aria-modal="true">
            <div className="bg-custom-bg border border-custom-mg p-6 rounded">
               <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 pl-7">
                     <h2 className="text-sm text-center uppercase text-custom-line font-semibold tracking-widest">Uygulama Hakkında</h2>
                  </div>
                  <div className="justify-self-end flex">
                     <button autofocus="" className="border-none text-custom-mg" type="button" aria-label="Kapat" title="Kapat"
                        onClick={() => { dispatch({ type: 'Reset' }) }}>
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="18" y1="6" x2="6" y2="18"></line>
                           <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                     </button>
                  </div>
               </div>
               <div className="text">
                  <p className="mb-3"><a href="https://www.heardle.app/" title="Heardle">Heardle</a> uygulamasının Türkçe kopyasıdır.</p>
                  <p className="mb-3">Şarkılar her gün rastgele olacak şekilde seçilmektedir.</p>
                  <p className="mb-3" title="ya da o anki ruh haline gore">Bu uygulamada şarkıları çalınan sanatçılara ve tüm telif hakki sahiplerine sevgiler.</p>
                  <p className="text-sm mb-1 text-custom-line">Kullanılan araç ve servisler</p>
                  <ul className="text-sm text-custom-line">
                     <li><a href="https://firebase.google.com/">firebase</a></li>
                     <li><a href="https://developers.soundcloud.com/docs/api/html5-widget">soundcloud</a></li>
                     <li><a href="https://reactjs.org/">react</a></li>
                     <li><a href="https://tailwindcss.com">tailwind</a></li>
                  </ul>
                  <p className="pt-3 mb-3 text-xs text-custom-line">
                     dev:<a href="https://github.com/agtokty" title="Agit">agtokty</a>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default About;
