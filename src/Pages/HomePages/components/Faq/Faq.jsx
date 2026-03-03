import "./Faq.css";

// const faqs = [
//   {
//     id: "start",
//     question: "How can I start working with you?",
//     hint: "Tell us about your pet and what you need help with.",
//     answer:
//       "Create a quick pet profile, pick the care areas you want to track, and share access with anyone who helps—your vet, sitter, or family. We tailor reminders and checklists from there.",
//   },
//   {
//     id: "process",
//     question: "What does your process look like?",
//     hint: "From onboarding to steady care.",
//     answer:
//       "We start with a health and habits snapshot, surface the most urgent to-dos, and pair them with small, repeatable routines. You’ll see progress markers so you know what’s done and what’s next.",
//   },
//   {
//     id: "pricing",
//     question: "How do you price your plans?",
//     hint: "Transparent, flexible plans.",
//     answer:
//       "Use the free core tools as long as you’d like. Upgrade only if you want multi-pet automation, shared care plans, or exportable reports for your vet—no hidden add-ons.",
//   },
//   {
//     id: "handoff",
//     question: "What files will I receive at the end?",
//     hint: "You keep the full record.",
//     answer:
//       "All care logs, vaccination history, and routines stay in your account. You can export PDFs for travel or vet visits, and collaborators keep view access even if you change plans.",
//   },
// ];

// const Faq = () => {
//   const [openId, setOpenId] = useState(faqs[0].id);

//   const toggleItem = (id) => {
//     setOpenId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <section className="faq" id="faq">
//       <div className="faq__inner">
//         <header className="faq__header">
//           <p className="faq__badge">Need a little more help?</p>
//           <h2 className="faq__title">
//             <span>Frequently asked</span>
//             <span>questions</span>
//           </h2>
        
//         </header>

//         <div className="faq__list" role="list">
//           {faqs.map((item) => {
//             const isOpen = item.id === openId;
//             return (
//               <article
//                 key={item.id}
//                 className={`faq__item ${isOpen ? "is-open" : ""}`}
//                 role="listitem"
//               >
//                 <button
//                   type="button"
//                   className="faq__trigger"
//                   aria-expanded={isOpen}
//                   onClick={() => toggleItem(item.id)}
//                 >
//                   <div className="faq__text">
//                     <p className="faq__question">{item.question}</p>
//                     <p className="faq__hint">{item.hint}</p>
//                   </div>
//                   <span className="faq__icon" aria-hidden="true" />
//                 </button>
//                 <div
//                   className="faq__panel"
//                   aria-hidden={!isOpen}
//                   aria-live="polite"
//                 >
//                   <div className="faq__panel-inner">
//                     <p className="faq__answer">{item.answer}</p>
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Faq;
import { useEffect, useRef, useState } from "react";
import "./Faq.css";

const faqs = [
  {
    id: "start",
    question: "How can I start working with you?",
    hint: "Tell us about your pet and what you need help with.",
    answer:
      "Create a quick pet profile, pick the care areas you want to track, and share access with anyone who helps—your vet, sitter, or family. We tailor reminders and checklists from there.",
  },
  {
    id: "process",
    question: "What does your process look like?",
    hint: "From onboarding to steady care.",
    answer:
      "We start with a health and habits snapshot, surface the most urgent to-dos, and pair them with small, repeatable routines. You’ll see progress markers so you know what’s done and what’s next.",
  },
  {
    id: "pricing",
    question: "How do you price your plans?",
    hint: "Transparent, flexible plans.",
    answer:
      "Use the free core tools as long as you’d like. Upgrade only if you want multi-pet automation, shared care plans, or exportable reports for your vet—no hidden add-ons.",
  },
  {
    id: "handoff",
    question: "What files will I receive at the end?",
    hint: "You keep the full record.",
    answer:
      "All care logs, vaccination history, and routines stay in your account. You can export PDFs for travel or vet visits, and collaborators keep view access even if you change plans.",
  },
];
const SPEED = 1.6; // 1.3–2.0 aralığında oyna: 1.6 yaxşı plavni edir

const DUR = {
  press: Math.round(420 * SPEED), // əvvəl 420 idi
  open: Math.round(650 * SPEED), // əvvəl 650 idi
  close: Math.round(520 * SPEED), // əvvəl 520 idi
};

function freezePanel(panelEl) {
  if (!panelEl) return 0;

  // ƏVVƏL: cari hündürlüyü götür və px kimi fix et
  const h = panelEl.getBoundingClientRect().height;
  panelEl.style.height = `${h}px`;
  panelEl.style.overflow = "hidden";

  // SONRA: köhnə animasiyaları cancel elə (commitStyles varsa, əvvəl commit)
  const anims = panelEl.getAnimations?.() || [];
  anims.forEach((a) => {
    try {
      a.commitStyles?.();
    } catch {console.log("commitStyles error");}
    try {
      a.cancel();
    } catch {console.log("cancel error");}
  });

  // Reflow: brauzer px height-i “qəbul etsin”
  // (bu 1 sətir çox şey həll edir)
  // eslint-disable-next-line no-unused-expressions
  panelEl.offsetHeight;

  return h;
}

// ✅ PRESS: yalnız kiçilt → normal (overshoot yoxdur)
function animatePress(itemEl) {
  if (!itemEl?.animate) return;
  itemEl.getAnimations?.().forEach((a) => a.cancel());

  itemEl.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.975)" }, // press
      { transform: "scale(1)" }, // geri
    ],
    {
      duration: DUR.press,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)", // plavni
      fill: "none",
    }
  );
}






const OPEN_DUR = 900; // plavni (800–1100)
const OPEN_OVER = 1.1; // 1.06–1.12

function animateOpen(panelEl, innerEl) {
  if (!panelEl || !innerEl || !panelEl.animate) return;

  const from = freezePanel(panelEl);
  const target = innerEl.scrollHeight;
  if (target <= 0) return;

  const over = Math.round(target * OPEN_OVER);

  const anim = panelEl.animate(
    [
      // bir az “hold” – reski başlamasın
      {
        height: `${from}px`,
        opacity: 0,
        transform: "translateY(-6px)",
        offset: 0,
      },
      {
        height: `${from}px`,
        opacity: 0,
        transform: "translateY(-6px)",
        offset: 0.22,
      },

      // over-a çıx (push hiss olunsun)
      {
        height: `${over}px`,
        opacity: 1,
        transform: "translateY(0px)",
        offset: 0.84,
      },

      // target-a otur (default)
      {
        height: `${target}px`,
        opacity: 1,
        transform: "translateY(0px)",
        offset: 1,
      },
    ],
    {
      duration: OPEN_DUR,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    }
  );

  anim.onfinish = () => {
    // final vəziyyəti mütləq px kimi “commit” et
    panelEl.style.height = `${target}px`;
    panelEl.style.opacity = "1";
    panelEl.style.transform = "translateY(0px)";
  };
}





const CLOSE_PRE_DUR = 220; // qısa “sıxılma”


const CLOSE_DUR = 720; // tez bitsin (650–850)
const CLOSE_MORE = 0.86; // “bir az çox bağlansın”

function animateClose(panelEl) {
  if (!panelEl || !panelEl.animate) return;

  const from = freezePanel(panelEl);
  if (from <= 0) return;

  const closeMore = Math.round(from * CLOSE_MORE);

  const anim = panelEl.animate(
    [
      {
        height: `${from}px`,
        opacity: 1,
        transform: "translateY(0px)",
        offset: 0,
      },

      // başlanğıc hiss olunsun (amma çox uzatmadan)
      {
        height: `${closeMore}px`,
        opacity: 1,
        transform: "translateY(0px)",
        offset: 0.5,
      },

      // sonra normal 0
      { height: `0px`, opacity: 0, transform: "translateY(-6px)", offset: 1 },
    ],
    {
      duration: CLOSE_DUR,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    }
  );

  anim.onfinish = () => {
    panelEl.style.height = "0px";
    panelEl.style.opacity = "0";
    panelEl.style.transform = "translateY(-6px)";
  };
}






const Faq = () => {
  const [openId, setOpenId] = useState(faqs[0].id);

  const itemRefs = useRef(new Map());
  const panelRefs = useRef(new Map());
  const innerRefs = useRef(new Map());

const toggleItem = (id) => {
  const currentOpen = openId;
  const nextOpen = currentOpen === id ? null : id;

  // 1) Press dərhal başlasın
  animatePress(itemRefs.current.get(id));

  // 2) Əgər başqa item açıqdırsa, onu bağla (paralel)
  if (currentOpen && currentOpen !== id) {
    animateClose(panelRefs.current.get(currentOpen));
  }

  // 3) State update
  setOpenId(nextOpen);

  // 4) Eyni frame-də yeni panel açılıb/bağlansın (press ilə paralel)
  requestAnimationFrame(() => {
    if (nextOpen) {
      animateOpen(
        panelRefs.current.get(nextOpen),
        innerRefs.current.get(nextOpen)
      );
    } else {
      animateClose(panelRefs.current.get(id));
    }
  });
};



  // Responsive/font dəyişəndə açıq panel düzgün hündürlükdə qalsın
  useEffect(() => {
    if (!openId) return;
    const panelEl = panelRefs.current.get(openId);
    const innerEl = innerRefs.current.get(openId);
    if (!panelEl || !innerEl) return;

    const ro = new ResizeObserver(() => {
      panelEl.style.height = `${innerEl.scrollHeight}px`;
      panelEl.style.opacity = "1";
      panelEl.style.transform = "translateY(0px)";
    });

    ro.observe(innerEl);
    return () => ro.disconnect();
  }, [openId]);

  return (
    <section className="faq" id="faq">
      <div className="faq__inner">
        <header className="faq__header">
          <p className="faq__badge">Need a little more help?</p>
          <h2 className="faq__title">
            <span>Frequently asked</span>
            <span>questions</span>
          </h2>
        </header>

        <div className="faq__list" role="list">
          {faqs.map((item) => {
            const isOpen = item.id === openId;

            return (
              <article
                key={item.id}
                className={`faq__item ${isOpen ? "is-open" : ""}`}
                role="listitem"
                ref={(el) => el && itemRefs.current.set(item.id, el)}
              >
                <button
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="faq__text">
                    <p className="faq__question">{item.question}</p>
                  </div>
                  <span className="faq__icon" aria-hidden="true" />
                </button>

                <div
                  className="faq__panel"
                  aria-hidden={!isOpen}
                  ref={(el) => el && panelRefs.current.set(item.id, el)}
                >
                  <div
                    className="faq__panel-inner"
                    ref={(el) => el && innerRefs.current.set(item.id, el)}
                  >
                    <p className="faq__answer">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
