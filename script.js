import van from "./van-0.11.10.js"
import 'whatwg-fetch'

const { add, tags, state, bind } = van;
const {
    button, div, form, label, h1, h2, h3,
    textarea, p, details, summary, header
} = tags;

const createNewRecord = (prompt, emoji) => {
    return { emoji, prompt };
}

const HistoryListItem = (h) => {
    return details(
        summary(h.prompt),
        h1(h.emoji)
    );
}

const HistoryList = (history) => {
    return bind(history, (hst) => div(hst.length ? hst.map(h => add(HistoryListItem(h))) : h1('🌀🌾')));
}

const PromptForm = (prompt, history) => {
    return form(
        label({ for: 'prompt' }, 'Prompt'),
        textarea({
            name: 'prompt',
            id: 'prompt',
            placeholder: 'e.g. A plate of bumblebee sauce being consumed by a ferocious koala',
            oninput: (e) => prompt.val = e.target.value
        }),
        button({
            onclick: (e) => {
                e.preventDefault();
                const record = createNewRecord(prompt.val, '🤔');
                history.val = [record, ...history.val]
            },
            type: "submit"
        },
            "Create ▶️")
    )
}

const View = () => {
    const dom = div()
    const prompt = state('');
    const history = state([]);
    return div(
        dom,
        h1('🤔 Emojifusion'),
        p(`Describe the art piece your heart desires and, with a sprinkle of our secret algorithmic magic, transforms them into a delightful diffusion of UTF-8 emojis. It's like a surprise party for your eyes! With EmojiFusion, you're not just getting a picture, you're embarking on a joyride of jocular jest and jovial jumble. So, say goodbye to the stable and mundane, and embrace the unpredictable hilarity of EmojiFusion. `),
        header({ class:'row' }, h2('🎨 Get creating'), button({ class:'login-btn' }, '🙋 LOGIN')),
        PromptForm(prompt, history),
        h2('🕗 History'),
        HistoryList(history)

    )
}

add(document.body, View())