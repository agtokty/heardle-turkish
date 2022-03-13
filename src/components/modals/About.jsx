import { useModalData } from "./ModalContext";

function About() {

   const { dispatch, state: { currentModal } } = useModalData();

   if (currentModal !== "About") {
      return <></>
   }

   return (
      <div className="modal-background p-3 pointer-events-none svelte-1nyqrwd">
         <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm " role="dialog" aria-modal="true">
            <div className="bg-custom-bg border border-custom-mg p-6">
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
                  <p className="mb-3">
                     Şarkılar her gün tamamen rastgele olacak şekilde önceki yıllarda en çok dinlenen şarkılar arasından seçilmektedir.
                  </p>
                  <p className="mb-3">Bu uygulamada şarkıları çalınan sanatçılara ve tüm telif hakki sahiplerine sevgiler.</p>
                  <p className="text-sm mb-1 text-custom-line">Kullanılan araçlar ve servisler</p>
                  <ul className="text-sm text-custom-line">
                     <li><a href="https://tailwindcss.com">tailwind</a></li>
                     <li><a href="https://react-select.com/home">react-select</a> </li>
                     <li><a href="https://firebase.google.com/">firebase</a></li>
                     <li><a href="https://developers.soundcloud.com">soundcloud</a></li>
                  </ul>
                  <p className="pt-3 mb-3 text-sm text-custom-line">geliştirici: <a href="https://github.com/agtokty" title="Agit">agtokty</a></p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default About;
