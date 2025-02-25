import React from 'react';
import { ChevronDownIcon } from '@modulz/radix-icons';
import { useMantineTheme, Input } from '@mantine/core';
import CodeDemo from '../../../../components/CodeDemo/CodeDemo';

const code = `import React from 'react';
import { Input } from '@mantine/core';
import { ChevronDownIcon } from '@modulz/radix-icons';

function Demo() {
  return (
    <>
      <Input component="button">Button input</Input>
      <Input component="select" rightSection={<ChevronDownIcon />}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}`;

export function InputComponentDemo() {
  const theme = useMantineTheme();
  const variant = theme.colorScheme === 'dark' ? 'filled' : 'default';

  return (
    <CodeDemo
      code={code}
      language="tsx"
      demoBackground={theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}
    >
      <Input component="button" variant={variant}>
        Button input
      </Input>
      <Input
        variant={variant}
        component="select"
        style={{ marginTop: 15 }}
        rightSection={<ChevronDownIcon />}
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </CodeDemo>
  );
}
