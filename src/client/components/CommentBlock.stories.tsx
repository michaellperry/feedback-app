import '../styles/default';

import * as React from 'react';

import { CommentBlock } from './CommentBlock';

export default { title: "Comment Block" };

export const others = () => <CommentBlock self={false} content="<p>I like where this is going. Keep it up!</p>" />
export const self = () => <CommentBlock self={true} content="<p>I like where this is going. Keep it up!</p>" />
export const long = () => <CommentBlock self={true} content="
<p>Twas brillig, and the slithy toves</p>
<p>Did gyre and gimble in the wabe:</p>
<p>All mimsy were the borogoves,</p>
<p>And the mome raths outgrabe.</p>
<p>Beware the Jabberwock, my son!</p>
<p>The jaws that bite, the claws that catch!</p>
<p>Beware the Jubjub bird, and shun The frumious Bandersnatch</p>
<p>He took his vorpal sword in hand;</p>
<p>Long time the manxome foe he sought</p>
<p>So rested he by the Tumtum tree</p>
<p>And stood awhile in thought.</p>
<p>And, as in uffish thought he stood,</p>
<p>The Jabberwock, with eyes of flame,</p>
<p>Came whiffling through the tulgey wood,</p>
<p>And burbled as it came!</p>
<p>One, two! One, two!</p>
<p>And through and through</p>
<p>The vorpal blade went snicker-snack!</p>
<p>He left it dead, and with its head</p>
<p>He went galumphing back.</p>
<p>And hast thou slain the Jabberwock?</p>
<p>Come to my arms, my beamish boy!</p>
<p>O frabjous day! Callooh! Callay!</p>
<p>He chortled in his joy.</p>
<p>Twas brillig, and the slithy toves</p>
<p>Did gyre and gimble in the wabe:</p>
<p>All mimsy were the borogoves,</p>
<p>And the mome raths outgrabe.</p>
" />