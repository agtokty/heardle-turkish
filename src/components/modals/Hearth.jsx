import { useModalData } from "./ModalContext";

function Hearth() {

   const { dispatch, state: { currentModal } } = useModalData();

   if (currentModal !== "Hearth") {
      return <></>
   }

   return (
      <div className="modal-background p-3 pointer-events-none">
         <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm" role="dialog" aria-modal="true">
            <div className="bg-custom-bg border border-custom-mg p-6 rounded">
               <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 pl-7">
                     <h2 className="text-sm text-center uppercase text-custom-line font-semibold tracking-widest">GRAZIE!</h2>
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
               <div className="text-center">
              
                  <p className="mb-3">Grazie per giocare a Heardle Italia!</p>
                  <p className="mb-3">Hai qualche domanda o riscontri qualche bug? Scrivci su Twitter!</p>
                  <p class="mb-3">
                     <a href="https://twitter.com/HeardleIta" class="flex items-center no-underline" target="_blank" rel="noreferrer">
                        <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z"></path>
                        </svg> @HeardleIta
                     </a>
                  </p>
                  <p class="mb-3">
                     <a href="https://ko-fi.com/X8X4ELG6W" class="flex items-center no-underline" target="_blank" rel="noreferrer">
                        <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 24 22" fill="currentColor">
                        <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" fill="white"></path>
                        </svg> Ko-fi
                     </a>
                  </p>
               
               </div>
               <div className="text">
                    <p className="pt-3 mb-3 text-xs text-custom-line">Un ringrazimento speciale a <a href="https://github.com/agtokty">agtokty</a></p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Hearth;
