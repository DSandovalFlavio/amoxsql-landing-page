import React from 'react';
import { useTranslation } from '../i18n';

/* Mini-gráficos decorativos de cada tarjeta (solo presentación) */

function MiniBars() {
    const heights = [38, 62, 45, 88, 70, 100, 56];
    return (
        <div className="mini bars" aria-hidden="true">
            {heights.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
        </div>
    );
}

function MiniDag() {
    return (
        <svg className="mini" viewBox="0 0 300 84" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <g stroke="rgba(0,229,255,.35)" strokeWidth="1.5" fill="none">
                <path d="M 30 42 C 70 42 70 18 110 18" /><path d="M 30 42 C 70 42 70 66 110 66" />
                <path d="M 130 18 C 170 18 170 42 210 42" /><path d="M 130 66 C 170 66 170 42 210 42" />
                <path d="M 230 42 L 272 42" />
            </g>
            <g fill="#0e1013" stroke="rgba(0,229,255,.6)" strokeWidth="1.5">
                <circle cx="24" cy="42" r="8" /><circle cx="120" cy="18" r="8" /><circle cx="120" cy="66" r="8" /><circle cx="220" cy="42" r="8" />
            </g>
            <circle cx="278" cy="42" r="8" fill="rgba(0,229,255,.8)" />
        </svg>
    );
}

function MiniChat() {
    return (
        <div className="mini ai-lines" aria-hidden="true"><i></i><i></i><i></i></div>
    );
}

function MiniCode() {
    return (
        <div className="mini code-lines" aria-hidden="true">
            <div><i className="k" style={{ width: '17%' }} /><i style={{ width: '26%' }} /><i className="f" style={{ width: '14%' }} /></div>
            <div><i className="k" style={{ width: '12%' }} /><i style={{ width: '38%' }} /></div>
            <div><i style={{ width: '8%' }} /><i className="k" style={{ width: '15%' }} /><i style={{ width: '22%' }} /><i className="f" style={{ width: '11%' }} /></div>
            <div><i className="k" style={{ width: '20%' }} /><i style={{ width: '16%' }} /></div>
        </div>
    );
}

function MiniNotebook() {
    return (
        <div className="mini nb-mini" aria-hidden="true">
            <div className="nb-cell"><i className="run"></i><i className="ln"></i></div>
            <div className="nb-out">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div>
        </div>
    );
}

function MiniSlides() {
    return (
        <div className="mini slides" aria-hidden="true">
            <div className="sl back"></div>
            <div className="sl front">
                <i style={{ height: '40%' }} /><i style={{ height: '75%' }} /><i style={{ height: '55%' }} /><i style={{ height: '90%' }} />
            </div>
        </div>
    );
}

function MiniLineage() {
    return (
        <svg className="mini lineage" viewBox="0 0 240 74" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <g stroke="rgba(0,229,255,.3)" strokeWidth="1.4" fill="none">
                <path d="M 62 18 C 90 18 90 37 116 37" />
                <path d="M 62 56 C 90 56 90 37 116 37" />
                <path d="M 168 37 L 190 37" />
            </g>
            <g fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.22)" strokeWidth="1.2">
                <rect x="14" y="8" width="48" height="20" rx="5" />
                <rect x="14" y="46" width="48" height="20" rx="5" />
                <rect x="118" y="27" width="48" height="20" rx="5" />
            </g>
            <rect x="192" y="27" width="34" height="20" rx="5" fill="rgba(0,229,255,.2)" stroke="rgba(0,229,255,.6)" strokeWidth="1.2" />
        </svg>
    );
}

function MiniHistogram() {
    const bars = [
        [12, 52, 18], [36, 38, 32], [60, 22, 48], [84, 12, 58],
        [108, 18, 52], [132, 32, 38], [156, 46, 24], [180, 56, 14],
    ];
    return (
        <svg className="mini hist" viewBox="0 0 240 74" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <g fill="rgba(0,229,255,.16)">
                {bars.map(([x, y, h], i) => <rect key={i} x={x} y={y} width="20" height={h} rx="2" />)}
            </g>
            <path d="M 12 62 C 50 60 60 8 96 8 C 132 8 150 58 208 64" fill="none" stroke="rgba(0,229,255,.7)" strokeWidth="2" />
        </svg>
    );
}

export default function Bento() {
    const { t } = useTranslation();
    const cards = t('bento.cards');

    return (
        <section id="capacidades" className="animate-fade-in">
            <div className="wrap">
                <div className="sec-head">
                    <div className="kicker">{t('bento.kicker')}</div>
                    <h2>{t('bento.title')}</h2>
                    <p className="sec-sub">{t('bento.subtitle')}</p>
                </div>
                <div className="bento">
                    <article className="cell s-3 glow-corner">
                        <MiniBars />
                        <div className="big">17</div>
                        <h3>{cards.storyFlow.title}</h3>
                        <p>{cards.storyFlow.desc}</p>
                    </article>
                    <article className="cell s-3">
                        <MiniDag />
                        <div className="big">33</div>
                        <h3>{cards.dataFlow.title}</h3>
                        <p>{cards.dataFlow.desc}</p>
                    </article>

                    <article className="cell s-2">
                        <MiniChat />
                        <h3>{cards.ai.title}</h3>
                        <p>{cards.ai.desc}</p>
                    </article>
                    <article className="cell s-2">
                        <MiniCode />
                        <h3>{cards.editor.title}</h3>
                        <p>{cards.editor.desc}</p>
                    </article>
                    <article className="cell s-2">
                        <MiniNotebook />
                        <h3>{cards.notebooks.title}</h3>
                        <p>{cards.notebooks.desc}</p>
                    </article>
                    <article className="cell s-2">
                        <MiniSlides />
                        <h3>{cards.reportFlow.title}</h3>
                        <p>{cards.reportFlow.desc}</p>
                    </article>
                    <article className="cell s-2">
                        <MiniLineage />
                        <h3>{cards.dbt.title}</h3>
                        <p>{cards.dbt.desc}</p>
                    </article>
                    <article className="cell s-2">
                        <MiniHistogram />
                        <h3>{cards.profiler.title}</h3>
                        <p>{cards.profiler.desc}</p>
                    </article>
                </div>
            </div>
        </section>
    );
}
