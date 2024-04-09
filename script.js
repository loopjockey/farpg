import van from "./van-0.11.10.js"
import { initDB, op } from './idb.js';
import 'whatwg-fetch'
import * as openai from 'openai';
import fullpage from 'fullpage.js'

const { add, tags, state, bind } = van;
const {
    button, div, form, label, h1, h2, h3,
    textarea, p, details, summary, header,
    input, section, span, script, img
} = tags;

const NEYNAR_CLIENT_ID = '7d22ab5b-4b4f-484e-bc72-04f11e48089e';

const LoginWithNeynar = () => {
    return div({
        class: 'neynar_signin',
        'data-height': '89px',
        'data-width': '230px',
        'data-border_radius': '10px',
        'data-font_size': '16px',
        'data-font_weight': '300',
        'data-padding': '8px 15px',
        'data-client_id': NEYNAR_CLIENT_ID,
        'data-success-callback': 'onSignInSuccess',
        'data-theme': 'dark'
    });
}

const View = () => {
    const dom = div({ id: 'fullpage' },
        div({ class: 'section splash' },
            div({ class: 'centered-box ' },
                h1({ class: "text-center mb-0", style: "'font-family':'Sixtyfour', sans-serif;'" }, 'FARPG'),
                div({ class: "text-center" }, "Pronounced /fɑːr pɪgʌ/"),
                h2({ class: "text-center" }, '🧙🎲🐲💖'),
                div({ class: "text-center contrast-box pa-4 pt-1" },
                    LoginWithNeynar(),
                    h3({ class: 'text-center' }, "Lost?"),
                    div("Scroll or swiper for more information..."),
                ))
        ),
        div({ class: 'section snek' },
            div({ class: 'grid-container' },
                div({ class: 'box' },
                    div({  }, 'test')),
                div({ class: 'box' }, span("Blah blah blah"))
            ),

        ),
        div({ class: 'section' },
            div(span("It's beautiful and don't need jQuery")),

        ),
        script({ src: 'https://neynarxyz.github.io/siwn/raw/1.0.0/index.js', async: true }),
        script('function onSignInSuccess(data) { console.log(data);  }')
    );
    return dom;
}

add(document.body, View())
fullpage('#fullpage', { licenseKey: '53M3J-977IK-1K5D7-I7266-SNRWS', });