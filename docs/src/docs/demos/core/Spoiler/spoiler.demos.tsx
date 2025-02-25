import React from 'react';
import { Spoiler, Text } from '@mantine/core';
import CodeDemo from '../../../../components/CodeDemo/CodeDemo';

const content = (
  <div>
    <img
      style={{
        maxWidth: '100%',
        height: 150,
        marginLeft: 20,
        marginBottom: 0,
        marginTop: 5,
        float: 'right',
      }}
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Rock_in_caputh-WBTBWB-47.jpg/600px-Rock_in_caputh-WBTBWB-47.jpg"
      alt="We Butter the Bread with Butter"
    />
    <Text>
      We Butter the Bread with Butter was founded in 2007 by Marcel Neumann, who was originally
      guitarist for Martin Kesici&apos;s band, and Tobias Schultka. The band was originally meant as
      a joke, but progressed into being a more serious musical duo. The name for the band has no
      particular meaning, although its origins were suggested from when the two original members
      were driving in a car operated by Marcel Neumann and an accident almost occurred. Neumann
      found Schultka &quot;so funny that he briefly lost control of the vehicle.&quot; Many of their
      songs from this point were covers of German folk tales and nursery rhymes.
    </Text>
  </div>
);

const code = `import React from 'react';
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
      {/* Content here */}
    </Spoiler>
  );
}`;

export function SpoilerBaseDemo() {
  return (
    <CodeDemo code={code} language="tsx">
      <div style={{ maxWidth: 520, margin: 'auto' }}>
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          {content}
        </Spoiler>
      </div>
    </CodeDemo>
  );
}

const noAnimationCode = `import React from 'react';
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler
      maxHeight={120}
      showLabel="Show more"
      hideLabel="Hide"
      transitionDuration={0}
    >
      {/* Content here */}
    </Spoiler>
  );
}`;

export function SpoilerNoAnimationDemo() {
  return (
    <CodeDemo code={noAnimationCode} language="tsx">
      <div style={{ maxWidth: 520, margin: 'auto' }}>
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
          {content}
        </Spoiler>
      </div>
    </CodeDemo>
  );
}
