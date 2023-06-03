import van from "./van-0.11.10.js"
import 'whatwg-fetch'

const { add, tags, state, bind } = van;
const { button, div, pre, form, label, h1, h2, textarea, p, details, summary } = tags

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Run = ({ sleepMs }) => {
    const headingSpaces = state(40), trailingUnderscores = state(0)

    const animate = async () => {
        while (headingSpaces.val > 0) {
            await sleep(sleepMs)
            --headingSpaces.val, ++trailingUnderscores.val
        }
    }
    animate()

    const helloText = bind(headingSpaces, trailingUnderscores,
        (h, t) => `${" ".repeat(h)}🚐💨Hello VanJS!${"_".repeat(t)}`)
    return div(pre(helloText))
}

const View = () => {
    const dom = div()
    return div(
        dom,
        h1('🤔 Emojifusion'),
        p(`Describe the art piece your heart desires and, with a sprinkle of our secret algorithmic magic, transforms them into a delightful diffusion of UTF-8 emojis. It's like a surprise party for your eyes! With EmojiFusion, you're not just getting a picture, you're embarking on a joyride of jocular jest and jovial jumble. So, say goodbye to the stable and mundane, and embrace the unpredictable hilarity of EmojiFusion. `),
        h2('🎨 Get creating'),
        form(
            label({ for: 'prompt' }, 'Prompt'),
            textarea({ name: 'prompt', id: 'prompt', placeholder: 'e.g. A plate of bumblebee sauce being consumed by a ferocious koala' }),
            button({ 
                onclick: () => add(dom, Run({ sleepMs: 2000 })) }, 
                "Hello 🐌")
        ),
        h2('🕗 History'),
        details(
            summary('An engorged eucalyptus tree being savagelyeatien by an aggressive koala'),
            h1('🌳💥🐨')
        )
    )
}

add(document.body, View())