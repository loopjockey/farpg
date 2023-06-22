import van from "./van-0.11.10.js"
import { initDB, op } from './idb.js';
import 'whatwg-fetch'
import * as openai from 'openai';

const { add, tags, state, bind } = van;
const {
    button, div, form, label, h1, h2, h3,
    textarea, p, details, summary, header,
    input
} = tags;

const createNewRecord = (prompt, emoji) => {
    return { emoji, prompt };
}

const createReversetimestamp = (date) => {
    return 8640000000000000 - date.getTime();
}

const HistoryListItem = (h) => {
    return details(
        { open: true },
        summary(h.prompt),
        h1(h.emoji)
    );
}

const HistoryList = (history) => {
    return bind(history, (hst) => div(hst.length ? hst.map(h => add(HistoryListItem(h))) : h1('🌀🌾')));
}

const PromptForm = (prompt, history, serviceUrl, apiKey) => {
    const isLoading = state(false);
    return form(
        label({ for: 'serviceUrl' }, 'Service URL'),
        input({
            type: 'text',
            id: 'serviceUrl',
            name: 'serviceUrl',
            placeholder: 'Enter Service URL',
            oninput: (e) => serviceUrl.val = e.target.value
        }),
        label({ for: 'apiKey' }, 'API Key'),
        input({
            type: 'password',
            id: 'apiKey',
            name: 'apiKey',
            placeholder: 'Enter API Key',
            oninput: (e) => apiKey.val = e.target.value
        }),
        label({ for: 'prompt' }, 'Prompt'),
        textarea({
            name: 'prompt',
            id: 'prompt',
            disabled: isLoading.val,
            placeholder: 'e.g. A plate of bumblebee sauce being consumed by a ferocious koala',
            oninput: (e) => prompt.val = e.target.value
        }),
        bind(isLoading, (v) => {
            if (!v) {
                return button({
                    onclick: async (e) => {
                        e.preventDefault();
                        try {
                            isLoading.val = true;
                            const db = await initDB('emojis', 'history');
                            const cli = new openai.OpenAIApi({ 
                                basePath: serviceUrl.val + '/oai', 
                                baseOptions: { headers: { 'Authorization': `Bearer ${apiKey.val}` } }
                            });
                            const resp = await cli.createCompletion({
                                model: 'text-davinci-003',
                                prompt: `bumblebee shield" as emojis = 🐝🛡️
                                "tom cruise" as emojis = 🤴🎥
                                "${prompt.val}" as emojis = `
                            });
                            const text = resp.data.choices[0].text;
                            const record = createNewRecord(prompt.val, text);
                            const reverseTimestamp = createReversetimestamp(new Date());
                            await op(db, 'CREATE', { id: reverseTimestamp + record.emoji, ...record });
                            history.val = [record, ...history.val];
                        } finally {
                            isLoading.val = false;
                        }
                    },
                    type: "submit",
                },
                    'Create ▶️')
            } else {
                return button({ type: "submit", disabled: true }, 'Loading ⟳');
            }
        })
    );
}


const LoadExistingHistory = async (history) => {
    const db = await initDB('emojis', 'history');
    const records = await op(db, 'LIST');
    history.val = records;
}

const View = () => {
    const dom = div()
    const prompt = state('');
    const serviceUrl = state('');  // new state for serviceUrl
    const apiKey = state('');
    const history = state([]);
    LoadExistingHistory(history);
    return div(
        dom,
        h1('🤔 Emojifusion'),
        p(`Describe the art piece your heart desires and, with a sprinkle of our secret algorithmic magic, transforms them into a delightful diffusion of UTF-8 emojis. It's like a surprise party for your eyes! With EmojiFusion, you're not just getting a picture, you're embarking on a joyride of jocular jest and jovial jumble. So, say goodbye to the stable and mundane, and embrace the unpredictable hilarity of EmojiFusion. `),
        header({ class: 'row' }, h2('🎨 Get creating')/*, button({ class: 'login-btn' }, '🙋 LOGIN')*/),
        PromptForm(prompt, history, serviceUrl, apiKey),
        h2('🕗 History'),
        HistoryList(history)
    )
}

add(document.body, View())