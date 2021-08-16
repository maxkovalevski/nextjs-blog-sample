---
title: "Welcome"
date: "2021-08-09"
image: "second-post-here.png"
excerpt: "Aliqua incididunt consequat aute laborum excepteur esse aute veniam adipisicing enim occaecat ex."
---

Qui sunt non aute sint ea minim adipisicing amet. Fugiat ad eiusmod magna ea mollit eiusmod duis proident aliqua aute sit labore. Aute anim labore ex ad tempor do pariatur ea dolor magna tempor eu. Enim elit fugiat elit veniam sunt ullamco aute sint quis Lorem sit. Sunt fugiat reprehenderit ullamco duis et aliqua velit officia veniam eiusmod cillum nulla. Tempor deserunt cupidatat nostrud consectetur officia fugiat velit elit dolor tempor do esse nostrud. Mollit ad aliquip exercitation ullamco do deserunt velit aliqua excepteur.

```ts
import { createQuestioner } from "./createQuestioner";
import { greeting } from "./greeting";

import inventory from "./inventory.json";

async function main() {
  try {
    const questioner = createQuestioner();
    const username = await questioner.ask("Type your username: ");

    greeting(username);

    const itemName = await questioner.ask(
      "Type the name of the inventory item: "
    );

    const foundItem = inventory.find((item) => item.name === itemName);

    console.log(
      `You've chosen an item: ${foundItem.icon} ${foundItem.name} (lvl ${foundItem.level})`
    );

    questioner.finishUp();
  } catch (e) {
    console.error(e);
  }
}

main();
```

Occaecat qui consequat consectetur sunt reprehenderit aute enim. Eu fugiat est et sunt in voluptate fugiat dolor. Deserunt est fugiat ad commodo in commodo dolor minim fugiat qui commodo.
