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
                     <h2 className="text-sm text-center uppercase text-custom-line font-semibold tracking-widest">Informazioni sull'app</h2>
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
                  <p className="mb-3"><a href="https://www.heardleita.netlify.app/" target="_blank" rel="noreferrer" title="Heardle">Heardle</a>, la versione italiana di Heardle.</p>
                  <p className="mb-3">Le canzoni vengono scelte casualmente ogni giorno.</p>
                  <p className="mb-3">Amore per gli artisti e tutti i detentori del copyright le cui canzoni vengono riprodotte in questa app.</p>
                  {/* <p class="mb-3">
                     <a href="https://twitter.com/HeardleTR" class="flex items-center no-underline" target="_blank" rel="noreferrer">
                        <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z"></path>
                        </svg> @HeardleTR
                     </a>
                  </p> */}
                  <p className="text-sm mb-1 text-custom-line">Piattaforme utilizzate:</p>
                  <ul className="text-sm text-custom-line">
                     <li><a href="https://firebase.google.com/" target="_blank" rel="https://firebase.google.com/">firebase</a></li>
                     <li><a href="https://developers.soundcloud.com/docs/api/html5-widget" target="_blank" rel="https://soundcloud.com/">soundcloud</a></li>
                     <li><a href="https://reactjs.org/" target="_blank" rel="https://it.reactjs.org/">react</a></li>
                     <li><a href="https://tailwindcss.com" target="_blank" rel="noreferrer">tailwind</a></li>
                  </ul>
                  <p className="pt-3 mb-3 text-xs text-custom-line">
                     Sviluppatori: 
                     <ul>
                        <li><a href="https://github.com/P0WEX" target="_blank" rel="noreferrer" title="P0WEX">P0WEX</a></li>
                        <li><a href="https://github.com/s-dimaria" target="_blank" rel="noreferrer" title="s-dimaria">s-dimaria</a></li>
                     </ul>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default About;
